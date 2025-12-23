'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
    Bell,
    Package,
    Truck,
    CreditCard,
    Tag,
    Star,
    MessageSquare,
    Settings,
    ChevronRight
} from 'lucide-react';

// Mock notifications data (subset for dropdown)
const recentNotifications = [
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
        message: 'Pesanan #INV/20241222/003 sedang dalam pengiriman',
        time: '2 jam lalu',
        read: false,
        link: '/profile/orders/3',
    },
    {
        id: 3,
        type: 'promo',
        icon: Tag,
        title: 'Flash Sale Natal!',
        message: 'Diskon hingga 50% untuk semua produk elektronik',
        time: '5 jam lalu',
        read: true,
        link: '/',
    },
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

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = recentNotifications.filter(n => !n.read).length;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-lg">Notifikasi</h3>
                        <Link
                            href="/settings/notifications"
                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            <Settings className="w-4 h-4 text-gray-500" />
                        </Link>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto">
                        {recentNotifications.length === 0 ? (
                            <div className="p-8 text-center">
                                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p className="text-gray-500 text-sm">Tidak ada notifikasi</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                {recentNotifications.map((notif) => {
                                    const IconComponent = notif.icon;
                                    return (
                                        <Link
                                            key={notif.id}
                                            href={notif.link}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${!notif.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                                                }`}
                                        >
                                            <div className={`p-2 rounded-full flex-shrink-0 ${getIconColor(notif.type)}`}>
                                                <IconComponent className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <p className={`text-sm ${!notif.read ? 'font-semibold' : 'font-medium text-gray-600 dark:text-gray-300'}`}>
                                                        {notif.title}
                                                    </p>
                                                    {!notif.read && (
                                                        <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-1.5" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                                                    {notif.message}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 dark:border-gray-700">
                        <Link
                            href="/notifications"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 px-4 py-3 text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-sm font-medium"
                        >
                            Lihat Semua Notifikasi
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
