import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Chat } from './MessengerInterface';

type ChatListProps = {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  selectedChat: Chat | null;
};

const ChatList = ({ chats, onSelectChat, selectedChat }: ChatListProps) => {
  return (
    <ScrollArea className="h-full">
      <div className="p-2 space-y-1">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`w-full p-3 rounded-lg text-left transition-all hover:bg-primary/10 ${
              selectedChat?.id === chat.id ? 'bg-primary/20 border border-primary/30' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl flex-shrink-0 relative">
                {chat.avatar}
                {chat.isPremium && (
                  <span className="absolute -top-1 -right-1 text-sm">👻</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm truncate text-foreground">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {chat.timestamp}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <Badge className="ml-2 bg-primary text-primary-foreground h-5 min-w-5 flex items-center justify-center text-xs">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatList;
