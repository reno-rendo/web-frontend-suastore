'use client';

import { useState } from 'react';
import {
    Search,
    Store,
    CheckCircle,
    XCircle,
    Clock,
    Eye,
    Ban,
    ChevronLeft,
    ChevronRight,
    Star,
    Package,
    MapPin
} from 'lucide-react';

// Mock stores data
const mockStores = [
    { id: 1, name: 'Apple Store Official', owner: 'John Doe', products: 156, rating: 4.9, status: 'verified', location: 'Jakarta', sales: 125000000 },
    { id: 2, name: 'Samsung Official', owner: 'Jane Smith', products: 234, rating: 4.8, status: 'verified', location: 'Surabaya', sales: 98000000 },
    { id: 3, name: 'Xiaomi Store', owner: 'Ahmad Yusuf', products: 89, rating: 4.5, status: 'pending', location: 'Bandung', sales: 45000000 },
    { id: 4, name: 'Random Seller', owner: 'Bad Actor', products: 12, rating: 2.1, status: 'suspended', location: 'Unknown', sales: 5000000 },
];

const formatPrice = (price: number) => {
    if (price >= 1000000) return `Rp ${(price / 1000000).toFixed(0)}jt`;
    return `Rp ${price.toLocaleString()}`;
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'verified': return 'bg-green-100 text-green-600';
        case 'pending': return 'bg-yellow-100 text-yellow-600';
        case 'suspended': return 'bg-red-100 text-red-600';
        default: return 'bg-gray-100 text-gray-600';
    }
};

export default function AdminStoresPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredStores = mockStores.filter(store => {
        const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || store.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg"><Store className="w-5 h-5 text-purple-600" /></div>
                        <div><p className="text-2xl font-bold">3,845</p><p className="text-sm text-gray-500">Total Stores</p></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="w-5 h-5 text-green-600" /></div>
                        <div><p className="text-2xl font-bold">3,680</p><p className="text-sm text-gray-500">Verified</p></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg"><Clock className="w-5 h-5 text-yellow-600" /></div>
                        <div><p className="text-2xl font-bold">120</p><p className="text-sm text-gray-500">Pending</p></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg"><XCircle className="w-5 h-5 text-red-600" /></div>
                        <div><p className="text-2xl font-bold">45</p><p className="text-sm text-gray-500">Suspended</p></div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search stores..." className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent" />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent">
                    <option value="all">All Status</option>
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                </select>
            </div>

            {/* Stores Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStores.map((store) => (
                    <div key={store.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                                    <Store className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold">{store.name}</h3>
                                    <p className="text-sm text-gray-500">{store.owner}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(store.status)}`}>
                                {store.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                            <div>
                                <p className="font-bold">{store.products}</p>
                                <p className="text-xs text-gray-500">Products</p>
                            </div>
                            <div>
                                <p className="font-bold flex items-center justify-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    {store.rating}
                                </p>
                                <p className="text-xs text-gray-500">Rating</p>
                            </div>
                            <div>
                                <p className="font-bold text-green-600">{formatPrice(store.sales)}</p>
                                <p className="text-xs text-gray-500">Sales</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                            <MapPin className="w-4 h-4" />
                            {store.location}
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                                View
                            </button>
                            {store.status === 'pending' ? (
                                <button className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm">Verify</button>
                            ) : store.status === 'verified' ? (
                                <button className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm">Suspend</button>
                            ) : (
                                <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm">Restore</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
