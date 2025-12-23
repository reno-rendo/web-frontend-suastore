'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    Filter,
    Package,
    ChevronDown,
    Eye,
    Truck,
    Check,
    X as XIcon,
    Clock,
    MessageSquare
} from 'lucide-react';

// Mock orders data
const orders = [
    {
        id: 'INV/20241223/001',
        customer: { name: 'John Doe', avatar: null },
        product: 'iPhone 15 Pro Max 256GB',
        quantity: 1,
        amount: 22499100,
        status: 'pending',
        date: '23 Des 2024, 10:30',
        shipping: null
    },
    {
        id: 'INV/20241223/002',
        customer: { name: 'Jane Smith', avatar: null },
        product: 'MacBook Pro M3 14"',
        quantity: 1,
        amount: 34999000,
        status: 'processing',
        date: '23 Des 2024, 09:15',
        shipping: { courier: 'JNE REG', tracking: null }
    },
    {
        id: 'INV/20241222/003',
        customer: { name: 'Ahmad Yusuf', avatar: null },
        product: 'iPad Pro 12.9"',
        quantity: 2,
        amount: 37998000,
        status: 'shipped',
        date: '22 Des 2024, 14:45',
        shipping: { courier: 'JNE REG', tracking: 'JNE123456789' }
    },
    {
        id: 'INV/20241221/004',
        customer: { name: 'Siti Aminah', avatar: null },
        product: 'AirPods Pro 2',
        quantity: 1,
        amount: 3999000,
        status: 'completed',
        date: '21 Des 2024, 11:20',
        shipping: { courier: 'JNE YES', tracking: 'JNE987654321' }
    },
];

const statusTabs = [
    { id: 'all', label: 'Semua', count: 24 },
    { id: 'pending', label: 'Pesanan Baru', count: 5 },
    { id: 'processing', label: 'Diproses', count: 3 },
    { id: 'shipped', label: 'Dikirim', count: 8 },
    { id: 'completed', label: 'Selesai', count: 6 },
    { id: 'cancelled', label: 'Dibatalkan', count: 2 },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

export default function SellerOrdersPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = activeTab === 'all' || order.status === activeTab;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        const styles: Record<string, { bg: string; icon: any; text: string }> = {
            pending: { bg: 'bg-blue-100 text-blue-600', icon: Clock, text: 'Pesanan Baru' },
            processing: { bg: 'bg-yellow-100 text-yellow-600', icon: Package, text: 'Diproses' },
            shipped: { bg: 'bg-purple-100 text-purple-600', icon: Truck, text: 'Dikirim' },
            completed: { bg: 'bg-green-100 text-green-600', icon: Check, text: 'Selesai' },
            cancelled: { bg: 'bg-red-100 text-red-600', icon: XIcon, text: 'Dibatalkan' },
        };
        const style = styles[status] || styles.pending;
        const Icon = style.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${style.bg}`}>
                <Icon className="w-3 h-3" />
                {style.text}
            </span>
        );
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Pesanan</h1>
                <p className="text-gray-500">Kelola pesanan dari pembeli</p>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {statusTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeTab === tab.id
                                ? 'bg-primary-500 text-white'
                                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                            }`}
                    >
                        {tab.label}
                        <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'
                            }`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari nomor pesanan atau nama pembeli..."
                        className="w-full pl-12 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-transparent"
                    />
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.map((order) => (
                    <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                        {/* Order Header */}
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold">
                                    {order.customer.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold">{order.customer.name}</p>
                                    <p className="text-sm text-gray-500">{order.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {getStatusBadge(order.status)}
                                <span className="text-sm text-gray-500">{order.date}</span>
                            </div>
                        </div>

                        {/* Order Content */}
                        <div className="p-4 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                    <Package className="w-8 h-8 text-gray-400" />
                                </div>
                                <div>
                                    <p className="font-medium">{order.product}</p>
                                    <p className="text-sm text-gray-500">{order.quantity} item</p>
                                    {order.shipping && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            {order.shipping.courier}
                                            {order.shipping.tracking && ` - ${order.shipping.tracking}`}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold">{formatPrice(order.amount)}</p>
                            </div>
                        </div>

                        {/* Order Actions */}
                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/seller/orders/${order.id}`}
                                    className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-600 text-sm flex items-center gap-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    Detail
                                </Link>
                                <button className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-600 text-sm flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Chat
                                </button>
                            </div>

                            {/* Action Buttons based on status */}
                            <div className="flex items-center gap-2">
                                {order.status === 'pending' && (
                                    <>
                                        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm">
                                            Terima Pesanan
                                        </button>
                                        <button className="px-4 py-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 text-sm">
                                            Tolak
                                        </button>
                                    </>
                                )}
                                {order.status === 'processing' && (
                                    <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm flex items-center gap-2">
                                        <Truck className="w-4 h-4" />
                                        Input Resi
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm">
                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-bold mb-2">Tidak ada pesanan</h3>
                    <p className="text-gray-500">Belum ada pesanan dengan status ini.</p>
                </div>
            )}
        </div>
    );
}
