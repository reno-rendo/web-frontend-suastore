'use client';

import { useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    UserCheck,
    UserX,
    Shield,
    Mail,
    ChevronLeft,
    ChevronRight,
    Eye,
    Ban,
    Trash2
} from 'lucide-react';

// Mock users data
const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'buyer', status: 'active', orders: 25, joined: '15 Jan 2024' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'seller', status: 'active', orders: 0, joined: '20 Feb 2024' },
    { id: 3, name: 'Ahmad Yusuf', email: 'ahmad@example.com', role: 'buyer', status: 'active', orders: 12, joined: '5 Mar 2024' },
    { id: 4, name: 'Siti Aminah', email: 'siti@example.com', role: 'seller', status: 'banned', orders: 0, joined: '10 Apr 2024' },
    { id: 5, name: 'Bob Wilson', email: 'bob@example.com', role: 'buyer', status: 'active', orders: 8, joined: '22 May 2024' },
    { id: 6, name: 'Alice Brown', email: 'alice@example.com', role: 'admin', status: 'active', orders: 0, joined: '1 Jan 2024' },
];

const getRoleColor = (role: string) => {
    switch (role) {
        case 'admin': return 'bg-red-100 text-red-600';
        case 'seller': return 'bg-purple-100 text-purple-600';
        case 'buyer': return 'bg-blue-100 text-blue-600';
        default: return 'bg-gray-100 text-gray-600';
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'active': return 'bg-green-100 text-green-600';
        case 'banned': return 'bg-red-100 text-red-600';
        case 'pending': return 'bg-yellow-100 text-yellow-600';
        default: return 'bg-gray-100 text-gray-600';
    }
};

export default function AdminUsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const toggleSelectUser = (id: number) => {
        setSelectedUsers(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedUsers.length === filteredUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map(u => u.id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <UserCheck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">125,430</p>
                            <p className="text-sm text-gray-500">Total Users</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Shield className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">3,845</p>
                            <p className="text-sm text-gray-500">Sellers</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <UserCheck className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">121,580</p>
                            <p className="text-sm text-gray-500">Active Users</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <UserX className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">245</p>
                            <p className="text-sm text-gray-500">Banned</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent"
                        />
                    </div>
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent"
                    >
                        <option value="all">All Roles</option>
                        <option value="buyer">Buyers</option>
                        <option value="seller">Sellers</option>
                        <option value="admin">Admins</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-transparent"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="banned">Banned</option>
                    </select>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-primary-600 font-medium">{selectedUsers.length} users selected</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm">Ban Selected</button>
                        <button className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm">Clear</button>
                    </div>
                </div>
            )}

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="p-4 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded"
                                    />
                                </th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">User</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Role</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Status</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Orders</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Joined</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => toggleSelectUser(user.id)}
                                            className="w-4 h-4 rounded"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500">{user.orders}</td>
                                    <td className="p-4 text-gray-500">{user.joined}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                                                <Eye className="w-4 h-4 text-gray-500" />
                                            </button>
                                            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                                                <Mail className="w-4 h-4 text-gray-500" />
                                            </button>
                                            <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                                                <Ban className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing 1-10 of 125,430 users</p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="px-3 py-1 bg-primary-500 text-white rounded-lg">1</button>
                        <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">2</button>
                        <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">3</button>
                        <span>...</span>
                        <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">100</button>
                        <button className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
