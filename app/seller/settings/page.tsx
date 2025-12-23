'use client';

import { useState } from 'react';
import {
    Store,
    Image,
    MapPin,
    Clock,
    Bell,
    Shield,
    CreditCard,
    Truck,
    Save,
    Camera,
    Toggle
} from 'lucide-react';

export default function SellerSettingsPage() {
    const [activeTab, setActiveTab] = useState('store');
    const [isOnHoliday, setIsOnHoliday] = useState(false);

    const tabs = [
        { id: 'store', label: 'Toko', icon: Store },
        { id: 'shipping', label: 'Pengiriman', icon: Truck },
        { id: 'notifications', label: 'Notifikasi', icon: Bell },
        { id: 'security', label: 'Keamanan', icon: Shield },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Pengaturan Toko</h1>
                <p className="text-gray-500">Kelola informasi dan preferensi toko</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors ${activeTab === tab.id
                                ? 'bg-primary-500 text-white'
                                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                            }`}
                    >
                        <tab.icon className="w-5 h-5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            {activeTab === 'store' && (
                <div className="space-y-6">
                    {/* Store Profile */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-lg mb-6">Profil Toko</h2>

                        {/* Banner & Logo */}
                        <div className="relative mb-8">
                            <div className="h-32 bg-gradient-to-r from-primary-400 to-accent-400 rounded-xl relative overflow-hidden">
                                <button className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/50 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-black/60">
                                    <Camera className="w-4 h-4" />
                                    Ubah Banner
                                </button>
                            </div>
                            <div className="absolute -bottom-8 left-6">
                                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-700 border-4 border-white dark:border-gray-800 flex items-center justify-center relative">
                                    <Store className="w-10 h-10 text-gray-400" />
                                    <button className="absolute -bottom-1 -right-1 p-1.5 bg-primary-500 text-white rounded-full">
                                        <Camera className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="space-y-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Nama Toko</label>
                                <input
                                    type="text"
                                    defaultValue="Apple Store Official"
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Deskripsi Toko</label>
                                <textarea
                                    rows={3}
                                    defaultValue="Toko resmi Apple Indonesia. Menjual berbagai produk Apple original dengan garansi resmi."
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Provinsi</label>
                                    <select className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl">
                                        <option>DKI Jakarta</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Kota</label>
                                    <select className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl">
                                        <option>Jakarta Selatan</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Holiday Mode */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                                    <Clock className="w-6 h-6 text-yellow-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Mode Libur</h3>
                                    <p className="text-sm text-gray-500">Nonaktifkan toko sementara saat Anda tidak bisa melayani pesanan</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOnHoliday(!isOnHoliday)}
                                className={`relative w-14 h-8 rounded-full transition-colors ${isOnHoliday ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                            >
                                <span className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform shadow ${isOnHoliday ? 'left-7' : 'left-1'
                                    }`} />
                            </button>
                        </div>

                        {isOnHoliday && (
                            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                                <label className="block text-sm font-medium mb-2">Catatan untuk Pembeli</label>
                                <textarea
                                    rows={2}
                                    placeholder="Contoh: Toko libur sampai tanggal 25 Desember 2024"
                                    className="w-full px-4 py-3 border border-yellow-200 dark:border-yellow-700 rounded-xl resize-none bg-white dark:bg-gray-800"
                                />
                            </div>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2">
                            <Save className="w-5 h-5" />
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'shipping' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-bold text-lg mb-6">Pengaturan Pengiriman</h2>

                    <div className="space-y-4">
                        <p className="text-gray-500 mb-4">Pilih jasa pengiriman yang tersedia untuk toko Anda</p>

                        {['JNE', 'J&T Express', 'SiCepat', 'AnterAja', 'Ninja Xpress', 'GoSend'].map((courier) => (
                            <div key={courier} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                        <Truck className="w-6 h-6 text-gray-500" />
                                    </div>
                                    <span className="font-medium">{courier}</span>
                                </div>
                                <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'notifications' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-bold text-lg mb-6">Pengaturan Notifikasi</h2>

                    <div className="space-y-4">
                        {[
                            { label: 'Pesanan Baru', desc: 'Notifikasi saat ada pesanan masuk' },
                            { label: 'Chat Pembeli', desc: 'Notifikasi saat ada pesan dari pembeli' },
                            { label: 'Ulasan Produk', desc: 'Notifikasi saat ada ulasan baru' },
                            { label: 'Laporan Keuangan', desc: 'Ringkasan keuangan mingguan via email' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                                <div>
                                    <p className="font-medium">{item.label}</p>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                                <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'security' && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-bold text-lg mb-6">Keamanan Akun</h2>

                    <div className="space-y-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="font-medium">Ubah Password</p>
                                    <p className="text-sm text-gray-500">Terakhir diubah 30 hari yang lalu</p>
                                </div>
                                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                                    Ubah
                                </button>
                            </div>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="font-medium">Autentikasi 2 Faktor</p>
                                    <p className="text-sm text-gray-500">Tambahkan lapisan keamanan ekstra</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                                    Aktif
                                </span>
                            </div>
                        </div>

                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Riwayat Login</p>
                                    <p className="text-sm text-gray-500">Lihat aktivitas login akun Anda</p>
                                </div>
                                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                                    Lihat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
