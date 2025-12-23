'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
    Search,
    ShoppingCart,
    Heart,
    Bell,
    User,
    Menu,
    X,
    ChevronDown,
    Store,
    Package,
    MessageCircle,
    LogOut,
    Settings,
    Moon,
    Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { theme, setTheme } = useTheme();

    // Mock data - akan diganti dengan data real dari API
    const isLoggedIn = false;
    const cartCount = 0;
    const notifCount = 0;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Top bar - Promo */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-center py-2 text-sm">
                <span className="font-medium">🎉 Gratis Ongkir untuk Pembelian Pertama!</span>
                <Link href="/promo" className="ml-2 underline hover:no-underline">
                    Lihat Promo
                </Link>
            </div>

            {/* Main header */}
            <div className="container-app">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <span className="hidden sm:block text-xl font-display font-bold gradient-text">
                            SuaStore
                        </span>
                    </Link>

                    {/* Search bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari produk, kategori, atau toko..."
                                className="input pl-4 pr-12 h-11 w-full rounded-full border-2 border-gray-200 focus:border-primary-500"
                            />
                            <button
                                type="submit"
                                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-primary-500 hover:bg-primary-600 text-white rounded-full transition-colors"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </form>

                    {/* Actions */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Theme toggle */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            aria-label="Toggle theme"
                        >
                            <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </button>

                        {/* Wishlist */}
                        <Link
                            href="/wishlist"
                            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <Heart className="w-5 h-5" />
                        </Link>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Notifications */}
                        {isLoggedIn && (
                            <Link
                                href="/notifications"
                                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <Bell className="w-5 h-5" />
                                {notifCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {notifCount > 99 ? '99+' : notifCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* User menu / Auth buttons */}
                        {isLoggedIn ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                        <User className="w-4 h-4 text-primary-600" />
                                    </div>
                                    <ChevronDown className="w-4 h-4 hidden sm:block" />
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-lg border border-border py-2 animate-slide-down">
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <User className="w-4 h-4" />
                                            <span>Profil Saya</span>
                                        </Link>
                                        <Link
                                            href="/orders"
                                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <Package className="w-4 h-4" />
                                            <span>Pesanan Saya</span>
                                        </Link>
                                        <Link
                                            href="/store"
                                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <Store className="w-4 h-4" />
                                            <span>Toko Saya</span>
                                        </Link>
                                        <Link
                                            href="/chat"
                                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            <span>Chat</span>
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <Settings className="w-4 h-4" />
                                            <span>Pengaturan</span>
                                        </Link>
                                        <hr className="my-2 border-border" />
                                        <button
                                            onClick={() => {
                                                /* logout */
                                            }}
                                            className="flex items-center gap-3 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Keluar</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2">
                                <Link href="/auth/login" className="btn btn-ghost btn-sm">
                                    Masuk
                                </Link>
                                <Link href="/auth/register" className="btn btn-primary btn-sm">
                                    Daftar
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Search bar - Mobile */}
                <form onSubmit={handleSearch} className="md:hidden pb-3">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari produk..."
                            className="input pl-4 pr-12 h-10 w-full rounded-full"
                        />
                        <button
                            type="submit"
                            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-primary-500 hover:bg-primary-600 text-white rounded-full transition-colors"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-border bg-background animate-slide-down">
                    <nav className="container-app py-4 space-y-2">
                        <Link
                            href="/categories"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        >
                            Kategori
                        </Link>
                        <Link
                            href="/promo"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        >
                            Promo
                        </Link>
                        {!isLoggedIn && (
                            <>
                                <hr className="border-border" />
                                <Link
                                    href="/auth/login"
                                    className="block px-4 py-2 text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="block px-4 py-2 bg-primary-500 text-white hover:bg-primary-600 rounded-lg text-center"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
