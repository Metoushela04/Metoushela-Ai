import React from 'react';
import { History, Settings, Plus, Moon, Sun } from 'lucide-react';
import { Conversation, User } from '../types';

interface SidebarProps {
  conversations: Conversation[];
  currentUser: User;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onToggleTheme: () => void;
  selectedConversationId?: string;
}

export function Sidebar({
  conversations,
  currentUser,
  onNewChat,
  onSelectConversation,
  onToggleTheme,
  selectedConversationId
}: SidebarProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Recent Conversations
          </div>
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`w-full text-left p-2 rounded-lg mb-1 hover:bg-gray-100 transition-colors ${
                selectedConversationId === conversation.id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="text-sm font-medium truncate">{conversation.title}</div>
              <div className="text-xs text-gray-500">
                {new Date(conversation.timestamp).toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 p-4 space-y-2">
        <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <History className="w-4 h-4" />
          <span className="text-sm">History</span>
        </button>
        <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </button>
        <button
          onClick={onToggleTheme}
          className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {currentUser.prefersDarkMode ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
          <span className="text-sm">
            {currentUser.prefersDarkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </div>
  );
}