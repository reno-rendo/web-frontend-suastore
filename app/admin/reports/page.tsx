'use client';

import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    ShoppingBag,
    Package,
    Calendar,
    Download,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

// Mock report data
const monthlyRevenue = [
    { month: 'Jan', value: 8500000000 },
    { month: 'Feb', value: 9200000000 },
    { month: 'Mar', value: 8800000000 },
    { month: 'Apr', value: 10500000000 },
    { month: 'Mei', value: 9800000000 },
    { month: 'Jun', value: 11200000000 },
    { month: 'Jul', value: 10800000000 },
    { month: 'Agu', value: 12500000000 },
    { month: 'Sep', value: 11800000000 },
    { month: 'Okt', value: 13200000000 },
    { month: 'Nov', value: 14500000000 },
    { month: 'Des', value: 16800000000 },
];

const topCategories = [
    { name: 'Electronics', sales: 45000, revenue: 125000000000 },
    { name: 'Fashion', sales: 38000, revenue: 45000000000 },
    { name: 'Home & Living', sales: 22000, revenue: 28000000000 },
    { name: 'Beauty', sales: 18500, revenue: 15000000000 },
    { name: 'Sports', sales: 12000, revenue: 18000000000 },
];

const formatCurrency = (value: number) => {
    if (value >= 1000000000000) return `Rp ${(value / 1000000000000).toFixed(1)}T`;
    if (value >= 1000000000) return `Rp ${(value / 1000000000).toFixed(0)}M`;
    if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(0)}jt`;
    return `Rp ${value.toLocaleString()}`;
};

export default function AdminReportsPage() {
    const maxRevenue = Math.max(...monthlyRevenue.map(d => d.value));
    const totalRevenue = monthlyRevenue.reduce((sum, m) => sum + m.value, 0);

    return (
        <div className="space-y-6">
            {/* Period Selector */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <select className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent">
                        <option>2024</option>
                        <option>2023</option>
                        <option>2022</option>
                    </select>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg">
                    <Download className="w-4 h-4" />
                    Export Report
                </button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-green-100 rounded-lg"><DollarSign className="w-5 h-5 text-green-600" /></div>
                        <span className="flex items-center gap-1 text-sm text-green-500"><TrendingUp className="w-4 h-4" />+23.5%</span>
                    </div>
                    <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
                    <p className="text-sm text-gray-500">Annual Revenue</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg"><ShoppingBag className="w-5 h-5 text-blue-600" /></div>
                        <span className="flex items-center gap-1 text-sm text-green-500"><TrendingUp className="w-4 h-4" />+18.2%</span>
                    </div>
                    <p className="text-2xl font-bold">1,245,890</p>
                    <p className="text-sm text-gray-500">Total Orders</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-purple-100 rounded-lg"><Users className="w-5 h-5 text-purple-600" /></div>
                        <span className="flex items-center gap-1 text-sm text-green-500"><TrendingUp className="w-4 h-4" />+12.8%</span>
                    </div>
                    <p className="text-2xl font-bold">125,430</p>
                    <p className="text-sm text-gray-500">Total Users</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-orange-100 rounded-lg"><Package className="w-5 h-5 text-orange-600" /></div>
                        <span className="flex items-center gap-1 text-sm text-red-500"><TrendingDown className="w-4 h-4" />-2.3%</span>
                    </div>
                    <p className="text-2xl font-bold">Rp 102K</p>
                    <p className="text-sm text-gray-500">Avg Order Value</p>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="font-bold text-lg">Monthly Revenue</h2>
                        <p className="text-sm text-gray-500">Revenue trend for 2024</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-primary-500 rounded-full" />
                            <span className="text-gray-500">Revenue</span>
                        </div>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="flex items-end gap-2 h-64">
                    {monthlyRevenue.map((data) => (
                        <div key={data.month} className="flex-1 flex flex-col items-center">
                            <div
                                className="w-full bg-gradient-to-t from-primary-500 to-accent-500 rounded-t-lg transition-all hover:opacity-80 relative group"
                                style={{ height: `${(data.value / maxRevenue) * 100}%` }}
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                    {formatCurrency(data.value)}
                                </div>
                            </div>
                            <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Categories */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <h2 className="font-bold text-lg mb-4">Top Categories</h2>
                    <div className="space-y-4">
                        {topCategories.map((cat, index) => (
                            <div key={cat.name} className="flex items-center gap-4">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index < 3 ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {index + 1}
                                </span>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium">{cat.name}</span>
                                        <span className="text-green-600 font-semibold">{formatCurrency(cat.revenue)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>{cat.sales.toLocaleString()} orders</span>
                                        <div className="w-24 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary-500 rounded-full"
                                                style={{ width: `${(cat.revenue / topCategories[0].revenue) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <h2 className="font-bold text-lg mb-4">Performance Summary</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <div className="flex items-center gap-3">
                                <ArrowUpRight className="w-5 h-5 text-green-600" />
                                <span>Conversion Rate</span>
                            </div>
                            <span className="font-bold text-green-600">3.45%</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                            <div className="flex items-center gap-3">
                                <ArrowUpRight className="w-5 h-5 text-blue-600" />
                                <span>Customer Retention</span>
                            </div>
                            <span className="font-bold text-blue-600">68.2%</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                            <div className="flex items-center gap-3">
                                <ArrowUpRight className="w-5 h-5 text-purple-600" />
                                <span>Seller Growth</span>
                            </div>
                            <span className="font-bold text-purple-600">+245</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                            <div className="flex items-center gap-3">
                                <ArrowDownRight className="w-5 h-5 text-red-600" />
                                <span>Refund Rate</span>
                            </div>
                            <span className="font-bold text-red-600">1.2%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
