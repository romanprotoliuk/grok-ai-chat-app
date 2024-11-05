export type MessageRole = "user" | "ai" | "system";

export type Message = {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
};

// Add Chat type
export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
};

// Chat context types
export interface ChatContextType {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (chatId: string | null) => void;
  createNewChat: () => void;
  deleteChat: (chatId: string) => void;
  addMessage: (content: string, role: MessageRole) => Promise<void>;
  isLoading: boolean;
  sessionStatus: 'loading' | 'authenticated' | 'unauthenticated';
}

export type CodeBlockProps = {
  code: string;
  language?: string;
};

export type APIResponse = {
  message?: {
    content: string;
  };
  error?: string;
};
