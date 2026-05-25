import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Plus, MessageSquare, Menu, X, Check, Copy, Sun, Moon } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'; 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { server_url } from '../url';

// MINI COMPONENT: Handles individual copy state per code block box
const CodeBlock = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group rounded-lg overflow-hidden my-3 shadow-sm max-w-full text-xs md:text-sm border border-slate-700/50">
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-800 text-slate-400 font-mono text-[11px] select-none border-b border-slate-700/50">
        <span>{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 py-1 px-2 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        customStyle={{ margin: 0, padding: '1rem', background: '#1e1e1e' }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

const ChatBot = () => {
  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem('chat_assistant_sessions');
    if (savedSessions) {
      try {
        const parsed = JSON.parse(savedSessions);
        if (parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Failed to parse local storage sessions", e);
      }
    }
    return [
      {
        id: 1,
        title: "Default Conversation",
        messages: [
          {
            id: 1,
            text: "Hello! I'm your AI assistant. How can I help you today?",
            isBot: true,
            timestamp: new Date()
          }
        ]
      }
    ];
  });
  
  const [activeSessionId, setActiveSessionId] = useState(() => {
    const savedActiveId = localStorage.getItem('chat_assistant_active_id');
    return savedActiveId ? Number(savedActiveId) : sessions[0].id;
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('chat_assistant_theme');
    return savedTheme === 'dark';
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession.messages, isLoading]);

  useEffect(() => {
    localStorage.setItem('chat_assistant_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('chat_assistant_active_id', activeSessionId);
  }, [activeSessionId]);

  useEffect(() => {
    localStorage.setItem('chat_assistant_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleNewChat = () => {
    const newId = Date.now();
    const newSession = {
      id: newId,
      title: `Chat Session ${sessions.length + 1}`,
      messages: [
        {
          id: Date.now() + 5,
          text: "Hello! This is a fresh chat window. How can I help you now?",
          isBot: true,
          timestamp: new Date()
        }
      ]
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newId);
    setIsSidebarOpen(false);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
      
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    let updatedTitle = activeSession.title;
    if (activeSession.messages.length === 1) {
      updatedTitle = inputMessage.length > 22 ? inputMessage.substring(0, 20) + "..." : inputMessage;
    }

    const updatedMessages = [...activeSession.messages, userMessage];

    setSessions(prev => prev.map(session => {
      if (session.id === activeSessionId) {
        return {
          ...session,
          title: updatedTitle,
          messages: updatedMessages
        };
      }
      return session;
    }));

    const messageToQuery = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    
    // FRONTEND FAIL-SAFE: Filter out the hardcoded system greeting if it sits at index 0.
    // This provides fallback security so Gemini never errors out if backend checks are bypassed.
    let cleanHistoryForPayload = [...updatedMessages];
    if (cleanHistoryForPayload.length > 0 && cleanHistoryForPayload[0].isBot === true) {
      cleanHistoryForPayload.shift();
    }

    let obj = { 
      inputMessage: messageToQuery,
      chatHistory: JSON.stringify(cleanHistoryForPayload) // Securely bundled data
    };
    let url = server_url + "/chat";

    try {
      let resp = await axios.post(url, obj, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (resp.data.status === true) {
        const botMessage = {
          id: Date.now() + 1,
          text: resp.data.reply,
          isBot: true,
          timestamp: new Date()
        };

        setSessions(prev => prev.map(session => {
          if (session.id === activeSessionId) {
            return {
              ...session,
              messages: [...session.messages, botMessage]
            };
          }
          return session;
        }));
      } else {
        alert("Network issue");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    /* MAIN CONTAINER */
    <div className={`flex h-screen w-full max-w-6xl mx-auto shadow-xl md:rounded-xl overflow-hidden relative border transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100 border-slate-800' : 'bg-white text-slate-800 border-slate-200'
    }`}>
      
      {/* SIDEBAR COMPONENT */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-100 flex flex-col transform transition-transform duration-300 md:relative md:transform-none border-r border-slate-800 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-4 flex items-center justify-between border-b border-slate-800 md:hidden">
          <span className="font-semibold text-xs tracking-wider text-slate-400">CHATS OVERVIEW</span>
          <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <button 
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-medium rounded-lg transition-all duration-150 shadow-sm transform active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => {
                setActiveSessionId(session.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-all duration-150 truncate ${
                session.id === activeSessionId
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/50'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4 flex-shrink-0 text-slate-500" />
              <span className="truncate flex-1">{session.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Background Mask blur for mobile views */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* MAIN CONVERSATION COMPONENT LAYOUT SPACE */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
        {/* Header Module Navbar */}
        <div className={`p-4 md:px-6 md:py-4 shadow-sm flex-shrink-0 flex items-center justify-between border-b transition-colors duration-300 ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <div className="flex items-center gap-3 min-w-0">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className={`p-1.5 rounded-lg border md:hidden flex-shrink-0 transition-colors ${
                darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Menu className="w-4 h-4" />
            </button>
            
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${
              darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
            }`}>
              <Bot className="w-4 h-4" />
            </div>
            <div className="truncate min-w-0">
              <h1 className="text-sm md:text-base font-semibold tracking-tight truncate">{activeSession.title}</h1>
              <p className={`text-[10px] md:text-xs truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Enterprise AI Assistant Platform</p>
            </div>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg border transition-all duration-150 active:scale-95 ${
              darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-200 hover:bg-slate-100'
            }`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>

        {/* Dynamic Messages Grid Workspace Container */}
        <div className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 break-words transition-colors duration-300 ${
          darkMode ? 'bg-slate-950' : 'bg-slate-50/50'
        }`}>
          {activeSession.messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.isBot ? 'justify-start' : 'justify-end'
              } animate-in fade-in-50 duration-200`}
            >
              {message.isBot && (
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border shadow-sm ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
                }`}>
                  <Bot className="w-4 h-4" />
                </div>
              )}
              
              <div
                className={`max-w-[85%] md:max-w-[78%] px-4 py-2.5 rounded-xl border shadow-sm overflow-x-auto ${
                  message.isBot
                    ? darkMode 
                      ? 'bg-slate-900 border-slate-800/80 text-slate-100' 
                      : 'bg-white border-slate-200 text-slate-800'
                    : darkMode
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-slate-800 border-slate-900 text-slate-100'
                }`}
              >
                <div className="text-sm leading-relaxed font-normal transition-all">
                  {message.text && message.text.startsWith('data:image') ? (
                    <div className={`my-1 max-w-full overflow-hidden rounded-lg border shadow-sm ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                      <img 
                        src={message.text} 
                        alt="AI Generated Output" 
                        className="w-full h-auto object-contain max-h-[350px]"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <ReactMarkdown 
                      components={{
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2 space-y-1 text-inherit/90" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2 space-y-1 text-inherit/90" {...props} />,
                        li: ({node, ...props}) => <li className="text-sm" {...props} />,
                        h1: ({node, ...props}) => <h1 className="text-base font-bold mb-1.5 mt-1 text-inherit" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-sm font-bold mb-1.5 mt-1 text-inherit" {...props} />,
                        code: ({node, inline, className, children, ...props}) => {
                          const match = /language-(\w+)/.exec(className || '');
                          const rawCodeString = String(children).replace(/\n$/, '');
                          
                          return !inline && match ? (
                            <CodeBlock 
                              language={match[1]} 
                              value={rawCodeString} 
                              {...props} 
                            />
                          ) : (
                            <code className={`px-1.5 py-0.5 rounded font-mono text-xs md:text-sm break-all font-medium ${
                              darkMode ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            }`} {...props}>
                              {children}
                            </code>
                          );
                        }
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  )}
                </div>

                <p className={`text-[10px] mt-1.5 font-normal text-right select-none ${
                  message.isBot 
                    ? darkMode ? 'text-slate-500' : 'text-slate-400' 
                    : darkMode ? 'text-slate-400' : 'text-slate-300'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>

              {!message.isBot && (
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border shadow-sm ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
                }`}>
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Wait Loader Widget */}
          {isLoading && (
            <div className="flex items-start gap-3 animate-in fade-in-50 duration-200">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border shadow-sm ${
                darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
              }`}>
                <Bot className="w-4 h-4" />
              </div>
              <div className={`border rounded-xl px-4 py-2.5 shadow-sm transition-colors duration-300 ${
                darkMode ? 'bg-slate-900 border-slate-800/80' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center gap-2.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400" />
                  <div className="flex gap-1 select-none">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Processing request...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Field Module */}
        <div className={`border-t p-4 md:px-6 md:py-4 flex-shrink-0 transition-colors duration-300 ${
          darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
        }`}>
          <div className="flex items-end gap-2 md:gap-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Send a message..."
                disabled={isLoading}
                className={`w-full px-3.5 py-2.5 border rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 disabled:cursor-not-allowed transition-all duration-150 text-sm ${
                  darkMode 
                    ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 disabled:bg-slate-900' 
                    : 'bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 disabled:bg-slate-50'
                }`}
                rows={1}
                style={{ minHeight: '42px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={`p-3 rounded-xl border font-medium transition-all duration-150 transform active:scale-95 flex-shrink-0 ${
                darkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 disabled:bg-slate-900 disabled:border-slate-800 disabled:text-slate-600'
                  : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900 disabled:bg-slate-100 disabled:border-slate-200 disabled:text-slate-400'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          <p className={`text-[10px] mt-2 flex items-center gap-1.5 select-none ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
            <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
            Press Enter to send, Shift+Enter for line break
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;``