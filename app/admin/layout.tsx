'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Package,
    Store,
    ShoppingBag,
    BarChart3,
    Settings,
    Bell,
    LogOut,
    Menu,
    X,
    Shield,
    ChevronDown
} from 'lucide-react';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: Store, label: 'Stores', href: '/admin/stores' },
    { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
    { icon: BarChart3, label: 'Reports', href: '/admin/reports' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between px-4 h-16">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2">
                        <Shield className="w-6 h-6 text-primary-600" />
                        <span className="font-bold">Admin Panel</span>
                    </div>
                    <button className="p-2 relative">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                </div>
            </header>

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 text-white transform transition-transform
        lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                        <Shield className="w-8 h-8 text-primary-500" />
                        <span className="font-bold text-lg">Admin Panel</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                        ? 'bg-primary-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center font-bold">
                            A
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm">Admin User</p>
                            <p className="text-xs text-gray-500">admin@suastore.com</p>
                        </div>
                    </div>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded-xl mt-2">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64">
                {/* Desktop Header */}
                <header className="hidden lg:flex h-16 items-center justify-between px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h1 className="font-bold text-lg">
                            {menuItems.find(item => item.href === pathname)?.label || 'Dashboard'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 relative hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                        <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
                                A
                            </div>
                            <span className="font-medium text-sm">Admin</span>
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
