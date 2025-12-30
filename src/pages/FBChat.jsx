import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchConversations,
    setActiveConversation,
    fetchMessages,
    addMessage,
} from "../redux/slices/chatsSlice";
import axiosInstance from "../api/axiosInstance";
import CONFIG from "../constants/config";

function FBChat() {
    const { id } = useParams(); // FB account id
    const dispatch = useDispatch();
    const { conversations, activeConversation, messages, loading, error } = useSelector((state) => state.chats);
    const { token } = useSelector((state) => state.auth);

    const [messageInput, setMessageInput] = useState("");

    // ==== BATCHING LOGIC ====
    const buffer = useRef([]);         // holds unsent messages
    const flushTimer = useRef(null);
    const FLUSH_DELAY = 5000; // ms idle time before sending batch

    const messagesEndRef = useRef(null);
    const scrollToBottom = useCallback(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    useEffect(() => {
        dispatch(setActiveConversation(null));
        dispatch(fetchConversations(id));
    }, [id, dispatch]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // ======================
    // BATCH FLUSH FUNCTION
    // ======================
    const flushBatch = async () => {
        if (!activeConversation) return;
        if (buffer.current.length === 0) return;

        const batch = [...buffer.current];
        buffer.current = []; // clear buffer

        try {
            const res = await axiosInstance.post(
                `${CONFIG.BASE_URL}/api/facebook/messages/send`,
                {
                    accountId: id,
                    chatUrl: activeConversation.chat_url || activeConversation.chatUrl,
                    text: batch,                    // SEND ARRAY!!
                    chatPartner: activeConversation.chat_partner,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!res.data.success) {
                console.error("Batch failed:", res.data.error);
            }
        } catch (err) {
            console.error("Batch send error:", err);
        }
    };

    const scheduleFlush = () => {
        if (flushTimer.current) clearTimeout(flushTimer.current);
        flushTimer.current = setTimeout(flushBatch, FLUSH_DELAY);
    };

    // ======================
    // SEND MESSAGE (BUFFERED)
    // ======================
    const handleSend = (e) => {
        e.preventDefault();
        if (!messageInput.trim() || !activeConversation) return;

        const messageText = messageInput.trim();

        const tempMessage = {
            id: Date.now(),
            text: messageText,
            sender: "You",
            timestamp: new Date().toISOString(),
        };

        dispatch(addMessage(tempMessage)); // Optimistic UI update

        // Push into buffer
        buffer.current.push({ body: messageText });

        // Schedule a batch send
        scheduleFlush();

        setMessageInput("");
    };

    const renderConversations = () => {
        if (loading) return <p className="p-3 text-gray-400">Loading...</p>;
        if (error) return <p className="p-3 text-red-400">{error}</p>;
        if (!conversations || conversations.length === 0) return <p className="p-3 text-gray-400">No conversations yet.</p>;

        return conversations
            .filter((c) => c?.id && c?.chat_partner)
            .map((conv) => (
                <div
                    key={conv.id}
                    onClick={() => {
                        dispatch(setActiveConversation(conv));
                        dispatch(fetchMessages(conv.id));
                    }}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-700 ${activeConversation?.id === conv.id ? "bg-gray-700" : ""
                        }`}
                >
                    <p className="font-semibold">{conv.chat_partner}</p>
                </div>
            ));
    };

    const renderMessages = () => {
        if (!activeConversation) return <p className="text-gray-400">Choose a conversation to view messages.</p>;
        if (loading) return <p className="text-gray-400">Loading messages...</p>;
        if (!messages || messages.length === 0) return <p className="text-gray-400">No messages yet.</p>;

        return messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                <div
                    className={`px-3 py-2 rounded-lg max-w-xs break-words whitespace-pre-wrap ${msg.sender === "You" ? "bg-green-600 text-white" : "bg-gray-600 text-white"
                        }`}
                >
                    <p>{msg.text}</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div
                className={`
        bg-gray-900 text-white border-r border-gray-700
        w-full sm:w-64
        h-full overflow-y-auto
        ${activeConversation ? "hidden sm:block" : "block"}
      `}
            >
                <h3 className="p-3 font-bold border-b border-gray-700">
                    Conversations
                </h3>
                {renderConversations()}
            </div>

            {/* Chat Window */}
            <div
                className={`
                flex-1 flex flex-col bg-gray-800
                h-full min-h-0
                ${activeConversation ? "block" : "hidden sm:flex"}
            `}
            >
                {/* Header */}
                <div className="p-3 border-b border-gray-700 text-white font-bold flex items-center gap-2">
                    {/* Mobile back button */}
                    <button
                        onClick={() => dispatch(setActiveConversation(null))}
                        className="sm:hidden bg-gray-700 px-2 py-1 rounded text-sm"
                    >
                        ← Back
                    </button>

                    <span>
                        {activeConversation
                            ? activeConversation.chat_partner
                            : "Select a conversation"}
                    </span>
                </div>

                {/* Messages */}
                <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 text-white">
                    {renderMessages()}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                {activeConversation && (
                    <form
                        onSubmit={handleSend}
                        className="p-3 border-t border-gray-700 flex gap-2"
                    >
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            Send
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default FBChat;
