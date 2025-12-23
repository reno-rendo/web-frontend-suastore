'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import {
    Trash2,
    Plus,
    Minus,
    Store,
    ChevronRight,
    Tag,
    ShoppingBag,
    ArrowRight
} from 'lucide-react';
import { useCart, useUpdateCartItem, useRemoveCartItem } from '@/lib/hooks';
import { useCartStore, useAuthStore } from '@/lib/store';
import { toast } from 'sonner';

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

// Mock data sebagai fallback
const mockCartData = [
    {
        store: { id: 1, name: 'Apple Store Official', slug: 'apple-store' },
        items: [
            {
                id: 1,
                productId: 1,
                quantity: 1,
                product: {
                    title: 'iPhone 15 Pro Max 256GB Natural Titanium',
                    slug: 'iphone-15-pro-max',
                    price: 22499100,
                    images: [{ url: '/products/iphone.jpg' }],
                },
                variant: { name: '256GB' },
            },
        ],
    },
    {
        store: { id: 2, name: 'Nike Official Store', slug: 'nike-store' },
        items: [
            {
                id: 2,
                productId: 2,
                quantity: 2,
                product: {
                    title: 'Nike Air Max 90 Essential',
                    slug: 'nike-air-max-90',
                    price: 1919200,
                    images: [{ url: '/products/nike.jpg' }],
                },
                variant: { name: 'Size 42' },
            },
        ],
    },
];

export default function CartPage() {
    const { isAuthenticated } = useAuthStore();
    const [voucherCode, setVoucherCode] = useState('');
    const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);

    // API hooks
    const { data: apiCartData, isLoading } = useCart();
    const updateMutation = useUpdateCartItem();
    const removeMutation = useRemoveCartItem();

    // Use API data or mock data
    const cartData = apiCartData || mockCartData;

    const handleQuantityChange = async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        if (isAuthenticated) {
            try {
                await updateMutation.mutateAsync({ id: itemId, quantity: newQuantity });
            } catch (error) {
                toast.error('Gagal update quantity');
            }
        } else {
            // Update local state for non-authenticated users
            toast.info('Login untuk menyimpan keranjang');
        }
    };

    const handleRemoveItem = async (itemId: number) => {
        if (isAuthenticated) {
            try {
                await removeMutation.mutateAsync(itemId);
                toast.success('Produk dihapus dari keranjang');
            } catch (error) {
                toast.error('Gagal menghapus produk');
            }
        }
    };

    const handleApplyVoucher = () => {
        if (voucherCode.trim()) {
            setAppliedVoucher(voucherCode);
            toast.success('Voucher berhasil diterapkan');
            setVoucherCode('');
        }
    };

    // Calculate totals
    const subtotal = cartData.reduce((acc: number, group: any) => {
        return acc + group.items.reduce((sum: number, item: any) => {
            return sum + (item.product?.price || 0) * item.quantity;
        }, 0);
    }, 0);

    const discount = appliedVoucher ? Math.min(subtotal * 0.1, 100000) : 0;
    const total = subtotal - discount;
    const totalItems = cartData.reduce((acc: number, group: any) => acc + group.items.length, 0);

    const isEmpty = cartData.length === 0 || totalItems === 0;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm mb-6">
                        <Link href="/" className="text-gray-500 hover:text-primary-600">
                            Beranda
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold">Keranjang</span>
                    </div>

                    {isLoading ? (
                        // Loading state
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-4">
                                {[1, 2].map(i => (
                                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
                                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : isEmpty ? (
                        // Empty cart
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm max-w-md mx-auto">
                            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-200 dark:text-gray-600" />
                            <h2 className="text-2xl font-bold mb-2">Keranjang Kosong</h2>
                            <p className="text-gray-500 mb-6">
                                Belum ada produk di keranjang. Yuk mulai belanja!
                            </p>
                            <Link href="/" className="btn-primary px-8 py-3 rounded-xl inline-flex items-center gap-2">
                                Mulai Belanja
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    ) : (
                        // Cart with items
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex items-center justify-between">
                                    <span className="font-semibold">
                                        Keranjang Belanja ({totalItems} produk)
                                    </span>
                                </div>

                                {cartData.map((group: any) => (
                                    <div key={group.store.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                                        {/* Store Header */}
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                                            <Store className="w-5 h-5 text-gray-400" />
                                            <Link
                                                href={`/store/${group.store.slug}`}
                                                className="font-semibold hover:text-primary-600"
                                            >
                                                {group.store.name}
                                            </Link>
                                        </div>

                                        {/* Items */}
                                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                            {group.items.map((item: any) => (
                                                <div key={item.id} className="p-4 flex gap-4">
                                                    {/* Image */}
                                                    <div className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0 relative overflow-hidden">
                                                        {item.product?.images?.[0]?.url ? (
                                                            <Image
                                                                src={item.product.images[0].url}
                                                                alt={item.product.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex items-center justify-center h-full">
                                                                <Store className="w-8 h-8 text-gray-300" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <Link
                                                            href={`/product/${item.product?.slug}`}
                                                            className="font-medium hover:text-primary-600 line-clamp-2"
                                                        >
                                                            {item.product?.title}
                                                        </Link>
                                                        {item.variant && (
                                                            <p className="text-sm text-gray-500 mt-1">
                                                                Varian: {item.variant.name}
                                                            </p>
                                                        )}
                                                        <div className="flex items-center justify-between mt-3">
                                                            <span className="font-bold text-primary-600">
                                                                {formatPrice(item.product?.price || 0)}
                                                            </span>

                                                            {/* Quantity Controls */}
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() => handleRemoveItem(item.id)}
                                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                                <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg">
                                                                    <button
                                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                                        className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                                        disabled={item.quantity <= 1}
                                                                    >
                                                                        <Minus className="w-4 h-4" />
                                                                    </button>
                                                                    <span className="px-4 font-medium">{item.quantity}</span>
                                                                    <button
                                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                                        className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                                    >
                                                                        <Plus className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 space-y-4">
                                    {/* Voucher */}
                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Tag className="w-5 h-5 text-primary-500" />
                                            <span className="font-semibold">Voucher Promo</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={voucherCode}
                                                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                                                placeholder="Masukkan kode voucher"
                                                className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent"
                                            />
                                            <button
                                                onClick={handleApplyVoucher}
                                                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                                            >
                                                Pakai
                                            </button>
                                        </div>
                                        {appliedVoucher && (
                                            <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                                                ✓ Voucher "{appliedVoucher}" berhasil diterapkan
                                            </div>
                                        )}
                                    </div>

                                    {/* Summary */}
                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                                        <h3 className="font-semibold mb-4">Ringkasan Belanja</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Total Harga ({totalItems} produk)</span>
                                                <span>{formatPrice(subtotal)}</span>
                                            </div>
                                            {discount > 0 && (
                                                <div className="flex justify-between text-green-600">
                                                    <span>Diskon Voucher</span>
                                                    <span>-{formatPrice(discount)}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="border-t border-gray-100 dark:border-gray-700 mt-4 pt-4">
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold">Total</span>
                                                <span className="text-xl font-bold text-primary-600">
                                                    {formatPrice(total)}
                                                </span>
                                            </div>
                                        </div>
                                        <Link
                                            href="/checkout"
                                            className="mt-4 w-full btn-primary py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                                        >
                                            Checkout ({totalItems})
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
