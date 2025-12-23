'use client';

import { useState } from 'react';
import {
    Search,
    Filter,
    Package,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Clock,
    ChevronLeft,
    ChevronRight,
    AlertTriangle
} from 'lucide-react';

// Mock products data
const mockProducts = [
    { id: 1, title: 'iPhone 15 Pro Max 256GB', store: 'Apple Store Official', price: 22499100, status: 'approved', stock: 25, moderation: 'approved' },
    { id: 2, title: 'MacBook Pro M3 14"', store: 'Apple Store Official', price: 34999000, status: 'approved', stock: 12, moderation: 'approved' },
    { id: 3, title: 'Samsung Galaxy S24 Ultra', store: 'Samsung Official', price: 19999000, status: 'pending', stock: 30, moderation: 'pending' },
    { id: 4, title: 'Xiaomi 14 Ultra', store: 'Xiaomi Store', price: 15999000, status: 'approved', stock: 45, moderation: 'approved' },
    { id: 5, title: 'Fake iPhone Copy', store: 'Random Seller', price: 2999000, status: 'rejected', stock: 100, moderation: 'rejected' },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
};

const getModerationColor = (status: string) => {
    switch (status) {
        case 'approved': return 'bg-green-100 text-green-600';
        case 'pending': return 'bg-yellow-100 text-yellow-600';
        case 'rejected': return 'bg-red-100 text-red-600';
        default: return 'bg-gray-100 text-gray-600';
    }
};

export default function AdminProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    const filteredProducts = mockProducts.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.store.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || product.moderation === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg"><Package className="w-5 h-5 text-blue-600" /></div>
                        <div><p className="text-2xl font-bold">45,280</p><p className="text-sm text-gray-500">Total Products</p></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="w-5 h-5 text-green-600" /></div>
                        <div><p className="text-2xl font-bold">43,850</p><p className="text-sm text-gray-500">Approved</p></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg"><Clock className="w-5 h-5 text-yellow-600" /></div>
                        <div><p className="text-2xl font-bold">1,250</p><p className="text-sm text-gray-500">Pending Review</p></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg"><XCircle className="w-5 h-5 text-red-600" /></div>
                        <div><p className="text-2xl font-bold">180</p><p className="text-sm text-gray-500">Rejected</p></div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent" />
                    </div>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent">
                        <option value="all">All Status</option>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="p-4 text-left"><input type="checkbox" className="w-4 h-4 rounded" /></th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Product</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Store</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Price</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Stock</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Status</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-4"><input type="checkbox" className="w-4 h-4 rounded" /></td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                                <Package className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <span className="font-medium">{product.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-500">{product.store}</td>
                                    <td className="p-4 font-medium">{formatPrice(product.price)}</td>
                                    <td className="p-4 text-gray-500">{product.stock}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getModerationColor(product.moderation)}`}>
                                            {product.moderation}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"><Eye className="w-4 h-4 text-gray-500" /></button>
                                            {product.moderation === 'pending' && (
                                                <>
                                                    <button className="p-1.5 hover:bg-green-50 rounded-lg"><CheckCircle className="w-4 h-4 text-green-500" /></button>
                                                    <button className="p-1.5 hover:bg-red-50 rounded-lg"><XCircle className="w-4 h-4 text-red-500" /></button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing 1-10 of 45,280 products</p>
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
