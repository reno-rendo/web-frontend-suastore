'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, MapPin, Store } from 'lucide-react';

interface ProductCardProps {
    id: number;
    slug: string;
    title: string;
    price: number;
    discount?: number;
    originalPrice?: number;
    image: string;
    rating?: number;
    reviewCount?: number;
    soldCount?: number;
    sold?: number;
    storeName: string;
    storeCity?: string;
    storeLocation?: string;
    isWishlisted?: boolean;
    onWishlistToggle?: (id: number) => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};

export function ProductCard({
    id,
    slug,
    title,
    price,
    discount = 0,
    originalPrice,
    image,
    rating = 0,
    reviewCount = 0,
    soldCount,
    sold,
    storeName,
    storeCity,
    storeLocation,
    isWishlisted = false,
    onWishlistToggle,
}: ProductCardProps) {
    // Calculate final price if discount is provided
    const finalPrice = discount > 0 ? Math.round(price * (1 - discount / 100)) : price;
    const displayOriginalPrice = discount > 0 ? price : originalPrice;
    const soldDisplay = soldCount ?? sold ?? 0;
    const location = storeCity ?? storeLocation ?? '';

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onWishlistToggle?.(id);
    };

    return (
        <Link href={`/product/${slug}`} className="product-card group block">
            {/* Image */}
            <div className="product-card-image">
                {image && image !== '/placeholder.jpg' ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            // Fallback on error
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                        }}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 text-sm">
                        <Store className="w-8 h-8" />
                    </div>
                )}

                {/* Discount badge */}
                {discount > 0 && (
                    <div className="product-card-discount">
                        -{discount}%
                    </div>
                )}

                {/* Wishlist button */}
                <button
                    onClick={handleWishlistClick}
                    className="product-card-wishlist group-hover:opacity-100"
                    aria-label={isWishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
                >
                    <Heart
                        className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                            }`}
                    />
                </button>
            </div>

            {/* Content */}
            <div className="p-3 space-y-2">
                {/* Title */}
                <h3 className="font-medium text-sm line-clamp-2 min-h-[40px]">
                    {title}
                </h3>

                {/* Price */}
                <div className="space-y-0.5">
                    <p className="price text-lg font-bold text-primary-600">{formatCurrency(finalPrice)}</p>
                    {displayOriginalPrice && displayOriginalPrice > finalPrice && (
                        <p className="text-sm text-gray-400 line-through">{formatCurrency(displayOriginalPrice)}</p>
                    )}
                </div>

                {/* Rating & Sold */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    {rating > 0 && (
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{rating.toFixed(1)}</span>
                            {reviewCount > 0 && (
                                <span className="text-xs">({reviewCount})</span>
                            )}
                        </div>
                    )}
                    {soldDisplay > 0 && (
                        <>
                            {rating > 0 && <span className="text-gray-300">|</span>}
                            <span>Terjual {soldDisplay >= 1000 ? `${(soldDisplay / 1000).toFixed(1)}rb` : soldDisplay}</span>
                        </>
                    )}
                </div>

                {/* Store info */}
                <div className="flex items-center gap-1 text-xs text-gray-500 pt-1 border-t border-gray-100 dark:border-gray-700">
                    <Store className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{storeName}</span>
                    {location && (
                        <>
                            <span className="text-gray-300">•</span>
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{location}</span>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
}

// Skeleton loader untuk ProductCard
export function ProductCardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="p-3 space-y-3">
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
            </div>
        </div>
    );
}
