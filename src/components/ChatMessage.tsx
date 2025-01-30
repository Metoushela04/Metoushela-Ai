import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <div className={`flex gap-4 p-4 ${isBot ? 'bg-gray-50' : ''}`}>
      <div className="flex-shrink-0">
        {isBot ? (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-green-600" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm text-gray-500 mb-1">
          {isBot ? 'Metoushela AI' : 'You'}
        </div>
        <div className="prose prose-sm max-w-none">
          {message.content}
        </div>
      </div>
    </div>
  );
}