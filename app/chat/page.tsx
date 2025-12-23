'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
    Search,
    Send,
    Image as ImageIcon,
    Paperclip,
    MoreVertical,
    ChevronLeft,
    Check,
    CheckCheck,
    Package,
    Store,
    ShoppingBag,
    ArrowLeft
} from 'lucide-react';

// Mock chat data
const conversations = [
    {
        id: 1,
        store: { name: 'Apple Store Official', slug: 'apple-store', avatar: null, verified: true },
        lastMessage: 'Total Rp 22.499.100 kak, sudah termasuk gratis ongkir Jakarta 😊',
        time: '10:28',
        unread: 1,
        product: { name: 'iPhone 15 Pro Max 256GB', price: 22499100, image: null }
    },
    {
        id: 2,
        store: { name: 'Samsung Official', slug: 'samsung', avatar: null, verified: true },
        lastMessage: 'Baik kak, pesanan sudah kami proses',
        time: 'Kemarin',
        unread: 0,
        product: null
    },
    {
        id: 3,
        store: { name: 'Xiaomi Store', slug: 'xiaomi-store', avatar: null, verified: false },
        lastMessage: 'Ready stock kak, silakan order',
        time: '20 Des',
        unread: 0,
        product: { name: 'Xiaomi 14 Ultra', price: 15999000, image: null }
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
    { id: 8, sender: 'seller', text: 'Total Rp 22.499.100 kak, sudah termasuk gratis ongkir Jakarta 😊', time: '10:28', read: false },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

export default function BuyerChatPage() {
    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    const [messageText, setMessageText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (selectedChat) {
            scrollToBottom();
        }
    }, [selectedChat]);

    const handleSend = () => {
        if (!messageText.trim()) return;
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-xl font-bold">Chat</h1>
                </div>
            </header>

            <div className="max-w-6xl mx-auto flex h-[calc(100vh-64px)]">
                {/* Conversations List */}
                <div className={`w-full md:w-80 lg:w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                    {/* Search */}
                    <div className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari toko..."
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
                                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700 ${selectedChat === conv.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                                    }`}
                            >
                                {/* Store Avatar */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold">
                                        <Store className="w-6 h-6" />
                                    </div>
                                    {conv.store.verified && (
                                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-blue-500 border-2 border-white dark:border-gray-800 rounded-full flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 text-left">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold truncate">{conv.store.name}</span>
                                        <span className="text-xs text-gray-500">{conv.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                                    {conv.product && (
                                        <div className="flex items-center gap-2 mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                                <Package className="w-4 h-4 text-gray-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium truncate">{conv.product.name}</p>
                                                <p className="text-xs text-primary-600">{formatPrice(conv.product.price)}</p>
                                            </div>
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
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                                    <Store className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/store/${selectedConversation?.store.slug}`}
                                            className="font-semibold hover:text-primary-600"
                                        >
                                            {selectedConversation?.store.name}
                                        </Link>
                                        {selectedConversation?.store.verified && (
                                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                <Check className="w-2.5 h-2.5 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-green-500">Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/store/${selectedConversation?.store.slug}`}
                                    className="px-3 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Kunjungi Toko
                                </Link>
                                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                    <MoreVertical className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Product Info Bar */}
                        {selectedConversation?.product && (
                            <div className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                    <div className="w-14 h-14 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                        <Package className="w-7 h-7 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{selectedConversation.product.name}</p>
                                        <p className="text-primary-600 font-bold">{formatPrice(selectedConversation.product.price)}</p>
                                    </div>
                                    <Link href="/cart" className="btn-primary px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                                        <ShoppingBag className="w-4 h-4" />
                                        Beli
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[75%] px-4 py-2 rounded-2xl ${msg.sender === 'buyer'
                                                ? 'bg-primary-500 text-white rounded-br-sm'
                                                : 'bg-white dark:bg-gray-800 rounded-bl-sm shadow-sm'
                                            }`}
                                    >
                                        <p className="text-sm">{msg.text}</p>
                                        <div className={`flex items-center justify-end gap-1 mt-1 ${msg.sender === 'buyer' ? 'text-white/70' : 'text-gray-400'
                                            }`}>
                                            <span className="text-xs">{msg.time}</span>
                                            {msg.sender === 'buyer' && (
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
                    <div className="hidden md:flex flex-1 items-center justify-center bg-white dark:bg-gray-800">
                        <div className="text-center">
                            <Store className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <h3 className="text-lg font-bold mb-2">Pilih Percakapan</h3>
                            <p className="text-gray-500">Pilih chat untuk memulai percakapan dengan toko</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
