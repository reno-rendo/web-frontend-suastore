'use client';

import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Users,
    Eye,
    ShoppingBag,
    DollarSign,
    Package,
    Star,
    ChevronDown
} from 'lucide-react';

// Mock data
const overviewStats = [
    { label: 'Total Pendapatan', value: 'Rp 458.500.000', change: '+15.2%', trend: 'up' },
    { label: 'Total Pesanan', value: '1,256', change: '+12.8%', trend: 'up' },
    { label: 'Pengunjung', value: '45,890', change: '+8.5%', trend: 'up' },
    { label: 'Conversion Rate', value: '2.74%', change: '-0.3%', trend: 'down' },
];

const topProducts = [
    { name: 'iPhone 15 Pro Max 256GB', views: 12500, orders: 125, revenue: 2812388000 },
    { name: 'MacBook Pro M3 14"', views: 8900, orders: 45, revenue: 1574955000 },
    { name: 'AirPods Pro 2nd Gen', views: 7800, orders: 89, revenue: 355911000 },
    { name: 'iPad Pro 12.9" M2', views: 5600, orders: 34, revenue: 645966000 },
    { name: 'Apple Watch Ultra 2', views: 4200, orders: 28, revenue: 419972000 },
];

const revenueData = [
    { month: 'Jan', value: 35000000 },
    { month: 'Feb', value: 42000000 },
    { month: 'Mar', value: 38000000 },
    { month: 'Apr', value: 55000000 },
    { month: 'Mei', value: 48000000 },
    { month: 'Jun', value: 62000000 },
    { month: 'Jul', value: 58000000 },
    { month: 'Agu', value: 72000000 },
    { month: 'Sep', value: 68000000 },
    { month: 'Okt', value: 85000000 },
    { month: 'Nov', value: 92000000 },
    { month: 'Des', value: 115000000 },
];

const formatPrice = (price: number) => {
    if (price >= 1000000000) {
        return `Rp ${(price / 1000000000).toFixed(1)}M`;
    }
    if (price >= 1000000) {
        return `Rp ${(price / 1000000).toFixed(0)}jt`;
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

export default function SellerStatsPage() {
    const maxRevenue = Math.max(...revenueData.map(d => d.value));

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Statistik Toko</h1>
                    <p className="text-gray-500">Analisis performa toko Anda</p>
                </div>
                <div className="flex items-center gap-2">
                    <select className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-transparent">
                        <option>30 Hari Terakhir</option>
                        <option>7 Hari Terakhir</option>
                        <option>Bulan Ini</option>
                        <option>Tahun Ini</option>
                    </select>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {overviewStats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500 text-sm">{stat.label}</span>
                            <span className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                }`}>
                                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg">Pendapatan</h2>
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-primary-500 rounded-full" />
                            <span className="text-gray-500">2024</span>
                        </div>
                    </div>
                </div>

                {/* Simple Bar Chart */}
                <div className="flex items-end gap-2 h-64">
                    {revenueData.map((data) => (
                        <div key={data.month} className="flex-1 flex flex-col items-center">
                            <div
                                className="w-full bg-gradient-to-t from-primary-500 to-accent-500 rounded-t-lg transition-all hover:opacity-80"
                                style={{ height: `${(data.value / maxRevenue) * 100}%` }}
                                title={formatPrice(data.value)}
                            />
                            <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Products */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="font-bold text-lg">Produk Terlaris</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">#</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Produk</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        Views
                                    </div>
                                </th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <ShoppingBag className="w-4 h-4" />
                                        Orders
                                    </div>
                                </th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="w-4 h-4" />
                                        Revenue
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {topProducts.map((product, index) => (
                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-4">
                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${index < 3 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td className="p-4 font-medium">{product.name}</td>
                                    <td className="p-4 text-gray-500">{product.views.toLocaleString()}</td>
                                    <td className="p-4 text-gray-500">{product.orders}</td>
                                    <td className="p-4 font-semibold text-green-600">{formatPrice(product.revenue)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Additional Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Traffic Sources */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-bold text-lg mb-4">Sumber Traffic</h2>
                    <div className="space-y-4">
                        {[
                            { source: 'Pencarian', value: 45, color: 'bg-blue-500' },
                            { source: 'Kategori', value: 28, color: 'bg-green-500' },
                            { source: 'Link Langsung', value: 15, color: 'bg-purple-500' },
                            { source: 'Iklan', value: 12, color: 'bg-yellow-500' },
                        ].map((item) => (
                            <div key={item.source} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>{item.source}</span>
                                    <span className="font-medium">{item.value}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${item.color} rounded-full`}
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rating Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-bold text-lg mb-4">Distribusi Rating</h2>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="text-center">
                            <p className="text-4xl font-bold text-yellow-500">4.9</p>
                            <div className="flex items-center gap-1 mt-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">15,420 ulasan</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {[
                            { stars: 5, count: 12850, percent: 83 },
                            { stars: 4, count: 1850, percent: 12 },
                            { stars: 3, count: 450, percent: 3 },
                            { stars: 2, count: 170, percent: 1 },
                            { stars: 1, count: 100, percent: 1 },
                        ].map((item) => (
                            <div key={item.stars} className="flex items-center gap-3">
                                <span className="text-sm w-4">{item.stars}</span>
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-400 rounded-full"
                                        style={{ width: `${item.percent}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-500 w-16 text-right">{item.count.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
