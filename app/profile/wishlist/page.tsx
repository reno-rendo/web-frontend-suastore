'use client';

import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import {
    Heart,
    Trash2,
    ShoppingCart,
    ChevronRight,
    Grid3X3,
    LayoutList
} from 'lucide-react';
import { ProductCard, ProductCardSkeleton } from '@/components/product';
import { useWishlist, useToggleWishlist } from '@/lib/hooks';
import { useWishlistStore, useAuthStore } from '@/lib/store';
import { toast } from 'sonner';

// Mock wishlist data
const mockWishlist = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    productId: i + 1,
    product: {
        id: i + 1,
        title: `Wishlist Product ${i + 1} - Amazing Item`,
        slug: `wishlist-product-${i + 1}`,
        price: 500000 + i * 250000,
        discount: i % 2 === 0 ? 15 : 0,
        rating: 4.3 + Math.random() * 0.6,
        soldCount: 200 + i * 100,
        images: [{ url: '/products/placeholder.jpg' }],
        store: {
            name: `Store ${(i % 3) + 1}`,
            city: ['Jakarta', 'Bandung', 'Surabaya'][i % 3],
        },
    },
}));

export default function WishlistPage() {
    const { isAuthenticated } = useAuthStore();

    // Try API, fallback to mock
    const { data: apiWishlist, isLoading } = useWishlist();
    const toggleMutation = useToggleWishlist();

    const wishlistItems = apiWishlist || mockWishlist;

    const handleRemove = async (productId: number) => {
        if (isAuthenticated) {
            try {
                await toggleMutation.mutateAsync(productId);
                toast.success('Dihapus dari wishlist');
            } catch (error) {
                toast.error('Gagal menghapus');
            }
        }
    };

    const handleAddToCart = (productId: number) => {
        // TODO: Add to cart functionality
        toast.success('Ditambahkan ke keranjang');
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm mb-6">
                        <Link href="/profile" className="text-gray-500 hover:text-primary-600">
                            Profil
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold">Wishlist</span>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                            Wishlist Saya
                            <span className="text-gray-400 text-lg">({wishlistItems.length})</span>
                        </h1>
                    </div>

                    {isLoading ? (
                        // Loading skeleton
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : wishlistItems.length === 0 ? (
                        // Empty state
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm max-w-md mx-auto">
                            <Heart className="w-24 h-24 mx-auto mb-6 text-gray-200 dark:text-gray-600" />
                            <h2 className="text-2xl font-bold mb-2">Wishlist Kosong</h2>
                            <p className="text-gray-500 mb-6">
                                Belum ada produk favorit. Yuk simpan produk kesukaanmu!
                            </p>
                            <Link href="/" className="btn-primary px-8 py-3 rounded-xl inline-block">
                                Mulai Belanja
                            </Link>
                        </div>
                    ) : (
                        // Wishlist grid
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {wishlistItems.map((item: any) => (
                                <div key={item.id} className="relative group">
                                    <ProductCard
                                        id={item.product.id}
                                        title={item.product.title}
                                        slug={item.product.slug}
                                        price={item.product.price}
                                        discount={item.product.discount}
                                        rating={item.product.rating}
                                        soldCount={item.product.soldCount}
                                        image={item.product.images?.[0]?.url || '/placeholder.jpg'}
                                        storeName={item.product.store?.name || 'Store'}
                                        storeCity={item.product.store?.city || 'Indonesia'}
                                        isWishlisted={true}
                                        onWishlistToggle={() => handleRemove(item.product.id)}
                                    />

                                    {/* Quick Actions Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl">
                                        <button
                                            onClick={() => handleAddToCart(item.product.id)}
                                            className="w-full bg-white text-gray-900 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            + Keranjang
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
