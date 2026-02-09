import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { generateFitnessAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Ready to train? I'm your AI Coach. Tell me your goals, gear, and time limit. Let's build a plan." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateFitnessAdvice(input);
    const modelMessage: ChatMessage = { role: 'model', text: responseText };

    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  return (
    <div className="bg-slate-950 min-h-screen py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-[80vh] flex flex-col">
        <div className="text-center mb-8">
           <div className="inline-flex items-center justify-center p-3 bg-slate-900 border border-slate-800 rounded-full mb-3 shadow-lg">
             <Sparkles className="h-6 w-6 text-orange-500" />
           </div>
           <h1 className="text-3xl font-black text-white uppercase italic">AI Coach</h1>
           <p className="text-slate-400 mt-2">Powered by Gemini. Training plans, form checks, and nutritional strategy.</p>
        </div>

        {/* Chat Window */}
        <div className="flex-grow bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 border border-white/10 ${
                    msg.role === 'user' ? 'bg-orange-600 ml-3' : 'bg-slate-700 mr-3'
                  }`}>
                    {msg.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                  </div>
                  
                  <div className={`p-4 rounded-2xl text-sm sm:text-base leading-relaxed whitespace-pre-wrap shadow-md ${
                    msg.role === 'user' 
                      ? 'bg-orange-600 text-white rounded-tr-none' 
                      : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-tl-none">
                    <Loader2 className="h-5 w-5 text-orange-500 animate-spin" />
                    <span className="text-slate-400 text-sm">Analyzing fitness data...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-950 border-t border-slate-800">
            <form onSubmit={handleSend} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me: 'Give me a 20 min leg burner'..."
                className="flex-grow rounded-xl bg-slate-900 border border-slate-700 text-white shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 py-3 px-5 placeholder-slate-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors uppercase"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoach;