import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { User } from '@/pages/Index';

type ProfilePanelProps = {
  user: User;
  onLogout: () => void;
};

const ProfilePanel = ({ user, onLogout }: ProfilePanelProps) => {
  const [isPremium, setIsPremium] = useState(user.isPremium);
  const [coverImage, setCoverImage] = useState(user.coverImage || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        <div className="relative">
          <div 
            className="h-32 rounded-lg mb-4"
            style={{ background: coverImage }}
          />
          
          <div className="absolute -bottom-8 left-4 flex items-end gap-3">
            <div className="text-6xl bg-background rounded-full p-2 border-4 border-background">
              👤
              {isPremium && (
                <span className="absolute -top-2 -right-2 text-2xl animate-pulse">👻</span>
              )}
            </div>
          </div>
        </div>

        <div className="pt-12 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">@{user.firstName.toLowerCase()}{user.id.slice(0, 4)}</p>
          </div>

          {user.adminLevel > 0 && (
            <Badge variant="outline" className="border-primary text-primary">
              <Icon name="Shield" size={14} className="mr-1" />
              Админ уровень {user.adminLevel}
            </Badge>
          )}

          {user.adminRole && (
            <Badge variant="outline" className="border-accent text-accent">
              {user.adminRole}
            </Badge>
          )}

          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between p-4 glass-effect rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-2xl">👻</div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Spooky Premium</p>
                  <p className="text-xs text-muted-foreground">Призрак у ника и больше функций</p>
                </div>
              </div>
              <Switch
                checked={isPremium}
                onCheckedChange={setIsPremium}
              />
            </div>

            {isPremium && (
              <div className="space-y-3 p-4 glass-effect rounded-lg animate-fade-in">
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Icon name="Crown" size={16} className="text-primary" />
                  Premium функции
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="cover-color" className="text-xs">Цвет обложки профиля</Label>
                  <div className="flex gap-2">
                    {[
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    ].map((gradient, i) => (
                      <button
                        key={i}
                        onClick={() => setCoverImage(gradient)}
                        className="w-12 h-12 rounded-lg border-2 border-transparent hover:border-primary transition-all"
                        style={{ background: gradient }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Check" size={16} className="text-primary" />
                  Кастомные стикеры
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Check" size={16} className="text-primary" />
                  Приоритетная поддержка
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Check" size={16} className="text-primary" />
                  Без рекламы
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4">
            <h3 className="font-semibold text-sm text-foreground">Настройки аккаунта</h3>
            
            <div className="space-y-2">
              <Label htmlFor="firstname" className="text-xs">Имя</Label>
              <Input
                id="firstname"
                defaultValue={user.firstName}
                className="glass-effect"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastname" className="text-xs">Фамилия</Label>
              <Input
                id="lastname"
                defaultValue={user.lastName}
                className="glass-effect"
              />
            </div>

            <Button className="w-full" variant="outline">
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить изменения
            </Button>
          </div>

          <Button 
            onClick={onLogout}
            variant="destructive" 
            className="w-full mt-6"
          >
            <Icon name="LogOut" size={16} className="mr-2" />
            Выйти из аккаунта
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ProfilePanel;
