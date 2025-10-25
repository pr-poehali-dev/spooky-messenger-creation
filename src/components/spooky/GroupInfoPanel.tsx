import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { Chat, GroupMember } from './MessengerInterface';
import { User } from '@/pages/Index';

type GroupInfoPanelProps = {
  chat: Chat;
  currentUser: User;
  theme: 'glass' | 'matte' | 'solid';
  onClose: () => void;
};

const GroupInfoPanel = ({ chat, currentUser, theme, onClose }: GroupInfoPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingMember, setEditingMember] = useState<string | null>(null);

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      owner: { label: 'Владелец', icon: '👑', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
      admin: { label: 'Админ', icon: '🛡️', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
      moderator: { label: 'Модератор', icon: '🎯', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      member: { label: 'Участник', icon: '👤', color: 'bg-muted text-muted-foreground border-border' },
    };
    return roleConfig[role as keyof typeof roleConfig] || roleConfig.member;
  };

  const filteredMembers = chat.members?.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const currentUserMember = chat.members?.find((m) => m.userId === currentUser.id);
  const canManageRoles = currentUserMember?.role === 'owner' || currentUserMember?.role === 'admin';

  return (
    <div className="h-full flex flex-col">
      <div className={`p-4 border-b border-border flex items-center justify-between ${theme === 'glass' ? 'glass-effect' : theme === 'matte' ? 'matte-effect' : 'solid-effect'}`}>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h2 className="font-semibold text-foreground">Информация о группе</h2>
            <p className="text-xs text-muted-foreground">{chat.members?.length || 0} участников</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-effect">
            <DropdownMenuItem>
              <Icon name="Edit" size={16} className="mr-2" />
              Редактировать группу
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="UserPlus" size={16} className="mr-2" />
              Пригласить участников
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="Bell" size={16} className="mr-2" />
              Уведомления
            </DropdownMenuItem>
            {canManageRoles && (
              <DropdownMenuItem className="text-destructive">
                <Icon name="Trash" size={16} className="mr-2" />
                Удалить группу
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          <div className="text-center space-y-3">
            <div className="text-6xl mx-auto">{chat.avatar}</div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{chat.name}</h3>
              {chat.description && (
                <p className="text-sm text-muted-foreground mt-1">{chat.description}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Icon name="Users" size={18} />
                Участники
              </h4>
              {canManageRoles && (
                <Button size="sm" variant="outline">
                  <Icon name="UserPlus" size={14} className="mr-1" />
                  Добавить
                </Button>
              )}
            </div>

            <div className="relative">
              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Поиск участников..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 glass-effect"
              />
            </div>

            <div className="space-y-2">
              {filteredMembers.map((member) => {
                const roleBadge = getRoleBadge(member.role);
                const isEditing = editingMember === member.userId;

                return (
                  <div
                    key={member.userId}
                    className="p-3 glass-effect rounded-lg hover:bg-primary/5 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl relative">
                        {member.avatar}
                        {member.isPremium && (
                          <span className="absolute -top-1 -right-1 text-xs">👻</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-sm text-foreground truncate">
                          {member.name}
                        </h5>

                        {isEditing && canManageRoles ? (
                          <Select
                            defaultValue={member.role}
                            onValueChange={(value) => {
                              console.log('Changing role to:', value);
                              setEditingMember(null);
                            }}
                          >
                            <SelectTrigger className="h-7 text-xs mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="glass-effect">
                              <SelectItem value="owner">👑 Владелец</SelectItem>
                              <SelectItem value="admin">🛡️ Админ</SelectItem>
                              <SelectItem value="moderator">🎯 Модератор</SelectItem>
                              <SelectItem value="member">👤 Участник</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge
                            variant="outline"
                            className={`text-xs mt-1 ${roleBadge.color}`}
                          >
                            {roleBadge.icon} {roleBadge.label}
                          </Badge>
                        )}
                      </div>

                      {canManageRoles && member.role !== 'owner' && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Icon name="MoreVertical" size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="glass-effect">
                            <DropdownMenuItem onClick={() => setEditingMember(member.userId)}>
                              <Icon name="Shield" size={14} className="mr-2" />
                              Изменить роль
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Icon name="MessageSquare" size={14} className="mr-2" />
                              Написать
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Icon name="UserMinus" size={14} className="mr-2" />
                              Удалить из группы
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Icon name="Info" size={18} />
              Роли в группе
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>👑</span>
                <span><strong>Владелец:</strong> Полный доступ к управлению группой</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🛡️</span>
                <span><strong>Админ:</strong> Может управлять участниками и настройками</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎯</span>
                <span><strong>Модератор:</strong> Может удалять сообщения</span>
              </div>
              <div className="flex items-center gap-2">
                <span>👤</span>
                <span><strong>Участник:</strong> Базовые права в группе</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <Button variant="destructive" className="w-full">
          <Icon name="LogOut" size={16} className="mr-2" />
          Покинуть группу
        </Button>
      </div>
    </div>
  );
};

export default GroupInfoPanel;
