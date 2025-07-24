import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";

import { AppContext } from "../context/AppContext.jsx";

const ChatBox = ({ receiver, connectionId }) => {

    console.log('data of receiver', receiver);
    console.log('connId', connectionId);
    const { profile, socket, backEndURL } = useContext(AppContext);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const bottomRef = useRef(null);


    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (!socket || !connectionId) return;

        const handleIncoming = (msg) => {
            // ensure msg is part of the same chat
            if (msg.connectionId === connectionId) {
                setMessages((prev) => [...prev, msg]);
            }
            console.log("Received socket message:", msg);
        };
        socket.on("receive-message", handleIncoming);
        return () => {
            socket.off("receive-message", handleIncoming);
        };
    }, [socket, connectionId]);

    const sendMessage = async () => {

        const messageData = {
            sender: profile._id,
            receiver: receiver._id,
            content: input,
            connectionId
        };

        setMessages(prev => (Array.isArray(prev) ? [...prev, messageData] : [messageData])); // optimistically update UI

        socket.emit("send-message", messageData);
        // Save to DB
        await axios.post(backEndURL + '/api/msg', messageData);
        setInput("");
    };

    useEffect(() => {
        const loadMessages = async () => {
            const { data } = await axios.get(backEndURL + `/api/msg/${connectionId}`);
            if (data.success) {
                setMessages(data?.data);
                console.log('Loaded messages are', data?.data);
            }
        };
        if (connectionId) loadMessages();
    }, [connectionId]);


    return (
        <>
            <div className="shadow rounded-md w-full max-w-6xl  border border-orange-500">
                {/* Header */}
                <div className="flex items-center justify-between bg-orange-500 text-gray-800 px-4 py-3 rounded-t-md">
                    <div className="flex gap-2 items-center">
                        <IoPersonCircleOutline className="sm:text-3xl text-2xl" />
                        <h2 className="text-lg sm:text-xl font-semibold">
                            Chatting with {receiver?.name || "User"}
                        </h2>
                    </div>
                    <h3 className="hidden sm:block text-2xl text-gray-800 font-bold italic font-serif">Chat Room</h3>
                </div>
                {/* Messages */}
                <div className="p-4">
                    {/* msgs section */}
                    <div className="h-72 overflow-y-auto scroll-hide mb-3">
                        {messages?.map((msg, i) => {
                            const senderId = typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
                            const isSentByMe = senderId === profile._id;
                            // console.log("Message:", msg, "Sender ID:", msg.sender, "Profile ID:", profile._id);
                            return (
                                <div key={i}
                                    className={`flex sm:text-[15px] text-sm my-2  ${isSentByMe ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`inline-block max-w-xs sm:max-w-sm px-3 py-2 rounded-lg shadow ${isSentByMe ?
                                            "bg-blue-600 text-white" : "bg-orange-500 text-white"}`}>
                                        {msg.content}
                                    </div>
                                </div>

                            )
                        })}

                    </div>
                    {/* input section */}
                    <div className="flex gap-2 mt-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="border border-gray-500 px-3 py-2 flex-1 rounded text-white bg-gray-600 outline-none"
                            placeholder="Type a message..."
                        />
                        <button disabled={!input.trim()} onClick={sendMessage} className="bg-orange-500 text-white px-4 py-2 rounded disabled:opacity-50">
                            <RiSendPlaneFill className="text-2xl" />
                        </button>
                    </div>
                    <div ref={bottomRef}></div>
                </div>
            </div>
        </>
    );
};

export default ChatBox;
