'use client';

import {
    Users,
    Package,
    Store,
    ShoppingBag,
    DollarSign,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal
} from 'lucide-react';

// Mock stats
const stats = [
    { label: 'Total Users', value: '125,430', change: '+12.5%', trend: 'up', icon: Users, color: 'bg-blue-500' },
    { label: 'Total Products', value: '45,280', change: '+8.2%', trend: 'up', icon: Package, color: 'bg-purple-500' },
    { label: 'Active Stores', value: '3,845', change: '+5.7%', trend: 'up', icon: Store, color: 'bg-green-500' },
    { label: 'Total Orders', value: '89,420', change: '+18.3%', trend: 'up', icon: ShoppingBag, color: 'bg-orange-500' },
];

const recentOrders = [
    { id: 'INV/20241223/001', user: 'John Doe', amount: 22499100, status: 'completed', date: '23 Des 2024' },
    { id: 'INV/20241223/002', user: 'Jane Smith', amount: 5999000, status: 'processing', date: '23 Des 2024' },
    { id: 'INV/20241223/003', user: 'Ahmad Yusuf', amount: 34999000, status: 'pending', date: '23 Des 2024' },
    { id: 'INV/20241222/004', user: 'Siti Aminah', amount: 3999000, status: 'completed', date: '22 Des 2024' },
];

const topSellers = [
    { name: 'Apple Store Official', sales: 15420, revenue: 125000000 },
    { name: 'Samsung Official', sales: 12350, revenue: 98000000 },
    { name: 'Xiaomi Store', sales: 9800, revenue: 45000000 },
    { name: 'Sony Store', sales: 7500, revenue: 38000000 },
];

const formatPrice = (price: number) => {
    if (price >= 1000000000) return `Rp ${(price / 1000000000).toFixed(1)}M`;
    if (price >= 1000000) return `Rp ${(price / 1000000).toFixed(0)}jt`;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed': return 'bg-green-100 text-green-600';
        case 'processing': return 'bg-blue-100 text-blue-600';
        case 'pending': return 'bg-yellow-100 text-yellow-600';
        default: return 'bg-gray-100 text-gray-600';
    }
};

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                                }`}>
                                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Revenue Card */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-white/70 mb-1">Total Revenue (Desember 2024)</p>
                        <p className="text-4xl font-bold">Rp 12.5M</p>
                        <p className="flex items-center gap-1 mt-2 text-white/80">
                            <ArrowUpRight className="w-4 h-4" />
                            +23.5% dari bulan lalu
                        </p>
                    </div>
                    <DollarSign className="w-20 h-20 text-white/20" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <h2 className="font-bold">Recent Orders</h2>
                        <button className="text-primary-600 text-sm font-medium">View All</button>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{order.id}</p>
                                    <p className="text-sm text-gray-500">{order.user}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">{formatPrice(order.amount)}</p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Sellers */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <h2 className="font-bold">Top Sellers</h2>
                        <button className="text-primary-600 text-sm font-medium">View All</button>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {topSellers.map((seller, index) => (
                            <div key={seller.name} className="p-4 flex items-center gap-4">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index < 3 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {index + 1}
                                </span>
                                <div className="flex-1">
                                    <p className="font-medium">{seller.name}</p>
                                    <p className="text-sm text-gray-500">{seller.sales.toLocaleString()} sales</p>
                                </div>
                                <p className="font-semibold text-green-600">{formatPrice(seller.revenue)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
