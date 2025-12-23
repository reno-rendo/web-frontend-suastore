'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const banners = [
    {
        id: 1,
        title: 'Belanja Hemat Akhir Tahun',
        subtitle: 'Diskon hingga 70% untuk semua kategori',
        cta: 'Belanja Sekarang',
        href: '/promo/year-end-sale',
        bgColor: 'from-primary-600 to-accent-600',
        image: '/banners/banner-1.jpg',
    },
    {
        id: 2,
        title: 'Gratis Ongkir Se-Indonesia',
        subtitle: 'Tanpa minimum pembelian, hanya hari ini!',
        cta: 'Cek Promo',
        href: '/promo/free-shipping',
        bgColor: 'from-green-600 to-emerald-600',
        image: '/banners/banner-2.jpg',
    },
    {
        id: 3,
        title: 'Flash Sale Setiap Hari',
        subtitle: 'Produk terbatas dengan harga super murah',
        cta: 'Lihat Flash Sale',
        href: '/flash-sale',
        bgColor: 'from-red-600 to-orange-600',
        image: '/banners/banner-3.jpg',
    },
];

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const goToPrev = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    };

    return (
        <section className="relative overflow-hidden">
            {/* Slider */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide
                                ? 'opacity-100 translate-x-0'
                                : index < currentSlide
                                    ? 'opacity-0 -translate-x-full'
                                    : 'opacity-0 translate-x-full'
                            }`}
                    >
                        {/* Background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor}`} />

                        {/* Pattern overlay */}
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />

                        {/* Content */}
                        <div className="container-app h-full flex items-center relative z-10">
                            <div className="max-w-lg text-white">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 animate-slide-up">
                                    {banner.title}
                                </h1>
                                <p className="text-lg sm:text-xl opacity-90 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                                    {banner.subtitle}
                                </p>
                                <Link
                                    href={banner.href}
                                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg animate-slide-up"
                                    style={{ animationDelay: '0.2s' }}
                                >
                                    {banner.cta}
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation arrows */}
            <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full transition-all text-white z-20"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full transition-all text-white z-20"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentSlide
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
