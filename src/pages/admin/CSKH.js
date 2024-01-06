import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../features/user';

const CSKH = () => {
    const [messages, setMessages] = useState([
        { user: 'User1', text: 'Hello there!' },
        { user: 'User2', text: 'Hi! How are you?' },
    ]);
    const navigate = useNavigate();
    const user = getUser();
    const [newMessage, setNewMessage] = useState('');
    useEffect(() => {
        if (!user) {
            navigate("/signin")
        }

    }, [])
    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };
    useEffect(() => {
        if (!user) {
            navigate("/signin")
        }

    }, [])
    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const updatedMessages = [...messages, { user: 'User1', text: newMessage }];
        setMessages(updatedMessages);
        setNewMessage('');
    };

    return (
        <>
            <main className="ml-60 pt-16 h-screen bg-yellow-50 overflow-auto">
                <div className="px-6 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white max-h-[600px] rounded-3xl p-8 mb-5">
                            <h1 className="text-3xl font-bold mb-10">Account Management</h1>


                            <hr className="mb-10" />

                            {/* <div className="grid grid-cols-2 gap-x-20"> */}
                            <div className="max-w-screen-md mx-auto flex">
                                {/* Left side (User2's chat) */}
                                <div className="flex-1">
                                    <div className="border border-gray-300 rounded-lg p-4 h-80 overflow-y-scroll mb-4">
                                        {messages.map((message, index) => (
                                            <div key={index} className={`mb-2 ${message.user === 'User1' ? 'text-right' : 'text-left'}`}>
                                                <strong>{message.user}:</strong> {message.text}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex  border border-gray-300 p-2 rounded-lg p-3">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={handleInputChange}
                                            className="flex-1 mr-2"
                                        />
                                        <button onClick={handleSendMessage} className="bg-gray-900 text-white p-3 rounded-lg">
                                            <p className="font-bold text-sm">Send</p>
                                        </button>
                                    </div>
                                </div>


                                {/* <div className="flex-1">
                                   
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>



        </>
    );
};

export default CSKH;