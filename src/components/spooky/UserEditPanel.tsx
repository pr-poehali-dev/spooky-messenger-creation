import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { User } from '@/pages/Index';

type UserEditPanelProps = {
  user: User;
  currentUser: User;
  onClose: () => void;
  theme: 'glass' | 'matte' | 'solid';
};

const UserEditPanel = ({ user, currentUser, onClose, theme }: UserEditPanelProps) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [isPremium, setIsPremium] = useState(user.isPremium);
  const [adminLevel, setAdminLevel] = useState(user.adminLevel);
  const [adminRole, setAdminRole] = useState(user.adminRole || '');

  const canEditAdminRights = currentUser.adminLevel > user.adminLevel;
  const maxAdminLevel = Math.min(currentUser.adminLevel, 25);

  const handleSave = () => {
    console.log('Saving user:', { firstName, lastName, isPremium, adminLevel, adminRole });
    onClose();
  };

  const adminRoles = [
    { level: 20, label: 'Владелец' },
    { level: 15, label: 'Главный администратор' },
    { level: 10, label: 'Администратор' },
    { level: 5, label: 'Модератор' },
    { level: 1, label: 'Агент поддержки' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className={`p-4 border-b border-border flex items-center justify-between ${theme === 'glass' ? 'glass-effect' : theme === 'matte' ? 'matte-effect' : 'solid-effect'}`}>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h2 className="font-semibold text-foreground">Редактирование профиля</h2>
            <p className="text-xs text-muted-foreground">
              {user.firstName} {user.lastName}
            </p>
          </div>
        </div>
        
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
          <Icon name="Save" size={18} className="mr-2" />
          Сохранить
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6 max-w-2xl mx-auto">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Icon name="User" size={18} />
              Личная информация
            </h3>

            <div className="space-y-2">
              <Label htmlFor="edit-firstname">Имя</Label>
              <Input
                id="edit-firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="glass-effect"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-lastname">Фамилия</Label>
              <Input
                id="edit-lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="glass-effect"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Icon name="Crown" size={18} className="text-primary" />
              Premium статус
            </h3>

            <div className="flex items-center justify-between p-4 glass-effect rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-2xl">👻</div>
                <div>
                  <p className="font-medium text-sm text-foreground">Spooky Premium</p>
                  <p className="text-xs text-muted-foreground">
                    Призрак у ника и расширенные функции
                  </p>
                </div>
              </div>
              <Switch checked={isPremium} onCheckedChange={setIsPremium} />
            </div>
          </div>

          {canEditAdminRights && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Icon name="Shield" size={18} className="text-accent" />
                Административные права
              </h3>

              <div className="space-y-4 p-4 glass-effect rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Уровень доступа</Label>
                    <span className="text-sm font-semibold text-primary">
                      {adminLevel}/25
                    </span>
                  </div>
                  <Slider
                    value={[adminLevel]}
                    onValueChange={(value) => setAdminLevel(value[0])}
                    max={maxAdminLevel}
                    step={1}
                    className="my-4"
                  />
                  <p className="text-xs text-muted-foreground">
                    Максимальный уровень, который вы можете выдать: {maxAdminLevel}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Роль администратора</Label>
                  <Select value={adminRole} onValueChange={setAdminRole}>
                    <SelectTrigger className="glass-effect">
                      <SelectValue placeholder="Выберите роль" />
                    </SelectTrigger>
                    <SelectContent className="glass-effect">
                      <SelectItem value="">Без роли</SelectItem>
                      {adminRoles
                        .filter((role) => role.level <= currentUser.adminLevel)
                        .map((role) => (
                          <SelectItem key={role.level} value={role.label}>
                            {role.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 space-y-2 text-xs text-muted-foreground border-t border-border">
                  <p className="font-semibold text-foreground">Уровни доступа:</p>
                  <div className="space-y-1 pl-4">
                    <div>• 👑 20-25: Владелец (полный доступ)</div>
                    <div>• 🛡️ 15-19: Главный администратор</div>
                    <div>• ⚔️ 10-14: Администратор</div>
                    <div>• 🎯 5-9: Модератор</div>
                    <div>• 🌟 1-4: Агент поддержки</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Icon name="Settings" size={18} />
              Дополнительные настройки
            </h3>

            <div className="space-y-3 p-4 glass-effect rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Заблокировать пользователя</p>
                  <p className="text-xs text-muted-foreground">Временно ограничить доступ</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Верифицированный аккаунт</p>
                  <p className="text-xs text-muted-foreground">Отметка проверенного профиля</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Отменить
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90">
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить изменения
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserEditPanel;
