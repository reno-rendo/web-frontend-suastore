'use client';

import { useState, useRef, useEffect } from 'react';
import {
    Search,
    Send,
    Image as ImageIcon,
    Paperclip,
    MoreVertical,
    Phone,
    Video,
    ChevronLeft,
    Check,
    CheckCheck,
    Package,
    Store
} from 'lucide-react';

// Mock chat data
const conversations = [
    {
        id: 1,
        user: { name: 'John Doe', avatar: null, online: true },
        lastMessage: 'Terima kasih, sudah saya order ya',
        time: '10:30',
        unread: 0,
        product: { name: 'iPhone 15 Pro Max', image: null }
    },
    {
        id: 2,
        user: { name: 'Jane Smith', avatar: null, online: false },
        lastMessage: 'Apakah ready stock?',
        time: '09:15',
        unread: 2,
        product: { name: 'MacBook Pro M3', image: null }
    },
    {
        id: 3,
        user: { name: 'Ahmad Yusuf', avatar: null, online: true },
        lastMessage: 'Oke siap, ditunggu ya',
        time: 'Kemarin',
        unread: 0,
        product: null
    },
    {
        id: 4,
        user: { name: 'Siti Aminah', avatar: null, online: false },
        lastMessage: 'Barang sudah sampai, makasih!',
        time: 'Kemarin',
        unread: 0,
        product: null
    },
];

const messages = [
    { id: 1, sender: 'buyer', text: 'Halo, apakah barang ready?', time: '10:00', read: true },
    { id: 2, sender: 'seller', text: 'Halo kak! Ready stock ya 🎉', time: '10:02', read: true },
    { id: 3, sender: 'buyer', text: 'Warna apa saja yang tersedia?', time: '10:05', read: true },
    { id: 4, sender: 'seller', text: 'Ada Natural Titanium, Blue, White, dan Black kak', time: '10:08', read: true },
    { id: 5, sender: 'buyer', text: 'Yang Blue masih ada stok berapa unit?', time: '10:15', read: true },
    { id: 6, sender: 'seller', text: 'Untuk Blue tersedia 12 unit kak. Mau langsung order?', time: '10:18', read: true },
    { id: 7, sender: 'buyer', text: 'Iya kak, mau order 1 unit. Total berapa ya?', time: '10:25', read: true },
    { id: 8, sender: 'seller', text: 'Total Rp 22.499.100 kak, sudah termasuk gratis ongkir Jakarta 😊', time: '10:28', read: true },
    { id: 9, sender: 'buyer', text: 'Terima kasih, sudah saya order ya', time: '10:30', read: true },
];

export default function SellerChatPage() {
    const [selectedChat, setSelectedChat] = useState<number | null>(1);
    const [messageText, setMessageText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [selectedChat]);

    const handleSend = () => {
        if (!messageText.trim()) return;
        // Mock - in real app this would send to API/websocket
        console.log('Send:', messageText);
        setMessageText('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const selectedConversation = conversations.find(c => c.id === selectedChat);

    return (
        <div className="h-[calc(100vh-64px)] lg:h-screen flex">
            {/* Conversations List */}
            <div className={`w-full md:w-80 lg:w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                {/* Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <h1 className="text-xl font-bold mb-4">Chat</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari percakapan..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-transparent"
                        />
                    </div>
                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto">
                    {conversations.map((conv) => (
                        <button
                            key={conv.id}
                            onClick={() => setSelectedChat(conv.id)}
                            className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${selectedChat === conv.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                                }`}
                        >
                            {/* Avatar */}
                            <div className="relative flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold">
                                    {conv.user.name.charAt(0)}
                                </div>
                                {conv.user.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 text-left">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold truncate">{conv.user.name}</span>
                                    <span className="text-xs text-gray-500">{conv.time}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                                {conv.product && (
                                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                                        <Package className="w-3 h-3" />
                                        {conv.product.name}
                                    </div>
                                )}
                            </div>

                            {/* Unread Badge */}
                            {conv.unread > 0 && (
                                <span className="px-2 py-0.5 bg-primary-500 text-white text-xs rounded-full">
                                    {conv.unread}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            {selectedChat ? (
                <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
                    {/* Chat Header */}
                    <div className="h-16 px-4 flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSelectedChat(null)}
                                className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold">
                                {selectedConversation?.user.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-semibold">{selectedConversation?.user.name}</p>
                                <p className="text-xs text-gray-500">
                                    {selectedConversation?.user.online ? 'Online' : 'Offline'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                <Phone className="w-5 h-5 text-gray-500" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* Product Info Bar */}
                    {selectedConversation?.product && (
                        <div className="px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <Package className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{selectedConversation.product.name}</p>
                                <p className="text-xs text-gray-500">Sedang ditanyakan</p>
                            </div>
                            <button className="text-primary-600 text-sm font-medium">Lihat</button>
                        </div>
                    )}

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[75%] px-4 py-2 rounded-2xl ${msg.sender === 'seller'
                                            ? 'bg-primary-500 text-white rounded-br-sm'
                                            : 'bg-white dark:bg-gray-800 rounded-bl-sm'
                                        }`}
                                >
                                    <p className="text-sm">{msg.text}</p>
                                    <div className={`flex items-center justify-end gap-1 mt-1 ${msg.sender === 'seller' ? 'text-white/70' : 'text-gray-400'
                                        }`}>
                                        <span className="text-xs">{msg.time}</span>
                                        {msg.sender === 'seller' && (
                                            msg.read ? <CheckCheck className="w-4 h-4" /> : <Check className="w-4 h-4" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-end gap-2">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                <Paperclip className="w-5 h-5 text-gray-500" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                <ImageIcon className="w-5 h-5 text-gray-500" />
                            </button>
                            <div className="flex-1 relative">
                                <textarea
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ketik pesan..."
                                    rows={1}
                                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl resize-none max-h-32"
                                />
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={!messageText.trim()}
                                className="p-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* Empty State */
                <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
                    <div className="text-center">
                        <Store className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-bold mb-2">Pilih Percakapan</h3>
                        <p className="text-gray-500">Pilih chat untuk memulai percakapan</p>
                    </div>
                </div>
            )}
        </div>
    );
}
