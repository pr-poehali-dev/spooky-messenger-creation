import { useState } from 'react';
import AuthScreen from '@/components/spooky/AuthScreen';
import MessengerInterface from '@/components/spooky/MessengerInterface';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  isPremium: boolean;
  adminLevel: number;
  adminRole?: string;
  coverImage?: string;
  avatar?: string;
};

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return <MessengerInterface currentUser={currentUser} onLogout={handleLogout} />;
};

export default Index;
