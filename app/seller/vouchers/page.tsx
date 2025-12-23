'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    Tag,
    Percent,
    DollarSign,
    Calendar,
    Users,
    Edit,
    Trash2,
    Copy,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';

// Mock vouchers data
const vouchers = [
    {
        id: 1,
        code: 'NEWYEAR25',
        name: 'Promo Tahun Baru',
        type: 'percentage',
        value: 25,
        minPurchase: 500000,
        maxDiscount: 100000,
        quota: 100,
        used: 45,
        startDate: '2024-12-25',
        endDate: '2025-01-05',
        isActive: true
    },
    {
        id: 2,
        code: 'CASHBACK50K',
        name: 'Cashback 50rb',
        type: 'fixed',
        value: 50000,
        minPurchase: 300000,
        maxDiscount: null,
        quota: 50,
        used: 32,
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        isActive: true
    },
    {
        id: 3,
        code: 'HEMAT15',
        name: 'Hemat 15%',
        type: 'percentage',
        value: 15,
        minPurchase: 200000,
        maxDiscount: 75000,
        quota: 200,
        used: 200,
        startDate: '2024-11-01',
        endDate: '2024-11-30',
        isActive: false
    },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

export default function SellerVouchersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    const filteredVouchers = vouchers.filter(v =>
        v.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        // Toast notification would go here
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Voucher Toko</h1>
                    <p className="text-gray-500">Kelola voucher dan promo toko</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn-primary px-4 py-2 rounded-xl flex items-center gap-2 justify-center"
                >
                    <Plus className="w-5 h-5" />
                    Buat Voucher
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <Tag className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{vouchers.filter(v => v.isActive).length}</p>
                            <p className="text-sm text-gray-500">Voucher Aktif</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                            <Users className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{vouchers.reduce((acc, v) => acc + v.used, 0)}</p>
                            <p className="text-sm text-gray-500">Total Penggunaan</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                            <DollarSign className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">Rp 12.5jt</p>
                            <p className="text-sm text-gray-500">Total Diskon Terpakai</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari kode atau nama voucher..."
                        className="w-full pl-12 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-transparent"
                    />
                </div>
            </div>

            {/* Vouchers List */}
            <div className="space-y-4">
                {filteredVouchers.map((voucher) => (
                    <div key={voucher.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                            {/* Voucher Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-2 rounded-lg ${voucher.type === 'percentage'
                                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'
                                            : 'bg-green-100 dark:bg-green-900/30 text-green-600'
                                        }`}>
                                        {voucher.type === 'percentage' ? <Percent className="w-5 h-5" /> : <DollarSign className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{voucher.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <code className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                                                {voucher.code}
                                            </code>
                                            <button onClick={() => copyCode(voucher.code)} className="text-gray-400 hover:text-gray-600">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-3">
                                    <span className="flex items-center gap-1">
                                        {voucher.type === 'percentage'
                                            ? `Diskon ${voucher.value}%`
                                            : formatPrice(voucher.value)}
                                    </span>
                                    <span>•</span>
                                    <span>Min. {formatPrice(voucher.minPurchase)}</span>
                                    {voucher.maxDiscount && (
                                        <>
                                            <span>•</span>
                                            <span>Maks. {formatPrice(voucher.maxDiscount)}</span>
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {formatDate(voucher.startDate)} - {formatDate(voucher.endDate)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        {voucher.used}/{voucher.quota} terpakai
                                    </span>
                                </div>
                            </div>

                            {/* Progress & Actions */}
                            <div className="flex flex-col sm:items-end gap-3">
                                {/* Usage Progress */}
                                <div className="w-full sm:w-32">
                                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${voucher.used >= voucher.quota ? 'bg-red-500' : 'bg-primary-500'
                                                }`}
                                            style={{ width: `${Math.min((voucher.used / voucher.quota) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Status & Actions */}
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${voucher.isActive && voucher.used < voucher.quota
                                            ? 'bg-green-100 text-green-600'
                                            : voucher.used >= voucher.quota
                                                ? 'bg-red-100 text-red-600'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {voucher.used >= voucher.quota ? 'Habis' : voucher.isActive ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                        <Edit className="w-4 h-4 text-gray-500" />
                                    </button>
                                    <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredVouchers.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm">
                    <Tag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-bold mb-2">Belum ada voucher</h3>
                    <p className="text-gray-500 mb-4">Buat voucher pertama untuk menarik lebih banyak pembeli</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn-primary px-6 py-2 rounded-xl inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Buat Voucher
                    </button>
                </div>
            )}

            {/* Create Voucher Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold">Buat Voucher Baru</h2>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Nama Voucher</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Promo Akhir Tahun"
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Kode Voucher</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: NEWYEAR25"
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl uppercase"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Tipe Diskon</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="px-4 py-3 border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-xl flex items-center justify-center gap-2">
                                        <Percent className="w-5 h-5" />
                                        Persentase
                                    </button>
                                    <button className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl flex items-center justify-center gap-2">
                                        <DollarSign className="w-5 h-5" />
                                        Nominal
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Nilai Diskon</label>
                                    <input
                                        type="number"
                                        placeholder="25"
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Kuota</label>
                                    <input
                                        type="number"
                                        placeholder="100"
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Mulai</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Berakhir</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Batal
                            </button>
                            <button className="flex-1 btn-primary px-4 py-3 rounded-xl">
                                Buat Voucher
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
