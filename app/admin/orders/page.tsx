'use client';

import { useState } from 'react';
import {
    Search,
    ShoppingBag,
    Clock,
    CheckCircle,
    XCircle,
    Truck,
    Eye,
    ChevronLeft,
    ChevronRight,
    Package,
    DollarSign
} from 'lucide-react';

// Mock orders data
const mockOrders = [
    { id: 'INV/20241223/001', user: 'John Doe', store: 'Apple Store', amount: 22499100, status: 'completed', date: '23 Des 2024' },
    { id: 'INV/20241223/002', user: 'Jane Smith', store: 'Samsung Official', amount: 5999000, status: 'shipping', date: '23 Des 2024' },
    { id: 'INV/20241223/003', user: 'Ahmad Yusuf', store: 'Apple Store', amount: 34999000, status: 'processing', date: '23 Des 2024' },
    { id: 'INV/20241222/004', user: 'Siti Aminah', store: 'Xiaomi Store', amount: 3999000, status: 'pending', date: '22 Des 2024' },
    { id: 'INV/20241222/005', user: 'Bob Wilson', store: 'Apple Store', amount: 18999000, status: 'cancelled', date: '22 Des 2024' },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed': return 'bg-green-100 text-green-600';
        case 'shipping': return 'bg-blue-100 text-blue-600';
        case 'processing': return 'bg-purple-100 text-purple-600';
        case 'pending': return 'bg-yellow-100 text-yellow-600';
        case 'cancelled': return 'bg-red-100 text-red-600';
        default: return 'bg-gray-100 text-gray-600';
    }
};

export default function AdminOrdersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    const filteredOrders = mockOrders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.user.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = mockOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0);

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg"><ShoppingBag className="w-5 h-5 text-blue-600" /></div>
                        <div><p className="text-xl font-bold">89,420</p><p className="text-xs text-gray-500">Total</p></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg"><Clock className="w-5 h-5 text-yellow-600" /></div>
                        <div><p className="text-xl font-bold">1,245</p><p className="text-xs text-gray-500">Pending</p></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg"><Package className="w-5 h-5 text-purple-600" /></div>
                        <div><p className="text-xl font-bold">3,890</p><p className="text-xs text-gray-500">Processing</p></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg"><Truck className="w-5 h-5 text-blue-600" /></div>
                        <div><p className="text-xl font-bold">5,420</p><p className="text-xs text-gray-500">Shipping</p></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="w-5 h-5 text-green-600" /></div>
                        <div><p className="text-xl font-bold">78,865</p><p className="text-xs text-gray-500">Completed</p></div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search orders..." className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent" />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent">
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipping">Shipping</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent">
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Order ID</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Customer</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Store</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Amount</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Status</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Date</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-4 font-mono text-sm font-medium">{order.id}</td>
                                    <td className="p-4">{order.user}</td>
                                    <td className="p-4 text-gray-500">{order.store}</td>
                                    <td className="p-4 font-semibold">{formatPrice(order.amount)}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500">{order.date}</td>
                                    <td className="p-4">
                                        <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                                            <Eye className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing 1-10 of 89,420 orders</p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg"><ChevronLeft className="w-4 h-4" /></button>
                        <button className="px-3 py-1 bg-primary-500 text-white rounded-lg">1</button>
                        <button className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
