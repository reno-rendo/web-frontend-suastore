'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    MapPin,
    CreditCard,
    Wallet,
    Building,
    QrCode,
    ChevronRight,
    Package,
    Truck,
    Shield,
    Tag,
    Plus,
    Check
} from 'lucide-react';

// Mock data
const addresses = [
    { id: 1, label: 'Rumah', name: 'John Doe', phone: '081234567890', address: 'Jl. Sudirman No. 123', city: 'Jakarta Selatan', isDefault: true },
    { id: 2, label: 'Kantor', name: 'John Doe', phone: '081234567891', address: 'Gedung Wisma BNI Lt. 5', city: 'Jakarta Pusat', isDefault: false },
];

const cartItems = [
    {
        id: 1, store: 'Apple Store Official', storeSlug: 'apple-store', items: [
            { id: 1, title: 'iPhone 15 Pro Max 256GB', variant: 'Natural Titanium', price: 22499100, qty: 1, image: null, weight: 221 },
        ]
    },
    {
        id: 2, store: 'Samsung Official', storeSlug: 'samsung', items: [
            { id: 2, title: 'Galaxy Watch 6 Classic', variant: '47mm Black', price: 5999000, qty: 1, image: null, weight: 59 },
        ]
    },
];

const paymentMethods = [
    { id: 'va_bca', name: 'BCA Virtual Account', type: 'va', icon: Building },
    { id: 'va_bni', name: 'BNI Virtual Account', type: 'va', icon: Building },
    { id: 'va_mandiri', name: 'Mandiri Virtual Account', type: 'va', icon: Building },
    { id: 'ewallet_gopay', name: 'GoPay', type: 'ewallet', icon: Wallet },
    { id: 'ewallet_ovo', name: 'OVO', type: 'ewallet', icon: Wallet },
    { id: 'ewallet_dana', name: 'DANA', type: 'ewallet', icon: Wallet },
    { id: 'qris', name: 'QRIS', type: 'qris', icon: QrCode },
];

const shippingOptions = [
    { id: 'jne_reg', courier: 'JNE', service: 'REG', price: 15000, eta: '3-4 hari' },
    { id: 'jne_yes', courier: 'JNE', service: 'YES', price: 25000, eta: '1 hari' },
    { id: 'jnt_ez', courier: 'J&T', service: 'EZ', price: 12000, eta: '3-5 hari' },
    { id: 'sicepat_reg', courier: 'SiCepat', service: 'REG', price: 14000, eta: '2-3 hari' },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

export default function CheckoutPage() {
    const [selectedAddress, setSelectedAddress] = useState(addresses.find(a => a.isDefault)?.id || 1);
    const [selectedShipping, setSelectedShipping] = useState<Record<number, string>>({});
    const [selectedPayment, setSelectedPayment] = useState('');
    const [voucherCode, setVoucherCode] = useState('');
    const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discount: number } | null>(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const address = addresses.find(a => a.id === selectedAddress);

    const subtotal = cartItems.reduce((acc, store) =>
        acc + store.items.reduce((sum, item) => sum + (item.price * item.qty), 0), 0);

    const shippingTotal = Object.values(selectedShipping).reduce((acc, shippingId) => {
        const shipping = shippingOptions.find(s => s.id === shippingId);
        return acc + (shipping?.price || 0);
    }, 0);

    const discount = appliedVoucher?.discount || 0;
    const total = subtotal + shippingTotal - discount;

    const applyVoucher = () => {
        if (voucherCode.toUpperCase() === 'DISKON10') {
            setAppliedVoucher({ code: 'DISKON10', discount: Math.floor(subtotal * 0.1) });
        }
    };

    const selectedPaymentMethod = paymentMethods.find(p => p.id === selectedPayment);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
                    <Link href="/cart" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-xl font-bold">Checkout</h1>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Address */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-bold flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary-600" />
                                    Alamat Pengiriman
                                </h2>
                                <button
                                    onClick={() => setShowAddressModal(true)}
                                    className="text-primary-600 text-sm font-medium"
                                >
                                    Ubah
                                </button>
                            </div>

                            {address && (
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold">{address.name}</span>
                                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-xs rounded">{address.label}</span>
                                    </div>
                                    <p className="text-sm text-gray-500">{address.phone}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{address.address}, {address.city}</p>
                                </div>
                            )}
                        </div>

                        {/* Cart Items by Store */}
                        {cartItems.map((store) => (
                            <div key={store.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                                    <Link href={`/store/${store.storeSlug}`} className="font-bold hover:text-primary-600">
                                        {store.store}
                                    </Link>
                                </div>

                                {/* Items */}
                                {store.items.map((item) => (
                                    <div key={item.id} className="p-4 flex gap-4 border-b border-gray-100 dark:border-gray-700">
                                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Package className="w-8 h-8 text-gray-300" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium">{item.title}</p>
                                            <p className="text-sm text-gray-500">{item.variant}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-sm text-gray-500">x{item.qty}</span>
                                                <span className="font-semibold">{formatPrice(item.price)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Shipping Selection */}
                                <div className="p-4">
                                    <p className="text-sm font-medium mb-3 flex items-center gap-2">
                                        <Truck className="w-4 h-4" />
                                        Pilih Pengiriman
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {shippingOptions.slice(0, 4).map((shipping) => (
                                            <button
                                                key={shipping.id}
                                                onClick={() => setSelectedShipping({ ...selectedShipping, [store.id]: shipping.id })}
                                                className={`p-3 rounded-xl border text-left text-sm ${selectedShipping[store.id] === shipping.id
                                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                                        : 'border-gray-200 dark:border-gray-600'
                                                    }`}
                                            >
                                                <p className="font-medium">{shipping.courier} {shipping.service}</p>
                                                <p className="text-gray-500">{shipping.eta}</p>
                                                <p className="text-primary-600 font-semibold mt-1">{formatPrice(shipping.price)}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Voucher */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
                            <h2 className="font-bold flex items-center gap-2 mb-4">
                                <Tag className="w-5 h-5 text-primary-600" />
                                Voucher
                            </h2>

                            {appliedVoucher ? (
                                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                    <div>
                                        <p className="font-medium text-green-600">{appliedVoucher.code}</p>
                                        <p className="text-sm text-green-600">Hemat {formatPrice(appliedVoucher.discount)}</p>
                                    </div>
                                    <button
                                        onClick={() => setAppliedVoucher(null)}
                                        className="text-red-500 text-sm"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={voucherCode}
                                        onChange={(e) => setVoucherCode(e.target.value)}
                                        placeholder="Masukkan kode voucher"
                                        className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl"
                                    />
                                    <button
                                        onClick={applyVoucher}
                                        className="px-4 py-2 border border-primary-500 text-primary-600 rounded-xl hover:bg-primary-50"
                                    >
                                        Terapkan
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Order Summary */}
                    <div className="space-y-6">
                        {/* Payment Method */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
                            <h2 className="font-bold flex items-center gap-2 mb-4">
                                <CreditCard className="w-5 h-5 text-primary-600" />
                                Metode Pembayaran
                            </h2>

                            <button
                                onClick={() => setShowPaymentModal(true)}
                                className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                {selectedPaymentMethod ? (
                                    <div className="flex items-center gap-3">
                                        <selectedPaymentMethod.icon className="w-5 h-5 text-primary-600" />
                                        <span className="font-medium">{selectedPaymentMethod.name}</span>
                                    </div>
                                ) : (
                                    <span className="text-gray-500">Pilih metode pembayaran</span>
                                )}
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        {/* Summary */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm sticky top-24">
                            <h2 className="font-bold mb-4">Ringkasan Pesanan</h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Subtotal Produk</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Total Ongkos Kirim</span>
                                    <span>{shippingTotal > 0 ? formatPrice(shippingTotal) : '-'}</span>
                                </div>
                                {appliedVoucher && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Diskon Voucher</span>
                                        <span>-{formatPrice(discount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                                    <span className="font-semibold">Total Pembayaran</span>
                                    <span className="text-xl font-bold text-primary-600">{formatPrice(total)}</span>
                                </div>
                            </div>

                            <button
                                className="w-full btn-primary py-3 rounded-xl mt-6 font-semibold"
                                disabled={!selectedPayment || Object.keys(selectedShipping).length !== cartItems.length}
                            >
                                Bayar Sekarang
                            </button>

                            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                                <Shield className="w-4 h-4" />
                                Pembayaran 100% aman
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Address Selection Modal */}
            {showAddressModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <h3 className="font-bold">Pilih Alamat</h3>
                            <button onClick={() => setShowAddressModal(false)}>✕</button>
                        </div>
                        <div className="p-4 space-y-3 overflow-y-auto max-h-96">
                            {addresses.map((addr) => (
                                <button
                                    key={addr.id}
                                    onClick={() => { setSelectedAddress(addr.id); setShowAddressModal(false); }}
                                    className={`w-full p-4 rounded-xl border text-left ${selectedAddress === addr.id
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                            : 'border-gray-200 dark:border-gray-600'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold">{addr.name}</span>
                                        {selectedAddress === addr.id && <Check className="w-5 h-5 text-primary-600" />}
                                    </div>
                                    <p className="text-sm text-gray-500">{addr.phone}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{addr.address}</p>
                                </button>
                            ))}
                            <Link
                                href="/profile/address"
                                className="flex items-center justify-center gap-2 p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-primary-600"
                            >
                                <Plus className="w-5 h-5" />
                                Tambah Alamat Baru
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Method Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <h3 className="font-bold">Pilih Metode Pembayaran</h3>
                            <button onClick={() => setShowPaymentModal(false)}>✕</button>
                        </div>
                        <div className="p-4 space-y-2 overflow-y-auto max-h-96">
                            <p className="text-xs text-gray-500 font-medium mb-2">Virtual Account</p>
                            {paymentMethods.filter(p => p.type === 'va').map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => { setSelectedPayment(method.id); setShowPaymentModal(false); }}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border ${selectedPayment === method.id
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                            : 'border-gray-200 dark:border-gray-600'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <method.icon className="w-5 h-5 text-gray-500" />
                                        <span className="font-medium">{method.name}</span>
                                    </div>
                                    {selectedPayment === method.id && <Check className="w-5 h-5 text-primary-600" />}
                                </button>
                            ))}

                            <p className="text-xs text-gray-500 font-medium mt-4 mb-2">E-Wallet</p>
                            {paymentMethods.filter(p => p.type === 'ewallet').map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => { setSelectedPayment(method.id); setShowPaymentModal(false); }}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border ${selectedPayment === method.id
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                            : 'border-gray-200 dark:border-gray-600'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <method.icon className="w-5 h-5 text-gray-500" />
                                        <span className="font-medium">{method.name}</span>
                                    </div>
                                    {selectedPayment === method.id && <Check className="w-5 h-5 text-primary-600" />}
                                </button>
                            ))}

                            <p className="text-xs text-gray-500 font-medium mt-4 mb-2">QRIS</p>
                            {paymentMethods.filter(p => p.type === 'qris').map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => { setSelectedPayment(method.id); setShowPaymentModal(false); }}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border ${selectedPayment === method.id
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                            : 'border-gray-200 dark:border-gray-600'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <method.icon className="w-5 h-5 text-gray-500" />
                                        <span className="font-medium">{method.name}</span>
                                    </div>
                                    {selectedPayment === method.id && <Check className="w-5 h-5 text-primary-600" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
