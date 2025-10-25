import { useState } from 'react';
import { User } from '@/pages/Index';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import ProfilePanel from './ProfilePanel';
import AdminPanel from './AdminPanel';
import ThemeSelector from './ThemeSelector';

type MessengerInterfaceProps = {
  currentUser: User;
  onLogout: () => void;
};

export type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  isPremium?: boolean;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
};

const MessengerInterface = ({ currentUser, onLogout }: MessengerInterfaceProps) => {
  const [theme, setTheme] = useState<'glass' | 'matte' | 'solid'>('glass');
  const [activePanel, setActivePanel] = useState<'chats' | 'profile' | 'admin'>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const mockChats: Chat[] = [
    {
      id: '1',
      name: 'Мария Привидова',
      lastMessage: 'Привет! Как дела? 👻',
      timestamp: '14:32',
      unread: 2,
      avatar: '👻',
      isPremium: true,
    },
    {
      id: '2',
      name: 'Иван Духов',
      lastMessage: 'Увидимся на встрече',
      timestamp: '13:15',
      unread: 0,
      avatar: '🎃',
    },
    {
      id: '3',
      name: 'Елена Тенькова',
      lastMessage: 'Отправила файлы',
      timestamp: '11:48',
      unread: 1,
      avatar: '💀',
      isPremium: true,
    },
  ];

  return (
    <div className={`min-h-screen ${theme} transition-all duration-300`}>
      <div className="flex h-screen">
        <div className={`w-80 flex flex-col border-r border-border ${theme === 'glass' ? 'glass-effect' : theme === 'matte' ? 'matte-effect' : 'solid-effect'}`}>
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-3xl">👻</div>
              <div>
                <h1 className="text-xl font-bold text-primary">Spooky</h1>
                <p className="text-xs text-muted-foreground">Messenger</p>
              </div>
            </div>
            <ThemeSelector theme={theme} onThemeChange={setTheme} />
          </div>

          <div className="flex border-b border-border">
            <button
              onClick={() => setActivePanel('chats')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activePanel === 'chats'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Чаты
            </button>
            <button
              onClick={() => setActivePanel('profile')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activePanel === 'profile'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Профиль
            </button>
            {currentUser.adminLevel > 0 && (
              <button
                onClick={() => setActivePanel('admin')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activePanel === 'admin'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Админ
              </button>
            )}
          </div>

          <div className="flex-1 overflow-hidden">
            {activePanel === 'chats' && (
              <ChatList chats={mockChats} onSelectChat={setSelectedChat} selectedChat={selectedChat} />
            )}
            {activePanel === 'profile' && (
              <ProfilePanel user={currentUser} onLogout={onLogout} />
            )}
            {activePanel === 'admin' && (
              <AdminPanel currentUser={currentUser} onEditUser={setEditingUser} />
            )}
          </div>
        </div>

        <div className="flex-1">
          <ChatWindow 
            chat={selectedChat} 
            currentUser={currentUser} 
            theme={theme}
            editingUser={editingUser}
            onCloseEdit={() => setEditingUser(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default MessengerInterface;
