'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import {
    User,
    Package,
    Heart,
    MapPin,
    Settings,
    CreditCard,
    Bell,
    HelpCircle,
    LogOut,
    ChevronRight,
    Camera,
    Edit2,
    ShoppingBag,
    Clock,
    Truck,
    CheckCircle,
    XCircle,
    Star
} from 'lucide-react';
import { useAuthStore } from '@/lib/store';

// Mock user data
const mockUser = {
    id: 1,
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '08123456789',
    avatar: null,
    memberSince: 'Januari 2024',
    level: 'Gold Member',
    points: 2500,
};

// Mock orders summary
const ordersSummary = [
    { status: 'pending', label: 'Belum Bayar', count: 2, icon: Clock, color: 'text-yellow-500' },
    { status: 'processing', label: 'Diproses', count: 1, icon: Package, color: 'text-blue-500' },
    { status: 'shipped', label: 'Dikirim', count: 3, icon: Truck, color: 'text-purple-500' },
    { status: 'completed', label: 'Selesai', count: 15, icon: CheckCircle, color: 'text-green-500' },
];

const menuItems = [
    { icon: Package, label: 'Pesanan Saya', href: '/profile/orders', badge: 6 },
    { icon: Heart, label: 'Wishlist', href: '/profile/wishlist', badge: 12 },
    { icon: MapPin, label: 'Alamat Pengiriman', href: '/profile/addresses' },
    { icon: CreditCard, label: 'Metode Pembayaran', href: '/profile/payment' },
    { icon: Bell, label: 'Notifikasi', href: '/profile/notifications', badge: 3 },
    { icon: Star, label: 'Ulasan Saya', href: '/profile/reviews' },
    { icon: Settings, label: 'Pengaturan Akun', href: '/profile/settings' },
    { icon: HelpCircle, label: 'Bantuan', href: '/help' },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('overview');
    const { logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-4">
                                {/* User Card */}
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-2xl font-bold">
                                                {mockUser.fullName.charAt(0)}
                                            </div>
                                            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-600">
                                                <Camera className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-lg">{mockUser.fullName}</h2>
                                            <p className="text-sm text-gray-500">@{mockUser.username}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-medium rounded-full">
                                                    {mockUser.level}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Member sejak {mockUser.memberSince}
                                    </div>
                                </div>

                                {/* Points Card */}
                                <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-5 text-white shadow-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm opacity-80">Poin Reward</span>
                                        <Link href="/profile/points" className="text-xs underline opacity-80 hover:opacity-100">
                                            Riwayat
                                        </Link>
                                    </div>
                                    <div className="text-3xl font-bold mb-2">{mockUser.points.toLocaleString()}</div>
                                    <p className="text-xs opacity-80">
                                        Tukarkan dengan voucher diskon menarik
                                    </p>
                                </div>

                                {/* Menu */}
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                                    {menuItems.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className="w-5 h-5 text-gray-400" />
                                                <span>{item.label}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {item.badge && (
                                                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                                        {item.badge}
                                                    </span>
                                                )}
                                                <ChevronRight className="w-5 h-5 text-gray-300" />
                                            </div>
                                        </Link>
                                    ))}

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Keluar</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Orders Summary */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-lg">Pesanan Saya</h2>
                                    <Link href="/profile/orders" className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1">
                                        Lihat Semua
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {ordersSummary.map((item) => (
                                        <Link
                                            key={item.status}
                                            href={`/profile/orders?status=${item.status}`}
                                            className="relative text-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                        >
                                            <div className={`inline-flex p-3 rounded-full bg-gray-100 dark:bg-gray-700 mb-2 ${item.color} group-hover:scale-110 transition-transform`}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            {item.count > 0 && (
                                                <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                                    {item.count}
                                                </span>
                                            )}
                                            <div className="text-sm font-medium">{item.label}</div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-bold text-lg">Informasi Profil</h2>
                                    <Link
                                        href="/profile/edit"
                                        className="text-primary-600 hover:text-primary-700 flex items-center gap-1"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm text-gray-500">Nama Lengkap</label>
                                        <p className="font-medium">{mockUser.fullName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Username</label>
                                        <p className="font-medium">@{mockUser.username}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Email</label>
                                        <p className="font-medium">{mockUser.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-500">Nomor HP</label>
                                        <p className="font-medium">{mockUser.phone}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link
                                    href="/store/register"
                                    className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <ShoppingBag className="w-10 h-10 mb-3 opacity-80" />
                                    <h3 className="font-bold text-lg mb-1">Buka Toko Sekarang</h3>
                                    <p className="text-sm opacity-80">Mulai jualan dan dapatkan penghasilan tambahan</p>
                                </Link>

                                <Link
                                    href="/help"
                                    className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <HelpCircle className="w-10 h-10 mb-3 opacity-80" />
                                    <h3 className="font-bold text-lg mb-1">Pusat Bantuan</h3>
                                    <p className="text-sm opacity-80">Ada pertanyaan? Kami siap membantu 24/7</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
