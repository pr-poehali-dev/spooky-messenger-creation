import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { User } from '@/pages/Index';

type AuthScreenProps = {
  onLogin: (user: User) => void;
};

const AuthScreen = ({ onLogin }: AuthScreenProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      firstName: firstName || 'Александр',
      lastName: lastName || 'Призраков',
      isPremium: false,
      adminLevel: 0,
    };

    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-purple-950/20" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-9xl opacity-5">👻</div>
        <div className="absolute bottom-40 right-32 text-9xl opacity-5">👻</div>
        <div className="absolute top-1/2 left-1/3 text-9xl opacity-5">👻</div>
      </div>

      <Card className="glass-effect w-full max-w-md relative z-10 animate-fade-in border-primary/30">
        <CardHeader className="text-center space-y-2">
          <div className="text-6xl mb-4 animate-pulse">👻</div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Spooky Messenger
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Призрачно быстрый мессенджер
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(v) => setIsLogin(v === 'login')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass-effect">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-firstname">Имя</Label>
                  <Input
                    id="login-firstname"
                    placeholder="Ваше имя"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="glass-effect"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Пароль</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-effect"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <Icon name="LogIn" size={18} className="mr-2" />
                  Войти
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4 mt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-firstname">Имя</Label>
                  <Input
                    id="register-firstname"
                    placeholder="Ваше имя"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="glass-effect"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-lastname">Фамилия</Label>
                  <Input
                    id="register-lastname"
                    placeholder="Ваша фамилия"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="glass-effect"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Пароль</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-effect"
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <Icon name="UserPlus" size={18} className="mr-2" />
                  Зарегистрироваться
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;
