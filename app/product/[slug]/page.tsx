'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Heart,
    Share2,
    ShoppingCart,
    Star,
    Truck,
    Shield,
    Store,
    Minus,
    Plus,
    ChevronLeft,
    ChevronRight,
    Check,
    MessageCircle
} from 'lucide-react';

// Mock product data - will be replaced with API call
const mockProduct = {
    id: 1,
    title: 'iPhone 15 Pro Max 256GB Natural Titanium',
    slug: 'iphone-15-pro-max-256gb',
    price: 24999000,
    discount: 10,
    finalPrice: 22499100,
    rating: 4.8,
    reviewCount: 1250,
    soldCount: 3500,
    stock: 25,
    description: `
    <h3>iPhone 15 Pro Max</h3>
    <p>iPhone 15 Pro Max dengan chip A17 Pro yang powerful, Dynamic Island yang inovatif, dan kamera 48MP yang menghasilkan foto menakjubkan.</p>
    <ul>
      <li>Chip A17 Pro untuk performa gaming dan AI</li>
      <li>Layar Super Retina XDR 6.7 inci dengan ProMotion</li>
      <li>Kamera utama 48MP dengan sensor lebih besar</li>
      <li>Titanium design yang premium dan ringan</li>
      <li>USB-C dengan kecepatan USB 3</li>
      <li>Action Button untuk akses cepat</li>
    </ul>
  `,
    images: [
        '/products/iphone-1.jpg',
        '/products/iphone-2.jpg',
        '/products/iphone-3.jpg',
        '/products/iphone-4.jpg',
    ],
    variants: [
        { id: 1, name: 'Storage', value: '256GB', price: 22499100, stock: 10 },
        { id: 2, name: 'Storage', value: '512GB', price: 26999100, stock: 8 },
        { id: 3, name: 'Storage', value: '1TB', price: 31499100, stock: 7 },
    ],
    category: { name: 'Handphone', slug: 'handphone' },
    brand: { name: 'Apple', slug: 'apple' },
    store: {
        name: 'Apple Store Official',
        slug: 'apple-store',
        city: 'Jakarta',
        isVerified: true,
        logo: '/stores/apple.png',
        productCount: 156,
        rating: 4.9,
    },
    hasWarranty: true,
    warrantyDesc: 'Garansi Resmi Apple Indonesia 1 Tahun',
    isFreeShipping: true,
};

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

export default function ProductDetailPage() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(mockProduct.variants[0]);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= selectedVariant.stock) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        // TODO: Implement add to cart with API
        console.log('Add to cart:', {
            productId: mockProduct.id,
            variantId: selectedVariant.id,
            quantity
        });
    };

    const handleBuyNow = () => {
        // TODO: Implement buy now flow
        console.log('Buy now');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Breadcrumb */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-primary-600">Home</Link>
                        <span>/</span>
                        <Link href={`/category/${mockProduct.category.slug}`} className="hover:text-primary-600">
                            {mockProduct.category.name}
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900 dark:text-white truncate max-w-xs">
                            {mockProduct.title}
                        </span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Product Images */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24">
                            {/* Main Image */}
                            <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden mb-4 shadow-lg">
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                    <span className="text-gray-400 text-lg">Product Image {selectedImage + 1}</span>
                                </div>

                                {/* Navigation Arrows */}
                                <button
                                    onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                                    disabled={selectedImage === 0}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setSelectedImage(Math.min(mockProduct.images.length - 1, selectedImage + 1))}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                                    disabled={selectedImage === mockProduct.images.length - 1}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>

                                {/* Discount Badge */}
                                {mockProduct.discount > 0 && (
                                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        -{mockProduct.discount}%
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Images */}
                            <div className="flex gap-3">
                                {mockProduct.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                                ? 'border-primary-500 ring-2 ring-primary-500/30'
                                                : 'border-transparent hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-400">
                                            {index + 1}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:col-span-4">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                            {/* Title */}
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                {mockProduct.title}
                            </h1>

                            {/* Rating & Stats */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{mockProduct.rating}</span>
                                    <span className="text-gray-500">({mockProduct.reviewCount} ulasan)</span>
                                </div>
                                <span className="text-gray-400">|</span>
                                <span className="text-gray-500">Terjual {mockProduct.soldCount.toLocaleString()}</span>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="text-3xl font-bold text-primary-600">
                                    {formatPrice(selectedVariant.price)}
                                </div>
                                {mockProduct.discount > 0 && (
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-gray-400 line-through text-lg">
                                            {formatPrice(mockProduct.price)}
                                        </span>
                                        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-sm font-medium">
                                            Hemat {formatPrice(mockProduct.price - selectedVariant.price)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Variants */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">Pilih Varian:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {mockProduct.variants.map((variant) => (
                                        <button
                                            key={variant.id}
                                            onClick={() => setSelectedVariant(variant)}
                                            className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedVariant.id === variant.id
                                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                                                    : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                                                }`}
                                        >
                                            <div className="font-medium">{variant.value}</div>
                                            <div className="text-sm text-gray-500">{formatPrice(variant.price)}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">Jumlah:</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            disabled={quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-12 text-center font-medium">{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            disabled={quantity >= selectedVariant.stock}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <span className="text-gray-500">
                                        Stok: <span className="font-medium text-gray-900 dark:text-white">{selectedVariant.stock}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Subtotal */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                                    <span className="text-2xl font-bold text-primary-600">
                                        {formatPrice(selectedVariant.price * quantity)}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mb-6">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 btn-secondary flex items-center justify-center gap-2 py-3 rounded-xl"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Keranjang
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 rounded-xl"
                                >
                                    Beli Sekarang
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex items-center justify-center gap-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`flex items-center gap-2 ${isWishlisted ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                                >
                                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                    <span>Wishlist</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-500 hover:text-primary-500">
                                    <Share2 className="w-5 h-5" />
                                    <span>Bagikan</span>
                                </button>
                                <button className="flex items-center gap-2 text-gray-500 hover:text-primary-500">
                                    <MessageCircle className="w-5 h-5" />
                                    <span>Chat</span>
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {mockProduct.isFreeShipping && (
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 flex items-center gap-3">
                                    <Truck className="w-8 h-8 text-green-600" />
                                    <div>
                                        <div className="font-semibold text-green-600">Gratis Ongkir</div>
                                        <div className="text-xs text-green-600/70">Min. belanja Rp100.000</div>
                                    </div>
                                </div>
                            )}
                            {mockProduct.hasWarranty && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex items-center gap-3">
                                    <Shield className="w-8 h-8 text-blue-600" />
                                    <div>
                                        <div className="font-semibold text-blue-600">Garansi Resmi</div>
                                        <div className="text-xs text-blue-600/70">1 Tahun</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Store Info */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-24 space-y-4">
                            {/* Store Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                        <Store className="w-7 h-7 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900 dark:text-white">
                                                {mockProduct.store.name}
                                            </h3>
                                            {mockProduct.store.isVerified && (
                                                <Check className="w-4 h-4 text-green-500" />
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500">{mockProduct.store.city}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-center mb-4">
                                    <div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                                            {mockProduct.store.rating}
                                        </div>
                                        <div className="text-xs text-gray-500">Rating</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                                            {mockProduct.store.productCount}
                                        </div>
                                        <div className="text-xs text-gray-500">Produk</div>
                                    </div>
                                </div>

                                <Link
                                    href={`/store/${mockProduct.store.slug}`}
                                    className="block w-full text-center py-2 rounded-lg border border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors font-medium"
                                >
                                    Kunjungi Toko
                                </Link>
                            </div>

                            {/* Security Info */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg">
                                <h3 className="font-bold mb-3">Keamanan Transaksi</h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Pembayaran 100% Aman
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Garansi Produk Original
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        Pengembalian Mudah
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Deskripsi Produk</h2>
                    <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: mockProduct.description }}
                    />
                </div>
            </div>
        </div>
    );
}
