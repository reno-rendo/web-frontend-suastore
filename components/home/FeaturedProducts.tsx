'use client';

import Link from 'next/link';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { ProductCard, ProductCardSkeleton } from '@/components/product';
import { useFeaturedProducts } from '@/lib/hooks';

// Mock data sebagai fallback
const mockProducts = [
    {
        id: 1,
        title: 'Nike Air Max 90 Essential',
        slug: 'nike-air-max-90-essential',
        price: 2399000,
        discount: 20,
        rating: 4.8,
        soldCount: 5600,
        images: [{ url: '/products/nike.jpg' }],
        store: { name: 'Nike Official', city: 'Jakarta' },
    },
    {
        id: 2,
        title: 'Adidas Ultraboost 22',
        slug: 'adidas-ultraboost-22',
        price: 3199000,
        discount: 15,
        rating: 4.7,
        soldCount: 4200,
        images: [{ url: '/products/adidas.jpg' }],
        store: { name: 'Adidas Official', city: 'Jakarta' },
    },
    {
        id: 3,
        title: 'Uniqlo Airism T-Shirt',
        slug: 'uniqlo-airism-tshirt',
        price: 199000,
        discount: 0,
        rating: 4.9,
        soldCount: 12500,
        images: [{ url: '/products/uniqlo.jpg' }],
        store: { name: 'Uniqlo Official', city: 'Jakarta' },
    },
    {
        id: 4,
        title: 'H&M Basic Hoodie',
        slug: 'hm-basic-hoodie',
        price: 399000,
        discount: 30,
        rating: 4.5,
        soldCount: 8900,
        images: [{ url: '/products/hm.jpg' }],
        store: { name: 'H&M Official', city: 'Bandung' },
    },
    {
        id: 5,
        title: 'Xiaomi Mi Band 8',
        slug: 'xiaomi-mi-band-8',
        price: 599000,
        discount: 10,
        rating: 4.6,
        soldCount: 7800,
        images: [{ url: '/products/miband.jpg' }],
        store: { name: 'Xiaomi Official', city: 'Jakarta' },
    },
    {
        id: 6,
        title: 'JBL Flip 6',
        slug: 'jbl-flip-6',
        price: 1899000,
        discount: 12,
        rating: 4.8,
        soldCount: 3400,
        images: [{ url: '/products/jbl.jpg' }],
        store: { name: 'JBL Official', city: 'Surabaya' },
    },
];

export function FeaturedProducts() {
    // Try to fetch from API, fallback to mock data
    const { data: apiProducts, isLoading, error } = useFeaturedProducts(8);
    const products = apiProducts || mockProducts;

    return (
        <section className="py-10 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="w-7 h-7 text-primary-500" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Produk Populer
                        </h2>
                    </div>
                    <Link
                        href="/products?sort=popular"
                        className="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium"
                    >
                        Lihat Semua
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {isLoading ? (
                        // Loading skeleton
                        Array.from({ length: 6 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))
                    ) : (
                        products.slice(0, 6).map((product: any) => (
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
