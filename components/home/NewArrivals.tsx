import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/product';

// Mock data - akan diganti dengan data dari API
const newProducts = [
    {
        id: 16,
        slug: 'robot-vacuum-xiaomi',
        title: 'Xiaomi Robot Vacuum S10+ Self Cleaning Mop',
        price: 5499000,
        image: '/products/xiaomi-vacuum.jpg',
        rating: 4.8,
        reviewCount: 89,
        sold: 340,
        storeName: 'Xiaomi Official',
        storeLocation: 'Jakarta',
    },
    {
        id: 17,
        slug: 'airfryer-philips',
        title: 'Philips Essential Airfryer XL HD9270 6.2L',
        price: 2299000,
        originalPrice: 2999000,
        image: '/products/philips-airfryer.jpg',
        rating: 4.9,
        reviewCount: 156,
        sold: 890,
        storeName: 'Philips Official',
        storeLocation: 'Jakarta',
    },
    {
        id: 18,
        slug: 'drone-dji-mini',
        title: 'DJI Mini 4 Pro Fly More Combo Plus',
        price: 15999000,
        image: '/products/dji-mini.jpg',
        rating: 4.9,
        reviewCount: 45,
        sold: 120,
        storeName: 'DJI Store',
        storeLocation: 'Jakarta',
    },
    {
        id: 19,
        slug: 'smartwatch-samsung',
        title: 'Samsung Galaxy Watch 6 Classic 47mm Black',
        price: 5999000,
        originalPrice: 6999000,
        image: '/products/galaxy-watch.jpg',
        rating: 4.7,
        reviewCount: 234,
        sold: 560,
        storeName: 'Samsung Official',
        storeLocation: 'Surabaya',
    },
    {
        id: 20,
        slug: 'tablet-ipad-pro',
        title: 'iPad Pro 11" M4 256GB WiFi Space Black',
        price: 16999000,
        image: '/products/ipad-pro.jpg',
        rating: 4.9,
        reviewCount: 67,
        sold: 230,
        storeName: 'iBox Official',
        storeLocation: 'Bandung',
    },
];

export function NewArrivals() {
    return (
        <>
            <div className="section-header">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-accent-500" />
                    <h2 className="section-title">Produk Terbaru</h2>
                </div>
                <Link href="/products?sort=newest" className="section-link">
                    Lihat Semua
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {newProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </>
    );
}
