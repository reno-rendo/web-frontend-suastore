'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Bell,
    Package,
    Truck,
    CreditCard,
    Tag,
    Star,
    MessageSquare,
    Gift,
    Settings,
    Check,
    CheckCheck,
    Trash2
} from 'lucide-react';

// Mock notifications data
const notifications = [
    {
        id: 1,
        type: 'order',
        icon: Package,
        title: 'Pesanan Dikonfirmasi',
        message: 'Pesanan #INV/20241223/001 telah dikonfirmasi seller',
        time: '5 menit lalu',
        read: false,
        link: '/profile/orders/1',
    },
    {
        id: 2,
        type: 'shipping',
        icon: Truck,
        title: 'Pesanan Dikirim',
        message: 'Pesanan #INV/20241222/003 sedang dalam pengiriman. Resi: JNE123456789',
        time: '2 jam lalu',
        read: false,
        link: '/profile/orders/3',
    },
    {
        id: 3,
        type: 'promo',
        icon: Tag,
        title: 'Flash Sale Natal!',
        message: 'Diskon hingga 50% untuk semua produk elektronik. Berlaku hari ini saja!',
        time: '5 jam lalu',
        read: true,
        link: '/',
    },
    {
        id: 4,
        type: 'payment',
        icon: CreditCard,
        title: 'Pembayaran Berhasil',
        message: 'Pembayaran Rp 22.499.100 untuk pesanan #INV/20241221/004 sukses',
        time: 'Kemarin',
        read: true,
        link: '/profile/orders/4',
    },
    {
        id: 5,
        type: 'review',
        icon: Star,
        title: 'Yuk Beri Ulasan!',
        message: 'Bagaimana pengalaman belanja iPhone 15 Pro Max? Beri rating sekarang',
        time: 'Kemarin',
        read: true,
        link: '/profile/orders/4',
    },
    {
        id: 6,
        type: 'chat',
        icon: MessageSquare,
        title: 'Pesan Baru',
        message: 'Apple Store Official: "Terima kasih sudah order di toko kami!"',
        time: '2 hari lalu',
        read: true,
        link: '/chat',
    },
    {
        id: 7,
        type: 'promo',
        icon: Gift,
        title: 'Voucher Gratis Ongkir',
        message: 'Kamu mendapat voucher gratis ongkir Rp 30.000. Berlaku 7 hari',
        time: '3 hari lalu',
        read: true,
        link: '/profile/vouchers',
    },
];

const tabs = [
    { id: 'all', label: 'Semua' },
    { id: 'order', label: 'Pesanan' },
    { id: 'promo', label: 'Promo' },
    { id: 'chat', label: 'Chat' },
];

const getIconColor = (type: string) => {
    switch (type) {
        case 'order': return 'bg-blue-100 text-blue-600';
        case 'shipping': return 'bg-purple-100 text-purple-600';
        case 'payment': return 'bg-green-100 text-green-600';
        case 'promo': return 'bg-red-100 text-red-600';
        case 'review': return 'bg-yellow-100 text-yellow-600';
        case 'chat': return 'bg-orange-100 text-orange-600';
        default: return 'bg-gray-100 text-gray-600';
    }
};

export default function NotificationsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [notifs, setNotifs] = useState(notifications);

    const filteredNotifs = notifs.filter(n =>
        activeTab === 'all' || n.type === activeTab ||
        (activeTab === 'order' && ['order', 'shipping', 'payment'].includes(n.type))
    );

    const unreadCount = notifs.filter(n => !n.read).length;

    const markAsRead = (id: number) => {
        setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifs(notifs.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: number) => {
        setNotifs(notifs.filter(n => n.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold">Notifikasi</h1>
                            {unreadCount > 0 && (
                                <span className="px-2 py-0.5 bg-primary-500 text-white text-xs rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={markAllAsRead}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-primary-600"
                        >
                            <CheckCheck className="w-5 h-5" />
                        </button>
                        <Link href="/settings/notifications" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <Settings className="w-5 h-5 text-gray-500" />
                        </Link>
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-3xl mx-auto px-4 pb-2">
                    <div className="flex gap-2 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${activeTab === tab.id
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Notifications List */}
            <div className="max-w-3xl mx-auto">
                {filteredNotifs.length === 0 ? (
                    <div className="p-12 text-center">
                        <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-bold mb-2">Tidak ada notifikasi</h3>
                        <p className="text-gray-500">Belum ada notifikasi untuk ditampilkan</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {filteredNotifs.map((notif) => {
                            const IconComponent = notif.icon;
                            return (
                                <div
                                    key={notif.id}
                                    className={`relative ${!notif.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : 'bg-white dark:bg-gray-800'}`}
                                >
                                    <Link
                                        href={notif.link}
                                        onClick={() => markAsRead(notif.id)}
                                        className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                    >
                                        {/* Icon */}
                                        <div className={`p-3 rounded-full ${getIconColor(notif.type)}`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <h3 className={`font-medium ${!notif.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                                                        {notif.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                                                        {notif.message}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                                </div>

                                                {/* Unread indicator */}
                                                {!notif.read && (
                                                    <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2" />
                                                )}
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Delete button */}
                                    <button
                                        onClick={() => deleteNotification(notif.id)}
                                        className="absolute right-4 top-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
