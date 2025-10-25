import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { Chat, Message } from './MessengerInterface';
import { User } from '@/pages/Index';
import UserEditPanel from './UserEditPanel';
import GroupInfoPanel from './GroupInfoPanel';

type ChatWindowProps = {
  chat: Chat | null;
  currentUser: User;
  theme: 'glass' | 'matte' | 'solid';
  editingUser: User | null;
  onCloseEdit: () => void;
};

const ChatWindow = ({ chat, currentUser, theme, editingUser, onCloseEdit }: ChatWindowProps) => {
  const [message, setMessage] = useState('');
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: chat?.id || '1',
      text: 'Привет! Как дела?',
      timestamp: '14:30',
    },
    {
      id: '2',
      senderId: currentUser.id,
      text: 'Отлично! Работаю над новым проектом',
      timestamp: '14:31',
    },
    {
      id: '3',
      senderId: chat?.id || '1',
      text: 'Круто! Расскажешь подробнее? 👻',
      timestamp: '14:32',
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      text: message,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  if (editingUser) {
    return (
      <UserEditPanel 
        user={editingUser} 
        currentUser={currentUser}
        onClose={onCloseEdit}
        theme={theme}
      />
    );
  }

  if (showGroupInfo && chat?.isGroup) {
    return (
      <GroupInfoPanel
        chat={chat}
        currentUser={currentUser}
        theme={theme}
        onClose={() => setShowGroupInfo(false)}
      />
    );
  }

  if (!chat) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-8xl opacity-20">👻</div>
          <p className="text-muted-foreground">Выберите чат для начала общения</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className={`p-4 border-b border-border flex items-center justify-between ${theme === 'glass' ? 'glass-effect' : theme === 'matte' ? 'matte-effect' : 'solid-effect'}`}>
        <div className="flex items-center gap-3">
          <div className="text-3xl relative">
            {chat.avatar}
            {chat.isPremium && (
              <span className="absolute -top-1 -right-1 text-sm">👻</span>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              {chat.name}
              {chat.isGroup && (
                <span className="text-xs text-muted-foreground font-normal">
                  ({chat.members?.length || 0} участников)
                </span>
              )}
            </h2>
            <p className="text-xs text-muted-foreground">
              {chat.isGroup ? chat.description || 'Групповой чат' : 'в сети'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!chat.isGroup && (
            <>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon name="Phone" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon name="Video" size={20} />
              </Button>
            </>
          )}
          {chat.isGroup ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={() => setShowGroupInfo(true)}
            >
              <Icon name="Info" size={20} />
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="MoreVertical" size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-effect">
                <DropdownMenuItem>
                  <Icon name="User" size={16} className="mr-2" />
                  Профиль
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon name="Bell" size={16} className="mr-2" />
                  Уведомления
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Icon name="Trash" size={16} className="mr-2" />
                  Удалить чат
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isOwn = msg.senderId === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-md px-4 py-2 rounded-2xl ${
                    isOwn
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : theme === 'glass'
                      ? 'glass-effect rounded-bl-none'
                      : theme === 'matte'
                      ? 'matte-effect rounded-bl-none'
                      : 'solid-effect rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <form onSubmit={handleSend} className={`p-4 border-t border-border ${theme === 'glass' ? 'glass-effect' : theme === 'matte' ? 'matte-effect' : 'solid-effect'}`}>
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" className="rounded-full flex-shrink-0">
            <Icon name="Paperclip" size={20} />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Напишите сообщение..."
            className={`flex-1 ${theme === 'glass' ? 'glass-effect' : ''}`}
          />
          <Button type="button" variant="ghost" size="icon" className="rounded-full flex-shrink-0">
            <Icon name="Smile" size={20} />
          </Button>
          <Button type="submit" size="icon" className="rounded-full flex-shrink-0 bg-primary hover:bg-primary/90">
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;