import React, { useState } from 'react';
import { MessageCircle, Send, X, ChevronUp } from 'lucide-react';
import { CONTACT_INFO } from '../data/cryptoAddresses';

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold">24/7 Live Support Desk</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-slate-50 text-xs">
            <p className="text-slate-600 leading-relaxed">
              Need assistance with an order, custom geotargeted reviews, or crypto payments? Chat directly with an active agent:
            </p>

            <div className="space-y-2 pt-1">
              <a
                href={CONTACT_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg text-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-sky-500" />
                  <div className="text-left">
                    <div className="font-bold text-xs">Telegram Support</div>
                    <div className="text-[10px] text-slate-500 font-mono">{CONTACT_INFO.telegram}</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-sky-600 bg-sky-50 group-hover:bg-sky-100 px-2 py-0.5 rounded">
                  Instant
                </span>
              </a>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg text-slate-800 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <div className="text-left">
                    <div className="font-bold text-xs">WhatsApp Direct</div>
                    <div className="text-[10px] text-slate-500 font-mono">{CONTACT_INFO.whatsapp}</div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 group-hover:bg-emerald-100 px-2 py-0.5 rounded">
                  Online
                </span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white px-4 py-3 rounded-full shadow-xl transition-all hover:scale-105 cursor-pointer border border-slate-700"
        aria-label="Toggle Live Chat Support"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-emerald-400" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-950" />
        </div>
        <span className="text-xs font-bold tracking-wide">24/7 Live Chat</span>
      </button>
    </div>
  );
};
