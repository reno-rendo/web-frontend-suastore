'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import {
    ChevronRight,
    SlidersHorizontal,
    Grid3X3,
    LayoutList,
    ChevronDown
} from 'lucide-react';
import { ProductCard, ProductCardSkeleton } from '@/components/product';
import { useCategory } from '@/lib/hooks';
import { useProducts } from '@/lib/hooks';

// Mock category data
const mockCategory = {
    id: 1,
    name: 'Elektronik',
    slug: 'elektronik',
    description: 'Temukan berbagai produk elektronik terbaru dengan harga terbaik',
    image: null,
    totalProducts: 1250,
    subcategories: [
        { id: 11, name: 'Handphone', slug: 'handphone', count: 450 },
        { id: 12, name: 'Laptop', slug: 'laptop', count: 280 },
        { id: 13, name: 'Tablet', slug: 'tablet', count: 150 },
        { id: 14, name: 'Audio', slug: 'audio', count: 200 },
        { id: 15, name: 'Kamera', slug: 'kamera', count: 170 },
    ],
};

// Mock products
const mockProducts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Product Elektronik ${i + 1} - High Quality`,
    slug: `product-elektronik-${i + 1}`,
    price: 1000000 + i * 500000,
    discount: i % 4 === 0 ? 20 : i % 3 === 0 ? 10 : 0,
    rating: 4.2 + Math.random() * 0.7,
    soldCount: 50 + i * 30,
    images: [{ url: '/products/placeholder.jpg' }],
    store: {
        name: `Store ${(i % 5) + 1}`,
        city: ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Yogyakarta'][i % 5],
    },
}));

const sortOptions = [
    { value: 'relevant', label: 'Paling Sesuai' },
    { value: 'newest', label: 'Terbaru' },
    { value: 'price_asc', label: 'Harga Terendah' },
    { value: 'price_desc', label: 'Harga Tertinggi' },
    { value: 'popular', label: 'Terlaris' },
];

interface PageProps {
    params: { slug: string };
}

export default function CategoryPage({ params }: PageProps) {
    const { slug } = params;
    const [sortBy, setSortBy] = useState('relevant');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Try API, fallback to mock
    const { data: apiCategory, isLoading: categoryLoading } = useCategory(slug);
    const { data: apiProducts, isLoading: productsLoading } = useProducts({
        categoryId: apiCategory?.id,
        sortBy: sortBy
    });

    const category = apiCategory || mockCategory;
    const products = apiProducts?.data || mockProducts;
    const isLoading = categoryLoading || productsLoading;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Category Header */}
                <div className="bg-gradient-to-r from-primary-600 to-accent-500 py-12">
                    <div className="container mx-auto px-4">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                            <Link href="/" className="hover:text-white">Beranda</Link>
                            <ChevronRight className="w-4 h-4" />
                            <Link href="/categories" className="hover:text-white">Kategori</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white font-medium">{category.name}</span>
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-2">{category.name}</h1>
                        <p className="text-white/80">{category.description}</p>
                        <p className="text-white/60 mt-2">{category.totalProducts?.toLocaleString()} produk ditemukan</p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-6">
                    <div className="flex gap-6">
                        {/* Sidebar - Subcategories */}
                        <aside className="hidden lg:block w-64 flex-shrink-0">
                            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                                <h3 className="font-bold mb-4">Subkategori</h3>
                                <div className="space-y-2">
                                    {category.subcategories?.map((sub: any) => (
                                        <Link
                                            key={sub.id}
                                            href={`/category/${sub.slug}`}
                                            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <span>{sub.name}</span>
                                            <span className="text-sm text-gray-400">({sub.count})</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Toolbar */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-4 flex flex-wrap items-center justify-between gap-4">
                                {/* Mobile Subcategories */}
                                <div className="lg:hidden">
                                    <select className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent">
                                        <option value="">Semua Subkategori</option>
                                        {category.subcategories?.map((sub: any) => (
                                            <option key={sub.id} value={sub.slug}>{sub.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sort */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Urutkan:</span>
                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="appearance-none bg-transparent border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-primary-500 cursor-pointer"
                                        >
                                            {sortOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* View Toggle */}
                                <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-600 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded ${viewMode === 'grid'
                                                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <Grid3X3 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded ${viewMode === 'list'
                                                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        <LayoutList className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Products Grid */}
                            {isLoading ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <ProductCardSkeleton key={i} />
                                    ))}
                                </div>
                            ) : (
                                <div className={`grid gap-4 ${viewMode === 'grid'
                                        ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                                        : 'grid-cols-1'
                                    }`}>
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
                                            storeName={product.store?.name || 'Store'}
                                            storeCity={product.store?.city || 'Indonesia'}
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
                                    {[1, 2, 3, '...', 10].map((page, i) => (
                                        <button
                                            key={i}
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
                </div>
            </main>
            <Footer />
        </>
    );
}
