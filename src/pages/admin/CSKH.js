import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userReview, userReviewList } from '../../api/user/user.api';
import { getCookies, getUser } from '../../features/user';

const CSKH = () => {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    const user = getUser();
    const [newMessage, setNewMessage] = useState('');
    useEffect(() => {
        if (!user || (user && user.userFlag !== 0)) {
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
    const handleSendMessage = async (listReview) => {
        if (newMessage.trim() !== '') {
            // const userMessage = { text: message, sender: 'user' };
            // const responseMessage = { text: 'Hello! How can I help you?', sender: 'other' };

            // setMessages([...messages, userMessage, responseMessage]);
            const dataMessage = {
                "studentId": sessionStorage.getItem("customerSelected"),
                "text": newMessage,
                "sort": listReview.length + 1,
                "userId": user._id
            }
            console.log("data", dataMessage)
            console.log(getCookies())
            const res = await userReview(dataMessage)
            if (res.status === 200) {
                setNewMessage('');
                getUserReviews()
                alert("oke")
                console.log(res.data)
            }
        }
    };
    const getUserReviews = async () => {
        if (!user)
            return
        const response = await userReviewList(sessionStorage.getItem("customerSelected"))
        if (response.status === 200) {
            console.log(response.data)
            setMessages(response.data)
        }
    }
    useEffect(() => {

        const intervalId = setInterval(() => {
            getUserReviews();
            console.log('Code executed every 2000 milliseconds');
        }, 2000);

        // Clean up the interval to avoid memory leaks
        return () => clearInterval(intervalId);
    }, [])

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
                                            <div key={index} className={`mb-2 ${message.userId._id === user._id ? 'text-right' : 'text-left'}`}>
                                                {message.userId._id !== user._id && (
                                                    <strong>{message.userId.name}: {" "}</strong>
                                                )}
                                                {message.text}
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
                                        <button onClick={() => handleSendMessage(messages)} className="bg-gray-900 text-white p-3 rounded-lg">
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