'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Package,
    Truck,
    CheckCircle,
    Clock,
    MapPin,
    Phone,
    Copy,
    MessageSquare,
    ChevronRight,
    Box
} from 'lucide-react';

// Mock order data
const order = {
    id: 'INV/20241223/001',
    status: 'shipping',
    statusLabel: 'Sedang Dikirim',
    createdAt: '23 Des 2024, 10:30',
    estimatedArrival: '25-26 Des 2024',
    shipping: {
        courier: 'JNE',
        service: 'REG',
        trackingNumber: 'JNE123456789012',
    },
    address: {
        name: 'John Doe',
        phone: '081234567890',
        address: 'Jl. Sudirman No. 123, RT 05/RW 03, Kebayoran Baru',
        city: 'Jakarta Selatan, DKI Jakarta 12190',
    },
    items: [
        { id: 1, title: 'iPhone 15 Pro Max 256GB', variant: 'Natural Titanium', price: 22499100, qty: 1, image: null },
    ],
    payment: {
        method: 'Virtual Account BCA',
        subtotal: 22499100,
        shipping: 0,
        discount: 0,
        total: 22499100,
    },
    store: {
        name: 'Apple Store Official',
        slug: 'apple-store',
    },
};

const trackingHistory = [
    { date: '23 Des 2024', time: '18:45', status: 'Paket sedang dalam perjalanan ke kota tujuan', location: 'Jakarta Sorting Center' },
    { date: '23 Des 2024', time: '15:30', status: 'Paket telah diterima oleh kurir', location: 'Jakarta Hub' },
    { date: '23 Des 2024', time: '14:00', status: 'Paket sedang diproses di gudang', location: 'JNE Jakarta' },
    { date: '23 Des 2024', time: '12:30', status: 'Paket telah diserahkan ke kurir', location: 'Apple Store Official' },
    { date: '23 Des 2024', time: '11:00', status: 'Pesanan sedang dikemas', location: 'Apple Store Official' },
    { date: '23 Des 2024', time: '10:35', status: 'Pembayaran dikonfirmasi', location: '' },
    { date: '23 Des 2024', time: '10:30', status: 'Pesanan dibuat', location: '' },
];

const steps = [
    { id: 'pending', label: 'Pesanan Dibuat', icon: Package },
    { id: 'processing', label: 'Dikemas', icon: Box },
    { id: 'shipping', label: 'Dikirim', icon: Truck },
    { id: 'delivered', label: 'Selesai', icon: CheckCircle },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

const getStepIndex = (status: string) => {
    const index = steps.findIndex(s => s.id === status);
    return index === -1 ? 0 : index;
};

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
    const [showAllHistory, setShowAllHistory] = useState(false);
    const currentStep = getStepIndex(order.status);

    const copyTrackingNumber = () => {
        navigator.clipboard.writeText(order.shipping.trackingNumber);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
                    <Link href="/profile/orders" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-bold">Lacak Pesanan</h1>
                        <p className="text-xs text-gray-500">{order.id}</p>
                    </div>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                {/* Status Card */}
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-white/70 text-sm">Status Pesanan</p>
                            <h2 className="text-2xl font-bold">{order.statusLabel}</h2>
                        </div>
                        <Truck className="w-12 h-12 text-white/30" />
                    </div>

                    <p className="text-white/80 text-sm">
                        Estimasi tiba: <span className="font-semibold text-white">{order.estimatedArrival}</span>
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        {steps.map((step, index) => {
                            const StepIcon = step.icon;
                            const isCompleted = index <= currentStep;
                            const isCurrent = index === currentStep;

                            return (
                                <div key={step.id} className="flex flex-col items-center relative flex-1">
                                    {/* Connector line */}
                                    {index > 0 && (
                                        <div className={`absolute top-5 right-1/2 w-full h-0.5 -translate-y-1/2 ${index <= currentStep ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'
                                            }`} />
                                    )}

                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 ${isCompleted
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                                        } ${isCurrent ? 'ring-4 ring-primary-100 dark:ring-primary-900/50' : ''}`}>
                                        <StepIcon className="w-5 h-5" />
                                    </div>
                                    <span className={`text-xs mt-2 text-center ${isCompleted ? 'text-primary-600 font-medium' : 'text-gray-400'
                                        }`}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tracking Number */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div>
                            <p className="text-sm text-gray-500">No. Resi ({order.shipping.courier} {order.shipping.service})</p>
                            <p className="font-mono font-bold">{order.shipping.trackingNumber}</p>
                        </div>
                        <button
                            onClick={copyTrackingNumber}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
                        >
                            <Copy className="w-5 h-5 text-primary-600" />
                        </button>
                    </div>
                </div>

                {/* Tracking History */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold mb-4">Riwayat Pengiriman</h3>

                    <div className="space-y-4">
                        {(showAllHistory ? trackingHistory : trackingHistory.slice(0, 3)).map((item, index) => (
                            <div key={index} className="flex gap-4">
                                {/* Timeline dot */}
                                <div className="flex flex-col items-center">
                                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                                        }`} />
                                    {index < (showAllHistory ? trackingHistory.length : 3) - 1 && (
                                        <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 my-1" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-4">
                                    <p className={`text-sm ${index === 0 ? 'font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
                                        {item.status}
                                    </p>
                                    {item.location && (
                                        <p className="text-xs text-gray-500">{item.location}</p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-1">{item.date}, {item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {trackingHistory.length > 3 && (
                        <button
                            onClick={() => setShowAllHistory(!showAllHistory)}
                            className="w-full text-center text-primary-600 text-sm font-medium mt-2"
                        >
                            {showAllHistory ? 'Sembunyikan' : `Lihat ${trackingHistory.length - 3} riwayat lainnya`}
                        </button>
                    )}
                </div>

                {/* Shipping Address */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary-600" />
                        Alamat Pengiriman
                    </h3>
                    <div>
                        <p className="font-semibold">{order.address.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Phone className="w-3 h-3" />
                            {order.address.phone}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{order.address.address}</p>
                        <p className="text-sm text-gray-500">{order.address.city}</p>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <Link
                        href={`/store/${order.store.slug}`}
                        className="flex items-center justify-between mb-4"
                    >
                        <h3 className="font-bold">{order.store.name}</h3>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>

                    {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4 py-4 border-t border-gray-100 dark:border-gray-700">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <Package className="w-8 h-8 text-gray-300" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-500">{item.variant}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm text-gray-500">x{item.qty}</span>
                                    <span className="font-semibold text-primary-600">{formatPrice(item.price)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payment Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold mb-4">Rincian Pembayaran</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Subtotal</span>
                            <span>{formatPrice(order.payment.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Ongkos Kirim</span>
                            <span className="text-green-600">Gratis</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold text-lg text-primary-600">{formatPrice(order.payment.total)}</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                        Dibayar dengan {order.payment.method}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Link
                        href={`/chat?store=${order.store.slug}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <MessageSquare className="w-5 h-5" />
                        Chat Seller
                    </Link>
                    <button className="flex-1 btn-primary px-4 py-3 rounded-xl">
                        Konfirmasi Diterima
                    </button>
                </div>
            </div>
        </div>
    );
}
