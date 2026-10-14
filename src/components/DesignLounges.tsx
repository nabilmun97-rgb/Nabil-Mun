import React, { useState, useRef, useEffect } from 'react';
import {
  Hash,
  Send,
  Sparkles,
  Paperclip,
  CheckCheck,
  User,
  Info,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import { ChatChannel, DesignerContact, ChatMessage } from '../types';

interface DesignLoungesProps {
  channels: ChatChannel[];
  designers: DesignerContact[];
  channelMessages: Record<string, ChatMessage[]>;
  directMessages: Record<string, ChatMessage[]>;
  onSendMessage: (targetId: string, isChannel: boolean, content: string) => void;
}

export const DesignLounges: React.FC<DesignLoungesProps> = ({
  channels,
  designers,
  channelMessages,
  directMessages,
  onSendMessage,
}) => {
  const [activeType, setActiveType] = useState<'channel' | 'direct'>('channel');
  const [activeId, setActiveId] = useState<string>('channel-runway');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChannel = channels.find((c) => c.id === activeId);
  const currentDesigner = designers.find((d) => d.id === activeId);

  const currentMessages =
    activeType === 'channel'
      ? channelMessages[activeId] || []
      : directMessages[activeId] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(activeId, activeType === 'channel', inputText.trim());
    setInputText('');
  };

  const handleQuickPrompt = (prompt: string) => {
    onSendMessage(activeId, activeType === 'channel', prompt);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
      {/* Editorial Section Lead */}
      <div className="pb-6 mb-6 border-b border-[#E7E5E4]">
        <div className="text-xs uppercase tracking-widest text-[#78716C] font-medium">
          Real-Time Dialogue & Critique
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1917] mt-1">
          The Design Lounges & Atelier Correspondence
        </h2>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1 max-w-2xl">
          Exchange technical pattern insights, textile discoveries, and interior aesthetics with masters from Paris, Milan, Tokyo, and London.
        </p>
      </div>

      {/* Main Split Chat Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white border border-[#E7E5E4] rounded-xl shadow-xs overflow-hidden min-h-[640px]">
        {/* Left Sidebar: Lounges & Direct Contacts */}
        <div className="lg:col-span-4 border-r border-[#E7E5E4] bg-[#FAF8F5] flex flex-col justify-between">
          <div className="p-4 space-y-6 overflow-y-auto max-h-[600px]">
            {/* Lounges / Channels */}
            <div className="space-y-1.5">
              <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[#78716C]">
                Atelier Public Channels
              </div>
              {channels.map((chan) => (
                <button
                  key={chan.id}
                  onClick={() => {
                    setActiveType('channel');
                    setActiveId(chan.id);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    activeType === 'channel' && activeId === chan.id
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#57534E] hover:bg-[#EFECE6] hover:text-[#1C1917]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Hash className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{chan.name}</span>
                  </div>
                  {chan.unreadCount && chan.unreadCount > 0 && activeId !== chan.id ? (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#8C5D3B] text-white">
                      {chan.unreadCount}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            {/* Direct Contacts */}
            <div className="space-y-1.5 pt-4 border-t border-[#E7E5E4]">
              <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[#78716C]">
                Direct Atelier Dispatches
              </div>
              {designers.map((designer) => (
                <button
                  key={designer.id}
                  onClick={() => {
                    setActiveType('direct');
                    setActiveId(designer.id);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-xs transition-colors flex items-center gap-3 cursor-pointer ${
                    activeType === 'direct' && activeId === designer.id
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#57534E] hover:bg-[#EFECE6] hover:text-[#1C1917]'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#E7E5E4] text-[#1C1917] flex items-center justify-center text-xs font-semibold shrink-0">
                    {designer.avatar}
                  </div>
                  <div className="truncate flex-1">
                    <p className="font-medium truncate">{designer.name}</p>
                    <p className={`text-[11px] truncate ${
                      activeType === 'direct' && activeId === designer.id ? 'text-[#D6D3D1]' : 'text-[#78716C]'
                    }`}>
                      {designer.role} · {designer.city}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick status bar at bottom of sidebar */}
          <div className="p-4 border-t border-[#E7E5E4] bg-white text-xs text-[#78716C]">
            <p className="font-medium text-[#1C1917]">Global Atelier Network</p>
            <p className="text-[11px] mt-0.5">Live syncing with Paris, Milan & Tokyo</p>
          </div>
        </div>

        {/* Right Area: Active Chat & Discussion */}
        <div className="lg:col-span-8 flex flex-col justify-between h-[640px] bg-white">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E7E5E4] flex items-center justify-between bg-white">
            <div>
              {activeType === 'channel' ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <Hash className="w-4 h-4 text-[#8C5D3B]" />
                    <h3 className="font-semibold text-sm text-[#1C1917]">
                      {currentChannel?.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#78716C] mt-0.5 truncate max-w-lg">
                    {currentChannel?.topic}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-[#1C1917]">
                      {currentDesigner?.name}
                    </h3>
                    <span className="text-xs text-[#8C5D3B]">
                      {currentDesigner?.handle}
                    </span>
                  </div>
                  <p className="text-xs text-[#78716C] mt-0.5">
                    {currentDesigner?.role} · {currentDesigner?.city}
                  </p>
                </>
              )}
            </div>

            {activeType === 'direct' && currentDesigner && (
              <div className="text-xs text-right hidden sm:block">
                <span className="text-emerald-700 font-medium">● Available in Atelier</span>
              </div>
            )}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FCFBF9]">
            {/* Context Notice */}
            <div className="p-3 bg-white border border-[#E7E5E4] rounded-md text-xs text-[#78716C] flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#8C5D3B] shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-[#1C1917]">
                  {activeType === 'channel' ? currentChannel?.name : currentDesigner?.name}
                </span>
                <p className="mt-0.5 text-[#57534E]">
                  {activeType === 'channel'
                    ? currentChannel?.description
                    : currentDesigner?.bio}
                </p>
              </div>
            </div>

            {/* Render Messages */}
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
              >
                {!msg.isMe && (
                  <div className="flex items-center gap-2 mb-1 px-1 text-xs">
                    <span className="font-semibold text-[#1C1917]">{msg.senderName}</span>
                    <span className="text-[11px] text-[#A8A29E] font-mono tabular-nums">
                      {msg.timestamp}
                    </span>
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-lg text-xs leading-relaxed ${
                    msg.isMe
                      ? 'bg-[#1C1917] text-white rounded-br-xs'
                      : 'bg-white text-[#292524] border border-[#E7E5E4] rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>

                {msg.isMe && (
                  <div className="flex items-center gap-1 mt-1 px-1 text-[11px] font-mono text-[#A8A29E]">
                    <span>{msg.timestamp}</span>
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Discussion Starters */}
          <div className="px-6 py-2 bg-white border-t border-[#F5F5F4] flex items-center gap-2 overflow-x-auto text-[11px] scrollbar-none">
            <span className="text-[#A8A29E] font-medium shrink-0">Prompts:</span>
            {activeType === 'channel' ? (
              <>
                <button
                  onClick={() =>
                    handleQuickPrompt(
                      'What is your recommended fabric weight for unlined outerwear this season?'
                    )
                  }
                  className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E7E5E4] rounded hover:bg-[#EFECE6] text-[#57534E] shrink-0 cursor-pointer transition-colors"
                >
                  Outerwear fabric weight?
                </button>
                <button
                  onClick={() =>
                    handleQuickPrompt(
                      'How do you balance high Haussmann ceilings with low-profile living furniture?'
                    )
                  }
                  className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E7E5E4] rounded hover:bg-[#EFECE6] text-[#57534E] shrink-0 cursor-pointer transition-colors"
                >
                  Ceilings & furniture balance?
                </button>
                <button
                  onClick={() =>
                    handleQuickPrompt(
                      'Any tips for drafting an architectural raglan shoulder without foam inserts?'
                    )
                  }
                  className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E7E5E4] rounded hover:bg-[#EFECE6] text-[#57534E] shrink-0 cursor-pointer transition-colors"
                >
                  Raglan shoulder technique?
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    handleQuickPrompt(
                      `Bonjour ${currentDesigner?.name}, could you critique my choice of raw linen for structural silhouettes?`
                    )
                  }
                  className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E7E5E4] rounded hover:bg-[#EFECE6] text-[#57534E] shrink-0 cursor-pointer transition-colors"
                >
                  Request critique on linen drape
                </button>
                <button
                  onClick={() =>
                    handleQuickPrompt(
                      `What are your favorite mill sources for this upcoming collection?`
                    )
                  }
                  className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E7E5E4] rounded hover:bg-[#EFECE6] text-[#57534E] shrink-0 cursor-pointer transition-colors"
                >
                  Mill recommendations
                </button>
              </>
            )}
          </div>

          {/* Interactive Chat Input Form */}
          <form
            onSubmit={handleSend}
            className="p-4 border-t border-[#E7E5E4] bg-white flex items-center gap-3"
          >
            <input
              type="text"
              placeholder={
                activeType === 'channel'
                  ? `Message #${currentChannel?.name}...`
                  : `Direct message to ${currentDesigner?.name}...`
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E5E4] rounded-md focus:outline-none focus:border-[#1C1917] text-[#1C1917] placeholder:text-[#A8A29E]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1C1917] text-white text-xs font-medium rounded-md hover:bg-[#322E2B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
