import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import axios from 'axios'
import { server_url } from '../url';
const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mock API call - Replace this with your actual backend endpoint

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
     
        const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
 
    
    let obj={inputMessage:inputMessage}
       let url = server_url+"/chat";
              setIsLoading(true);
              let resp = await axios.post(url,obj, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
              });
                 if(resp.data.status==true){
                // alert(JSON.stringify("message   " +resp.data.reply))
              }
              else{
                alert("Network issue")
              }
             let msgdata=resp.data.reply;
      const botMessage = {
        id: messages.length + 2,
        text: msgdata,
        isBot: true,
        timestamp: new Date()
      };

      // Add bot response to chat
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
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
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50 shadow-2xl rounded-lg 
    overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI Chat Assistant</h1>
            <p className="text-blue-100 text-sm">Powered by AI • Always here to help</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50/50 to-white/80 backdrop-blur-sm">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-4 ${
              message.isBot ? 'justify-start' : 'justify-end'
            } animate-in slide-in-from-bottom-2 duration-300`}
          >
            {message.isBot && (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white/50">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl ${
                message.isBot
                  ? 'bg-white/90 border border-gray-200/50 text-gray-800 hover:bg-white'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
              }`}
            >
              <p className="text-sm leading-relaxed font-medium">{message.text}</p>
              <p className={`text-xs mt-2 font-normal ${
                message.isBot ? 'text-gray-500' : 'text-blue-100'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>

            {!message.isBot && (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white/50">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start gap-4 animate-in slide-in-from-bottom-2 duration-300">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white/50">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl px-5 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-gradient bg-gradient-to-r from-blue-500 to-purple-600" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-gray-700 text-sm font-medium">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200/50 p-6 bg-white/80 backdrop-blur-sm">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              disabled={isLoading}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl placeholder:text-gray-400"
              rows={1}
              style={{ minHeight: '52px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-sm transform hover:scale-105 disabled:hover:scale-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatBot;