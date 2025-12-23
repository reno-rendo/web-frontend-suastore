'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import {
    Package,
    Clock,
    Truck,
    CheckCircle,
    XCircle,
    ChevronRight,
    Search,
    Store,
    MessageCircle,
    RotateCcw,
    Star
} from 'lucide-react';

const tabs = [
    { id: 'all', label: 'Semua' },
    { id: 'pending', label: 'Belum Bayar' },
    { id: 'processing', label: 'Diproses' },
    { id: 'shipped', label: 'Dikirim' },
    { id: 'completed', label: 'Selesai' },
    { id: 'cancelled', label: 'Dibatalkan' },
];

// Mock orders data
const mockOrders = [
    {
        id: 1,
        orderNumber: 'INV/2024/12/001',
        date: '22 Des 2024',
        status: 'shipped',
        store: { name: 'Apple Store Official', slug: 'apple-store' },
        items: [
            {
                id: 1,
                name: 'iPhone 15 Pro Max 256GB',
                variant: 'Natural Titanium',
                price: 22499100,
                quantity: 1,
                image: '/products/iphone.jpg',
            }
        ],
        totalAmount: 22499100,
        shippingInfo: {
            courier: 'JNE',
            trackingNumber: 'JNE123456789',
            estimatedArrival: '25 Des 2024',
        },
    },
    {
        id: 2,
        orderNumber: 'INV/2024/12/002',
        date: '20 Des 2024',
        status: 'processing',
        store: { name: 'Nike Official Store', slug: 'nike-store' },
        items: [
            {
                id: 2,
                name: 'Nike Air Max 90 Essential',
                variant: 'Size 42',
                price: 1919200,
                quantity: 1,
                image: '/products/nike.jpg',
            },
            {
                id: 3,
                name: 'Nike Dri-FIT T-Shirt',
                variant: 'L, Black',
                price: 399000,
                quantity: 2,
                image: '/products/tshirt.jpg',
            },
        ],
        totalAmount: 2717200,
    },
    {
        id: 3,
        orderNumber: 'INV/2024/12/003',
        date: '15 Des 2024',
        status: 'completed',
        store: { name: 'Xiaomi Official', slug: 'xiaomi-store' },
        items: [
            {
                id: 4,
                name: 'Xiaomi Redmi Note 13 Pro',
                variant: '256GB, Black',
                price: 3499000,
                quantity: 1,
                image: '/products/redmi.jpg',
            },
        ],
        totalAmount: 3499000,
        hasReviewed: false,
    },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

const getStatusConfig = (status: string) => {
    switch (status) {
        case 'pending':
            return { label: 'Belum Bayar', color: 'text-yellow-600 bg-yellow-100', icon: Clock };
        case 'processing':
            return { label: 'Diproses', color: 'text-blue-600 bg-blue-100', icon: Package };
        case 'shipped':
            return { label: 'Dikirim', color: 'text-purple-600 bg-purple-100', icon: Truck };
        case 'completed':
            return { label: 'Selesai', color: 'text-green-600 bg-green-100', icon: CheckCircle };
        case 'cancelled':
            return { label: 'Dibatalkan', color: 'text-red-600 bg-red-100', icon: XCircle };
        default:
            return { label: status, color: 'text-gray-600 bg-gray-100', icon: Package };
    }
};

export default function OrdersPage() {
    const searchParams = useSearchParams();
    const initialStatus = searchParams.get('status') || 'all';
    const [activeTab, setActiveTab] = useState(initialStatus);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOrders = mockOrders.filter(order => {
        if (activeTab !== 'all' && order.status !== activeTab) return false;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                order.orderNumber.toLowerCase().includes(query) ||
                order.items.some(item => item.name.toLowerCase().includes(query))
            );
        }
        return true;
    });

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 mb-6">
                        <Link href="/profile" className="text-gray-500 hover:text-primary-600">
                            Profil
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold">Pesanan Saya</span>
                    </div>

                    {/* Search */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari pesanan berdasarkan nomor invoice atau nama produk..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6 overflow-x-auto">
                        <div className="flex min-w-max">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 min-w-[100px] px-4 py-4 text-center font-medium transition-colors border-b-2 ${activeTab === tab.id
                                            ? 'border-primary-500 text-primary-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                        {filteredOrders.length === 0 ? (
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm text-center">
                                <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                <h3 className="text-lg font-semibold mb-2">Tidak ada pesanan</h3>
                                <p className="text-gray-500 mb-4">
                                    Belum ada pesanan dalam kategori ini
                                </p>
                                <Link href="/" className="btn-primary px-6 py-2 rounded-lg inline-block">
                                    Mulai Belanja
                                </Link>
                            </div>
                        ) : (
                            filteredOrders.map(order => {
                                const statusConfig = getStatusConfig(order.status);
                                const StatusIcon = statusConfig.icon;

                                return (
                                    <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                                        {/* Order Header */}
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-2">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={`/store/${order.store.slug}`}
                                                    className="flex items-center gap-2 font-medium hover:text-primary-600"
                                                >
                                                    <Store className="w-4 h-4" />
                                                    {order.store.name}
                                                </Link>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-gray-500">{order.orderNumber}</span>
                                                <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                                                    <StatusIcon className="w-3.5 h-3.5" />
                                                    {statusConfig.label}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div className="p-4">
                                            {order.items.map((item, index) => (
                                                <div key={item.id} className={`flex gap-4 ${index > 0 ? 'mt-4 pt-4 border-t border-gray-100 dark:border-gray-700' : ''}`}>
                                                    <div className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
                                                        <span className="text-xs text-gray-400">Image</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium line-clamp-1">{item.name}</h4>
                                                        {item.variant && (
                                                            <p className="text-sm text-gray-500">{item.variant}</p>
                                                        )}
                                                        <div className="flex items-center justify-between mt-2">
                                                            <span className="text-gray-500">x{item.quantity}</span>
                                                            <span className="font-semibold text-primary-600">
                                                                {formatPrice(item.price)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {order.items.length > 1 && (
                                                <p className="text-sm text-gray-500 mt-2">
                                                    +{order.items.length - 1} produk lainnya
                                                </p>
                                            )}
                                        </div>

                                        {/* Shipping Info */}
                                        {order.shippingInfo && (
                                            <div className="mx-4 mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Truck className="w-4 h-4 text-purple-600" />
                                                        <span className="text-purple-600 font-medium">
                                                            {order.shippingInfo.courier} - {order.shippingInfo.trackingNumber}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-purple-600">
                                                        Est. {order.shippingInfo.estimatedArrival}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Order Footer */}
                                        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-3">
                                            <div>
                                                <span className="text-sm text-gray-500">Total: </span>
                                                <span className="text-lg font-bold text-primary-600">
                                                    {formatPrice(order.totalAmount)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="flex items-center gap-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    <MessageCircle className="w-4 h-4" />
                                                    Chat Penjual
                                                </button>
                                                {order.status === 'pending' && (
                                                    <Link href={`/payment/${order.id}`} className="btn-primary px-4 py-2 rounded-lg">
                                                        Bayar Sekarang
                                                    </Link>
                                                )}
                                                {order.status === 'shipped' && (
                                                    <button className="btn-primary px-4 py-2 rounded-lg">
                                                        Pesanan Diterima
                                                    </button>
                                                )}
                                                {order.status === 'completed' && !order.hasReviewed && (
                                                    <Link href={`/review/${order.id}`} className="btn-primary px-4 py-2 rounded-lg flex items-center gap-1">
                                                        <Star className="w-4 h-4" />
                                                        Beri Ulasan
                                                    </Link>
                                                )}
                                                {order.status === 'completed' && (
                                                    <button className="flex items-center gap-1 px-4 py-2 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20">
                                                        <RotateCcw className="w-4 h-4" />
                                                        Beli Lagi
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
