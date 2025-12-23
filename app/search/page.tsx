'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
    Search,
    SlidersHorizontal,
    X,
    ChevronDown,
    Grid,
    List,
    Star,
    Heart,
    ShoppingCart,
    MapPin,
    Package
} from 'lucide-react';

// Mock data
const mockProducts = [
    { id: 1, title: 'iPhone 15 Pro Max 256GB', price: 22499100, originalPrice: 24999000, rating: 4.9, sold: 5420, store: 'Apple Store', location: 'Jakarta', image: null },
    { id: 2, title: 'MacBook Pro M3 14"', price: 34999000, originalPrice: 36999000, rating: 4.8, sold: 1250, store: 'Apple Store', location: 'Jakarta', image: null },
    { id: 3, title: 'Samsung Galaxy S24 Ultra', price: 19999000, originalPrice: 21999000, rating: 4.7, sold: 3200, store: 'Samsung Official', location: 'Surabaya', image: null },
    { id: 4, title: 'iPad Pro 12.9" M2', price: 18999000, originalPrice: 20999000, rating: 4.8, sold: 980, store: 'Apple Store', location: 'Jakarta', image: null },
    { id: 5, title: 'AirPods Pro 2nd Gen', price: 3999000, originalPrice: 4299000, rating: 4.9, sold: 8900, store: 'Apple Store', location: 'Bandung', image: null },
    { id: 6, title: 'Sony WH-1000XM5', price: 4999000, originalPrice: 5499000, rating: 4.7, sold: 2100, store: 'Sony Store', location: 'Jakarta', image: null },
];

const categories = [
    { id: 1, name: 'Handphone', count: 1250 },
    { id: 2, name: 'Laptop', count: 890 },
    { id: 3, name: 'Tablet', count: 456 },
    { id: 4, name: 'Audio', count: 678 },
    { id: 5, name: 'Aksesoris', count: 2340 },
];

const locations = ['Semua', 'Jakarta', 'Surabaya', 'Bandung', 'Yogyakarta', 'Semarang'];
const sortOptions = [
    { value: 'relevance', label: 'Paling Relevan' },
    { value: 'newest', label: 'Terbaru' },
    { value: 'bestseller', label: 'Terlaris' },
    { value: 'price_low', label: 'Harga Terendah' },
    { value: 'price_high', label: 'Harga Tertinggi' },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('relevance');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedLocation, setSelectedLocation] = useState('Semua');
    const [minRating, setMinRating] = useState(0);

    const filteredProducts = mockProducts.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(query.toLowerCase());
        const matchesPrice = (!priceRange.min || p.price >= parseInt(priceRange.min)) &&
            (!priceRange.max || p.price <= parseInt(priceRange.max));
        const matchesLocation = selectedLocation === 'Semua' || p.location === selectedLocation;
        const matchesRating = p.rating >= minRating;
        return matchesSearch && matchesPrice && matchesLocation && matchesRating;
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Search Header */}
            <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                defaultValue={query}
                                placeholder="Cari produk..."
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-transparent"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`p-3 rounded-xl border transition-colors lg:hidden ${showFilters
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                                    : 'border-gray-200 dark:border-gray-600'
                                }`}
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Sort & View Options */}
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-gray-500">
                            {filteredProducts.length} hasil untuk "<span className="font-medium text-gray-900 dark:text-white">{query || 'semua'}</span>"
                        </p>
                        <div className="flex items-center gap-3">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-transparent"
                            >
                                {sortOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <div className="hidden sm:flex items-center border border-gray-200 dark:border-gray-600 rounded-lg">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex gap-6">
                    {/* Filters Sidebar */}
                    <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white dark:bg-gray-800 p-6 overflow-y-auto' : 'hidden'} lg:block lg:relative lg:w-64 lg:flex-shrink-0`}>
                        {/* Mobile close button */}
                        <div className="flex items-center justify-between mb-6 lg:hidden">
                            <h2 className="text-lg font-bold">Filter</h2>
                            <button onClick={() => setShowFilters(false)} className="p-2">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Categories */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:shadow-sm">
                                <h3 className="font-bold mb-3">Kategori</h3>
                                <div className="space-y-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.id
                                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                                                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <span>{cat.name}</span>
                                            <span className="text-gray-400">{cat.count}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:shadow-sm">
                                <h3 className="font-bold mb-3">Harga</h3>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                        placeholder="Min"
                                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
                                    />
                                    <span className="text-gray-400">-</span>
                                    <input
                                        type="number"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                        placeholder="Max"
                                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:shadow-sm">
                                <h3 className="font-bold mb-3">Lokasi</h3>
                                <div className="flex flex-wrap gap-2">
                                    {locations.map(loc => (
                                        <button
                                            key={loc}
                                            onClick={() => setSelectedLocation(loc)}
                                            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedLocation === loc
                                                    ? 'bg-primary-500 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                }`}
                                        >
                                            {loc}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:shadow-sm">
                                <h3 className="font-bold mb-3">Rating</h3>
                                <div className="space-y-2">
                                    {[4, 3, 2, 1].map(rating => (
                                        <button
                                            key={rating}
                                            onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${minRating === rating
                                                    ? 'bg-primary-50 dark:bg-primary-900/20'
                                                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                            <span>& ke atas</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Apply button */}
                        <div className="mt-6 lg:hidden">
                            <button
                                onClick={() => setShowFilters(false)}
                                className="w-full btn-primary py-3 rounded-xl"
                            >
                                Terapkan Filter
                            </button>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {filteredProducts.length === 0 ? (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center">
                                <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                <h3 className="text-lg font-bold mb-2">Produk tidak ditemukan</h3>
                                <p className="text-gray-500">Coba ubah kata kunci atau filter pencarian</p>
                            </div>
                        ) : (
                            <div className={viewMode === 'grid'
                                ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                                : 'space-y-4'
                            }>
                                {filteredProducts.map(product => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.id}`}
                                        className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow ${viewMode === 'list' ? 'flex gap-4 p-4' : ''
                                            }`}
                                    >
                                        {/* Image */}
                                        <div className={`bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${viewMode === 'list' ? 'w-32 h-32 rounded-lg flex-shrink-0' : 'aspect-square'
                                            }`}>
                                            <Package className="w-12 h-12 text-gray-300" />
                                        </div>

                                        {/* Content */}
                                        <div className={viewMode === 'list' ? 'flex-1' : 'p-4'}>
                                            <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.title}</h3>

                                            <div className="mb-2">
                                                <p className="text-lg font-bold text-primary-600">{formatPrice(product.price)}</p>
                                                {product.originalPrice > product.price && (
                                                    <p className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                    {product.rating}
                                                </div>
                                                <span>•</span>
                                                <span>{product.sold} terjual</span>
                                            </div>

                                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                                <MapPin className="w-3 h-3" />
                                                {product.location}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Load More */}
                        {filteredProducts.length > 0 && (
                            <div className="mt-8 text-center">
                                <button className="px-8 py-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700">
                                    Muat Lebih Banyak
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
