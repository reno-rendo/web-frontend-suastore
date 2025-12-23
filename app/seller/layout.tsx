'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    MessageSquare,
    Star,
    Settings,
    BarChart3,
    Tag,
    Users,
    Wallet,
    Store,
    ChevronLeft,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/seller' },
    { icon: Package, label: 'Produk', href: '/seller/products' },
    { icon: ShoppingBag, label: 'Pesanan', href: '/seller/orders' },
    { icon: MessageSquare, label: 'Chat', href: '/seller/chat' },
    { icon: Star, label: 'Ulasan', href: '/seller/reviews' },
    { icon: Tag, label: 'Voucher', href: '/seller/vouchers' },
    { icon: BarChart3, label: 'Statistik', href: '/seller/stats' },
    { icon: Wallet, label: 'Keuangan', href: '/seller/finance' },
    { icon: Settings, label: 'Pengaturan', href: '/seller/settings' },
];

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 flex items-center px-4">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div className="flex items-center gap-2 ml-4">
                    <Store className="w-6 h-6 text-primary-600" />
                    <span className="font-bold text-lg">Seller Center</span>
                </div>
            </header>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <Store className="w-8 h-8 text-primary-600" />
                        <div>
                            <h1 className="font-bold text-lg">Seller Center</h1>
                            <p className="text-xs text-gray-500">SuaStore</p>
                        </div>
                    </div>
                    <Link href="/" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                </div>

                {/* Store Info */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-lg">
                            A
                        </div>
                        <div>
                            <h2 className="font-semibold">Apple Store Official</h2>
                            <p className="text-xs text-gray-500">Gold Member</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/seller' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="lg:ml-64 pt-16 lg:pt-0">
                {children}
            </main>
        </div>
    );
}
