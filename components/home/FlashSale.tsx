'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/product';
import { useFlashSaleProducts } from '@/lib/hooks';

// Mock data sebagai fallback
const mockProducts = [
    {
        id: 1,
        title: 'iPhone 15 Pro Max 256GB',
        slug: 'iphone-15-pro-max-256gb',
        price: 24999000,
        discount: 15,
        rating: 4.9,
        soldCount: 2500,
        images: [{ url: '/products/iphone.jpg' }],
        store: { name: 'Apple Store Official', city: 'Jakarta' },
    },
    {
        id: 2,
        title: 'Samsung Galaxy S24 Ultra',
        slug: 'samsung-galaxy-s24-ultra',
        price: 21999000,
        discount: 20,
        rating: 4.8,
        soldCount: 1800,
        images: [{ url: '/products/samsung.jpg' }],
        store: { name: 'Samsung Official', city: 'Jakarta' },
    },
    {
        id: 3,
        title: 'MacBook Pro M3 14 inch',
        slug: 'macbook-pro-m3-14',
        price: 32999000,
        discount: 10,
        rating: 4.9,
        soldCount: 890,
        images: [{ url: '/products/macbook.jpg' }],
        store: { name: 'Apple Store Official', city: 'Jakarta' },
    },
    {
        id: 4,
        title: 'Sony WH-1000XM5',
        slug: 'sony-wh-1000xm5',
        price: 4999000,
        discount: 25,
        rating: 4.7,
        soldCount: 3200,
        images: [{ url: '/products/sony.jpg' }],
        store: { name: 'Sony Official', city: 'Surabaya' },
    },
];

export function FlashSale() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 5,
        minutes: 45,
        seconds: 30,
    });

    // Try to fetch from API, fallback to mock data
    const { data: apiProducts, isLoading, error } = useFlashSaleProducts(8);
    const products = apiProducts || mockProducts;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (num: number) => String(num).padStart(2, '0');

    return (
        <section className="py-8 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                            <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                            <span className="text-white font-bold text-lg sm:text-xl">Flash Sale</span>
                        </div>

                        {/* Countdown */}
                        <div className="flex items-center gap-1 text-white">
                            <span className="text-sm opacity-80">Berakhir dalam</span>
                            <div className="flex items-center gap-1">
                                <span className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 font-mono font-bold">
                                    {formatTime(timeLeft.hours)}
                                </span>
                                <span className="font-bold">:</span>
                                <span className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 font-mono font-bold">
                                    {formatTime(timeLeft.minutes)}
                                </span>
                                <span className="font-bold">:</span>
                                <span className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 font-mono font-bold">
                                    {formatTime(timeLeft.seconds)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/flash-sale"
                        className="flex items-center gap-1 text-white hover:underline font-medium"
                    >
                        Lihat Semua
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {isLoading ? (
                        // Loading skeleton
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white/10 rounded-xl animate-pulse h-72" />
                        ))
                    ) : (
                        products.slice(0, 4).map((product: any) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                slug={product.slug}
                                price={product.price}
                                discount={product.discount}
                                rating={product.rating || 0}
                                soldCount={product.soldCount || 0}
                                image={product.images?.[0]?.url || '/placeholder.jpg'}
                                storeName={product.store?.name || 'Store'}
                                storeCity={product.store?.city || 'Indonesia'}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
