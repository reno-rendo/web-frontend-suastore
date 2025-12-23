'use client';

import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import {
    Store,
    MapPin,
    Star,
    MessageCircle,
    Share2,
    CheckCircle2,
    Clock,
    Package,
    Users,
    ChevronRight,
    Grid3X3,
    LayoutList
} from 'lucide-react';
import { ProductCard, ProductCardSkeleton } from '@/components/product';
import { useStore, useStoreProducts } from '@/lib/hooks';

// Mock store data
const mockStore = {
    id: 1,
    name: 'Apple Store Official',
    slug: 'apple-store-official',
    description: 'Toko resmi Apple Indonesia. Menjual berbagai produk Apple original dengan garansi resmi.',
    avatar: null,
    banner: null,
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    joinedDate: 'Januari 2020',
    rating: 4.9,
    totalReviews: 15420,
    totalProducts: 156,
    totalFollowers: 25600,
    responseRate: 98,
    responseTime: '< 1 jam',
    isOfficial: true,
    isOnHoliday: false,
};

// Mock products
const mockProducts = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Apple Product ${i + 1}`,
    slug: `apple-product-${i + 1}`,
    price: 15000000 + i * 1000000,
    discount: i % 3 === 0 ? 10 : 0,
    rating: 4.5 + Math.random() * 0.5,
    soldCount: 100 + i * 50,
    images: [{ url: '/products/apple.jpg' }],
    store: mockStore,
}));

interface PageProps {
    params: { slug: string };
}

export default function StorePage({ params }: PageProps) {
    const { slug } = params;

    // Try API, fallback to mock
    const { data: apiStore, isLoading: storeLoading } = useStore(slug);
    const { data: apiProducts, isLoading: productsLoading } = useStoreProducts(slug);

    const store = apiStore || mockStore;
    const products = apiProducts || mockProducts;
    const isLoading = storeLoading || productsLoading;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Store Banner */}
                <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary-600 to-accent-500">
                    {store.banner && (
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${store.banner})` }}
                        />
                    )}
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Store Info */}
                <div className="container mx-auto px-4 -mt-16 relative z-10">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg -mt-12 md:-mt-16 border-4 border-white dark:border-gray-800">
                                    {store.name.charAt(0)}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h1 className="text-2xl font-bold">{store.name}</h1>
                                            {store.isOfficial && (
                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded-full flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Official
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1 text-gray-500">
                                            <MapPin className="w-4 h-4" />
                                            <span>{store.city}, {store.province}</span>
                                        </div>
                                        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-xl">
                                            {store.description}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button className="btn-primary px-6 py-2 rounded-lg flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            Ikuti
                                        </button>
                                        <button className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <MessageCircle className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <div className="text-center sm:text-left">
                                        <div className="flex items-center justify-center sm:justify-start gap-1 text-yellow-500">
                                            <Star className="w-5 h-5 fill-yellow-400" />
                                            <span className="text-xl font-bold">{store.rating}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">{store.totalReviews.toLocaleString()} ulasan</p>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <div className="flex items-center justify-center sm:justify-start gap-1">
                                            <Package className="w-5 h-5 text-primary-500" />
                                            <span className="text-xl font-bold">{store.totalProducts}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">Produk</p>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <div className="flex items-center justify-center sm:justify-start gap-1">
                                            <Users className="w-5 h-5 text-accent-500" />
                                            <span className="text-xl font-bold">{(store.totalFollowers / 1000).toFixed(1)}K</span>
                                        </div>
                                        <p className="text-sm text-gray-500">Pengikut</p>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <div className="flex items-center justify-center sm:justify-start gap-1">
                                            <Clock className="w-5 h-5 text-green-500" />
                                            <span className="text-xl font-bold">{store.responseRate}%</span>
                                        </div>
                                        <p className="text-sm text-gray-500">Response {store.responseTime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Semua Produk</h2>
                            <div className="flex items-center gap-2">
                                <select className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent">
                                    <option>Terbaru</option>
                                    <option>Harga Terendah</option>
                                    <option>Harga Tertinggi</option>
                                    <option>Terlaris</option>
                                </select>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <ProductCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {products.map((product: any) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        title={product.title}
                                        slug={product.slug}
                                        price={product.price}
                                        discount={product.discount}
                                        rating={product.rating}
                                        soldCount={product.soldCount}
                                        image={product.images?.[0]?.url || '/placeholder.jpg'}
                                        storeName={store.name}
                                        storeCity={store.city}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="mt-8 flex justify-center">
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
                                    Sebelumnya
                                </button>
                                {[1, 2, 3].map((page) => (
                                    <button
                                        key={page}
                                        className={`w-10 h-10 rounded-lg ${page === 1
                                                ? 'bg-primary-500 text-white'
                                                : 'border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    Selanjutnya
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
