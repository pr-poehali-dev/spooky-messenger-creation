import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { User } from '@/pages/Index';

type CreateGroupDialogProps = {
  open: boolean;
  onClose: () => void;
  currentUser: User;
  theme: 'glass' | 'matte' | 'solid';
};

type MockUser = {
  id: string;
  name: string;
  avatar: string;
  isPremium?: boolean;
};

const CreateGroupDialog = ({ open, onClose, currentUser, theme }: CreateGroupDialogProps) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👥');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const groupAvatars = ['👥', '💀', '👻', '🎃', '🦇', '🌙', '🔮', '⚡', '🌟', '🔥', '💎', '🎭'];

  const mockUsers: MockUser[] = [
    { id: '1', name: 'Мария Привидова', avatar: '👻', isPremium: true },
    { id: '2', name: 'Иван Духов', avatar: '🎃' },
    { id: '3', name: 'Елена Тенькова', avatar: '💀', isPremium: true },
    { id: '4', name: 'Петр Призраков', avatar: '🦇' },
    { id: '5', name: 'Анна Ночная', avatar: '🌙', isPremium: true },
    { id: '6', name: 'Сергей Темный', avatar: '🕷️' },
    { id: '7', name: 'Ольга Лунная', avatar: '🌌' },
  ];

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleCreate = () => {
    console.log('Creating group:', {
      name: groupName,
      description: groupDescription,
      avatar: selectedAvatar,
      members: selectedUsers,
    });
    setGroupName('');
    setGroupDescription('');
    setSelectedAvatar('👥');
    setSelectedUsers([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`max-w-2xl ${theme === 'glass' ? 'glass-effect' : theme === 'matte' ? 'matte-effect' : 'solid-effect'}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name="Users" size={24} className="text-primary" />
            Создание группы
          </DialogTitle>
          <DialogDescription>
            Настройте группу и добавьте участников
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Аватар группы</Label>
            <div className="flex gap-2 flex-wrap">
              {groupAvatars.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`text-3xl p-2 rounded-lg transition-all hover:scale-110 ${
                    selectedAvatar === avatar
                      ? 'bg-primary/20 ring-2 ring-primary'
                      : 'hover:bg-primary/10'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="group-name">Название группы</Label>
            <Input
              id="group-name"
              placeholder="Моя группа"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="glass-effect"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="group-description">Описание (необязательно)</Label>
            <Textarea
              id="group-description"
              placeholder="О чем эта группа..."
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              className="glass-effect resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Добавить участников</Label>
            <div className="relative mb-2">
              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Поиск пользователей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 glass-effect"
              />
            </div>

            <ScrollArea className="h-64 rounded-lg border border-border p-2">
              <div className="space-y-1">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 cursor-pointer"
                    onClick={() => handleToggleUser(user.id)}
                  >
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => handleToggleUser(user.id)}
                    />
                    <div className="text-2xl relative">
                      {user.avatar}
                      {user.isPremium && (
                        <span className="absolute -top-1 -right-1 text-xs">👻</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                    </div>
                    {user.isPremium && (
                      <Badge variant="outline" className="text-xs border-primary text-primary">
                        Premium
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {selectedUsers.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Users" size={16} />
                <span>Выбрано участников: {selectedUsers.length}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Отменить
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!groupName.trim()}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            <Icon name="Check" size={18} className="mr-2" />
            Создать группу
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
