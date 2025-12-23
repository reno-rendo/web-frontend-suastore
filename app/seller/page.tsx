'use client';

import {
    Package,
    ShoppingBag,
    DollarSign,
    Star,
    TrendingUp,
    TrendingDown,
    Eye,
    MessageSquare,
    ArrowUpRight,
    ChevronRight
} from 'lucide-react';
import Link from 'next/link';

// Mock data
const stats = [
    {
        label: 'Total Penjualan',
        value: 'Rp 45.800.000',
        change: '+12.5%',
        trend: 'up',
        icon: DollarSign,
        color: 'text-green-500 bg-green-50 dark:bg-green-900/20'
    },
    {
        label: 'Pesanan Baru',
        value: '24',
        change: '+8',
        trend: 'up',
        icon: ShoppingBag,
        color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
    },
    {
        label: 'Total Produk',
        value: '156',
        change: '+3',
        trend: 'up',
        icon: Package,
        color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20'
    },
    {
        label: 'Rating Toko',
        value: '4.9',
        change: '+0.1',
        trend: 'up',
        icon: Star,
        color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
    },
];

const recentOrders = [
    { id: 'INV/20241223/001', customer: 'John Doe', product: 'iPhone 15 Pro Max', amount: 'Rp 22.499.100', status: 'Baru' },
    { id: 'INV/20241223/002', customer: 'Jane Smith', product: 'MacBook Pro M3', amount: 'Rp 34.999.000', status: 'Diproses' },
    { id: 'INV/20241223/003', customer: 'Ahmad Yusuf', product: 'iPad Pro 12.9"', amount: 'Rp 18.999.000', status: 'Dikirim' },
    { id: 'INV/20241222/004', customer: 'Siti Aminah', product: 'AirPods Pro 2', amount: 'Rp 3.999.000', status: 'Selesai' },
];

const topProducts = [
    { name: 'iPhone 15 Pro Max 256GB', sold: 125, revenue: 'Rp 2.8M' },
    { name: 'MacBook Pro M3 14"', sold: 45, revenue: 'Rp 1.5M' },
    { name: 'AirPods Pro 2nd Gen', sold: 89, revenue: 'Rp 356K' },
    { name: 'iPad Pro 12.9" M2', sold: 34, revenue: 'Rp 646K' },
];

export default function SellerDashboard() {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-gray-500">Selamat datang kembali! Berikut ringkasan toko Anda.</p>
                </div>
                <div className="flex items-center gap-2">
                    <select className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent">
                        <option>7 Hari Terakhir</option>
                        <option>30 Hari Terakhir</option>
                        <option>Bulan Ini</option>
                        <option>Tahun Ini</option>
                    </select>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                }`}>
                                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                {stat.change}
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
                        <h2 className="font-bold text-lg">Pesanan Terbaru</h2>
                        <Link href="/seller/orders" className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1">
                            Lihat Semua
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm">{order.id}</p>
                                    <p className="text-gray-500 text-sm truncate">{order.product}</p>
                                    <p className="text-xs text-gray-400">{order.customer}</p>
                                </div>
                                <div className="text-right ml-4">
                                    <p className="font-semibold text-sm">{order.amount}</p>
                                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${order.status === 'Baru' ? 'bg-blue-100 text-blue-600' :
                                            order.status === 'Diproses' ? 'bg-yellow-100 text-yellow-600' :
                                                order.status === 'Dikirim' ? 'bg-purple-100 text-purple-600' :
                                                    'bg-green-100 text-green-600'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
                        <h2 className="font-bold text-lg">Produk Terlaris</h2>
                        <Link href="/seller/products" className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1">
                            Lihat
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="p-4 space-y-4">
                        {topProducts.map((product, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
                                    {i + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{product.name}</p>
                                    <p className="text-xs text-gray-500">{product.sold} terjual</p>
                                </div>
                                <span className="text-sm font-semibold text-green-600">{product.revenue}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
                <h2 className="font-bold text-lg mb-4">Aksi Cepat</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Link href="/seller/products/new" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                        <Package className="w-8 h-8 text-primary-500" />
                        <span className="text-sm font-medium text-center">Tambah Produk</span>
                    </Link>
                    <Link href="/seller/vouchers/new" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                        <DollarSign className="w-8 h-8 text-primary-500" />
                        <span className="text-sm font-medium text-center">Buat Voucher</span>
                    </Link>
                    <Link href="/seller/chat" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                        <MessageSquare className="w-8 h-8 text-primary-500" />
                        <span className="text-sm font-medium text-center">Balas Chat</span>
                    </Link>
                    <Link href="/seller/finance" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                        <ArrowUpRight className="w-8 h-8 text-primary-500" />
                        <span className="text-sm font-medium text-center">Tarik Dana</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
