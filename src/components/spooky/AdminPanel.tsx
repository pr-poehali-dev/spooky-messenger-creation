import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { User } from '@/pages/Index';

type AdminPanelProps = {
  currentUser: User;
  onEditUser: (user: User) => void;
};

const AdminPanel = ({ currentUser, onEditUser }: AdminPanelProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const mockUsers: User[] = [
    {
      id: '1',
      firstName: 'Мария',
      lastName: 'Привидова',
      isPremium: true,
      adminLevel: 15,
      adminRole: 'Владелец',
      avatar: '👻',
    },
    {
      id: '2',
      firstName: 'Иван',
      lastName: 'Духов',
      isPremium: false,
      adminLevel: 10,
      adminRole: 'Администратор',
      avatar: '🎃',
    },
    {
      id: '3',
      firstName: 'Елена',
      lastName: 'Тенькова',
      isPremium: true,
      adminLevel: 5,
      adminRole: 'Модератор',
      avatar: '💀',
    },
    {
      id: '4',
      firstName: 'Петр',
      lastName: 'Призраков',
      isPremium: false,
      adminLevel: 3,
      adminRole: 'Агент поддержки',
      avatar: '🦇',
    },
    {
      id: '5',
      firstName: 'Анна',
      lastName: 'Ночная',
      isPremium: true,
      adminLevel: 0,
      avatar: '🌙',
    },
  ];

  const getAdminBadgeColor = (level: number) => {
    if (level >= 20) return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (level >= 15) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    if (level >= 10) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (level >= 5) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (level > 0) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    return 'bg-muted text-muted-foreground border-border';
  };

  const getAdminIcon = (level: number) => {
    if (level >= 20) return '👑';
    if (level >= 15) return '🛡️';
    if (level >= 10) return '⚔️';
    if (level >= 5) return '🎯';
    if (level > 0) return '🌟';
    return '👤';
  };

  const filteredUsers = mockUsers.filter((u) =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <h2 className="font-bold text-foreground">Админ-панель</h2>
        </div>

        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск пользователей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 glass-effect"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Info" size={14} />
          <span>Ваш уровень: {currentUser.adminLevel}/25</span>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-3 glass-effect rounded-lg hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl relative flex-shrink-0">
                  {user.avatar || '👤'}
                  {user.isPremium && (
                    <span className="absolute -top-1 -right-1 text-sm">👻</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm text-foreground">
                      {user.firstName} {user.lastName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {user.adminLevel > 0 && (
                      <Badge
                        variant="outline"
                        className={`text-xs ${getAdminBadgeColor(user.adminLevel)}`}
                      >
                        {getAdminIcon(user.adminLevel)} Уровень {user.adminLevel}
                      </Badge>
                    )}

                    {user.adminRole && (
                      <Badge variant="outline" className="text-xs border-accent text-accent">
                        {user.adminRole}
                      </Badge>
                    )}

                    {user.isPremium && (
                      <Badge variant="outline" className="text-xs border-primary text-primary">
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>

                {currentUser.adminLevel >= user.adminLevel && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEditUser(user)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="Edit" size={16} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border space-y-2">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-2">
            <span>👑</span>
            <span>20-25: Владелец</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🛡️</span>
            <span>15-19: Главный администратор</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⚔️</span>
            <span>10-14: Администратор</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🎯</span>
            <span>5-9: Модератор</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🌟</span>
            <span>1-4: Агент поддержки</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
