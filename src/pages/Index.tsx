import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

type Tab = 'chats' | 'contacts' | 'calls' | 'media' | 'profile';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
}

const mockChats: Chat[] = [
  { id: 1, name: 'Анна Смирнова', avatar: '👩', lastMessage: 'Привет! Как дела?', time: '12:34', unread: 2, online: true },
  { id: 2, name: 'Иван Петров', avatar: '👨', lastMessage: 'Отправил тебе файлы', time: '11:20', unread: 0, online: true },
  { id: 3, name: 'Команда проекта', avatar: '👥', lastMessage: 'Мария: Встреча в 15:00', time: 'Вчера', unread: 5, online: false },
  { id: 4, name: 'Елена Коваленко', avatar: '👩‍💼', lastMessage: 'Спасибо за помощь!', time: 'Вчера', unread: 0, online: false },
  { id: 5, name: 'Дмитрий Волков', avatar: '🧑', lastMessage: 'Созвонимся завтра?', time: '15 янв', unread: 0, online: true },
];

const mockMessages: Message[] = [
  { id: 1, text: 'Привет! Как прошла встреча?', time: '12:30', isMine: false },
  { id: 2, text: 'Отлично! Всё прошло успешно 🎉', time: '12:31', isMine: true },
  { id: 3, text: 'Отправляю презентацию', time: '12:32', isMine: true },
  { id: 4, text: 'Супер, посмотрю сегодня вечером', time: '12:34', isMine: false },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      time: time,
      isMine: true
    };
    
    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const tabs = [
    { id: 'chats' as Tab, icon: 'MessageCircle', label: 'Чаты' },
    { id: 'contacts' as Tab, icon: 'Users', label: 'Контакты' },
    { id: 'calls' as Tab, icon: 'Phone', label: 'Звонки' },
    { id: 'media' as Tab, icon: 'Image', label: 'Медиа' },
    { id: 'profile' as Tab, icon: 'User', label: 'Профиль' },
  ];

  return (
    <div className="flex h-screen bg-background">
      {!selectedChat ? (
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SecureChat
            </h1>
            <div className="flex items-center gap-2">
              <Icon name="Shield" className="text-accent" size={20} />
              <span className="text-xs text-muted-foreground">End-to-End</span>
            </div>
          </div>

          <div className="p-4">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Поиск сообщений и контактов..."
                className="pl-10 bg-muted border-0"
              />
            </div>
          </div>

          <div className="flex gap-2 px-4 pb-4 overflow-x-auto">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap transition-all ${
                  activeTab === tab.id ? 'bg-gradient-to-r from-primary to-secondary' : ''
                }`}
              >
                <Icon name={tab.icon} size={16} />
                {tab.label}
              </Button>
            ))}
          </div>

          <ScrollArea className="flex-1">
            {activeTab === 'chats' && (
              <div className="space-y-1 p-2">
                {mockChats.map((chat, index) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-all animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="text-2xl">{chat.avatar}</AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background">
                          <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse-ring"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-foreground">{chat.name}</span>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <Badge className="bg-gradient-to-r from-primary to-secondary ml-2">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="p-4 space-y-3">
                {mockChats.map((contact, index) => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-all animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="text-2xl">{contact.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {contact.online ? '🟢 В сети' : '🔘 Не в сети'}
                      </div>
                    </div>
                    <Button size="icon" variant="ghost">
                      <Icon name="MessageCircle" size={20} />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'calls' && (
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Icon name="PhoneIncoming" className="text-green-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Анна Смирнова</div>
                    <div className="text-sm text-muted-foreground">Входящий • 15:30</div>
                  </div>
                  <div className="text-sm text-muted-foreground">5 мин</div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Icon name="Video" className="text-accent" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Иван Петров</div>
                    <div className="text-sm text-muted-foreground">Видеозвонок • Вчера</div>
                  </div>
                  <div className="text-sm text-muted-foreground">23 мин</div>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center animate-fade-in"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <Icon name="Image" className="text-muted-foreground" size={32} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="p-6 space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="text-5xl">👤</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">Вы</h2>
                    <p className="text-sm text-muted-foreground">+7 900 123-45-67</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                    <Icon name="Shield" className="text-accent" size={20} />
                    <div className="flex-1">
                      <div className="font-semibold">Безопасность</div>
                      <div className="text-sm text-muted-foreground">Сквозное шифрование включено</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                    <Icon name="Bell" size={20} />
                    <div className="flex-1">
                      <div className="font-semibold">Уведомления</div>
                      <div className="text-sm text-muted-foreground">Настроить оповещения</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                    <Icon name="Lock" size={20} />
                    <div className="flex-1">
                      <div className="font-semibold">Приватность</div>
                      <div className="text-sm text-muted-foreground">Управление данными</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      ) : (
        <div className="flex flex-col w-full animate-slide-up">
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setSelectedChat(null)}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="text-xl">{selectedChat.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{selectedChat.name}</div>
                <div className="text-xs text-muted-foreground">
                  {selectedChat.online ? '🟢 в сети' : 'был(а) недавно'}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost">
                <Icon name="Phone" size={20} />
              </Button>
              <Button size="icon" variant="ghost">
                <Icon name="Video" size={20} />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-2xl ${
                      msg.isMine
                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <div className={`text-xs mt-1 flex items-center gap-1 ${msg.isMine ? 'text-white/70' : 'text-muted-foreground'}`}>
                      {msg.time}
                      {msg.isMine && <Icon name="Check" size={12} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost">
                <Icon name="Paperclip" size={20} />
              </Button>
              <Input
                placeholder="Сообщение..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-muted border-0"
              />
              <Button 
                size="icon" 
                className="bg-gradient-to-r from-primary to-secondary"
                onClick={handleSendMessage}
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <Icon name="Shield" size={12} className="text-accent" />
              <span>Сообщения защищены сквозным шифрованием</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;