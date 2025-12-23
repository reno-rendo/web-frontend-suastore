import Link from 'next/link';
import {
    Smartphone,
    Laptop,
    Shirt,
    Home,
    ShoppingBag,
    Watch,
    Gamepad2,
    Car,
    Baby,
    Dumbbell,
    Book,
    Utensils,
} from 'lucide-react';

const categories = [
    { id: 1, name: 'Handphone', slug: 'handphone', icon: Smartphone, color: 'bg-blue-500' },
    { id: 2, name: 'Laptop', slug: 'laptop', icon: Laptop, color: 'bg-purple-500' },
    { id: 3, name: 'Fashion Pria', slug: 'fashion-pria', icon: Shirt, color: 'bg-indigo-500' },
    { id: 4, name: 'Fashion Wanita', slug: 'fashion-wanita', icon: ShoppingBag, color: 'bg-pink-500' },
    { id: 5, name: 'Rumah Tangga', slug: 'rumah-tangga', icon: Home, color: 'bg-orange-500' },
    { id: 6, name: 'Jam Tangan', slug: 'jam-tangan', icon: Watch, color: 'bg-yellow-500' },
    { id: 7, name: 'Gaming', slug: 'gaming', icon: Gamepad2, color: 'bg-red-500' },
    { id: 8, name: 'Otomotif', slug: 'otomotif', icon: Car, color: 'bg-gray-600' },
    { id: 9, name: 'Ibu & Bayi', slug: 'ibu-bayi', icon: Baby, color: 'bg-teal-500' },
    { id: 10, name: 'Olahraga', slug: 'olahraga', icon: Dumbbell, color: 'bg-green-500' },
    { id: 11, name: 'Buku', slug: 'buku', icon: Book, color: 'bg-amber-600' },
    { id: 12, name: 'Makanan', slug: 'makanan', icon: Utensils, color: 'bg-rose-500' },
];

export function CategorySection() {
    return (
        <section className="py-8 bg-gray-50 dark:bg-gray-900/50">
            <div className="container-app">
                <div className="section-header">
                    <h2 className="section-title">Kategori</h2>
                    <Link href="/categories" className="section-link">
                        Lihat Semua
                    </Link>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all hover:shadow-md"
                            >
                                <div
                                    className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}
                                >
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xs text-center font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600">
                                    {category.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
