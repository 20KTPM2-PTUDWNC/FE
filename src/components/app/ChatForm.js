// ChatComponent.js
import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { FaRegCircleQuestion } from "react-icons/fa6";
import { getUser } from '../../features/user';
const ChatComponent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const chatHeaderColor = 'bg-[#ff4757]';
  const chatTextColor = 'text-white';
  const chatInsideColor = 'text-black'
  const chatFormBackgroundColor = 'bg-white';
  const chatFormTextColor = 'text-gray-800';
  const user = getUser()
  const [isDragging, setIsDragging] = useState(false);

  const handleChatClick = () => {
    // Check if the user is not dragging before toggling chat visibility
    if (!isDragging) {
      setIsChatOpen(!isChatOpen);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const userMessage = { text: message, sender: 'user' };
      const responseMessage = { text: 'Hello! How can I help you?', sender: 'other' };

      setMessages([...messages, userMessage, responseMessage]);
      setMessage('');
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  if (user)
    return (
      <div

      >
        <div
          className={`absolute right-0 bottom-0 m-4 ${chatTextColor} p-2 font-sans z-0`}


        >
          {isChatOpen ? (
            <div className={`w-[350px] h-96 ${chatFormBackgroundColor} ${chatTextColor} rounded-md overflow-hidden flex flex-col`}>
              <div className={`flex-shrink-0 font-semibold ${chatHeaderColor} ${chatTextColor} py-2 px-4`}>
                Customer Service
              </div>
              <div
                ref={chatContainerRef}
                className={`flex-1 overflow-y-auto p-4 `}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${chatInsideColor} ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className={`flex-shrink-0 ${chatInsideColor} flex items-center justify-between p-2 border-t`}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`flex-1 px-2 py-1 border rounded-md mr-2`}
                  placeholder="Type a message..."
                />
                <button
                  className={`${chatHeaderColor} text-white px-4 py-2 rounded-md font-semibold`}
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
              <div className={`${chatHeaderColor} text-center  p-2 font-semibold`}
                onClick={handleChatClick}
              >
                Close
              </div>
            </div>
          ) : (
            <div className={`${chatHeaderColor} rounded-full `}
              onClick={handleChatClick}
            >
              <FaRegCircleQuestion size={'50px'} />
            </div>
          )}
        </div>
      </div>
    );
};

export default ChatComponent;
