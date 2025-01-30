export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  messages: Message[];
  title: string;
  timestamp: Date;
}

export interface User {
  id: string;
  isPremium: boolean;
  prefersDarkMode: boolean;
  language: string;
}