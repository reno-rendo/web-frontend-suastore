'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    Plus,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Copy,
    Package,
    ChevronDown
} from 'lucide-react';

// Mock data
const products = [
    { id: 1, name: 'iPhone 15 Pro Max 256GB', sku: 'APL-IP15PM-256', price: 22499100, stock: 45, sold: 125, status: 'active', image: null },
    { id: 2, name: 'MacBook Pro M3 14"', sku: 'APL-MBP14-M3', price: 34999000, stock: 12, sold: 45, status: 'active', image: null },
    { id: 3, name: 'iPad Pro 12.9" M2', sku: 'APL-IPADP-129', price: 18999000, stock: 0, sold: 34, status: 'out_of_stock', image: null },
    { id: 4, name: 'AirPods Pro 2nd Gen', sku: 'APL-APP2', price: 3999000, stock: 89, sold: 89, status: 'active', image: null },
    { id: 5, name: 'Apple Watch Ultra 2', sku: 'APL-AWU2', price: 14999000, stock: 5, sold: 28, status: 'low_stock', image: null },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

export default function SellerProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const toggleSelectAll = () => {
        if (selectedProducts.length === filteredProducts.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(filteredProducts.map(p => p.id));
        }
    };

    const toggleSelect = (id: number) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(i => i !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Produk Saya</h1>
                    <p className="text-gray-500">{products.length} produk</p>
                </div>
                <Link
                    href="/seller/products/new"
                    className="btn-primary px-4 py-2 rounded-xl flex items-center gap-2 justify-center"
                >
                    <Plus className="w-5 h-5" />
                    Tambah Produk
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari produk atau SKU..."
                            className="w-full pl-12 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-transparent"
                        >
                            <option value="all">Semua Status</option>
                            <option value="active">Aktif</option>
                            <option value="out_of_stock">Habis</option>
                            <option value="low_stock">Stok Rendah</option>
                            <option value="inactive">Nonaktif</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedProducts.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-4">
                        <span className="text-sm text-gray-500">{selectedProducts.length} produk dipilih</span>
                        <button className="text-sm text-red-500 hover:text-red-600">Hapus</button>
                        <button className="text-sm text-gray-600 hover:text-gray-800">Nonaktifkan</button>
                        <button className="text-sm text-gray-600 hover:text-gray-800">Update Stok</button>
                    </div>
                )}
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="p-4 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded border-gray-300"
                                    />
                                </th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Produk</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">SKU</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Harga</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Stok</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Terjual</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Status</th>
                                <th className="p-4 text-left text-sm font-medium text-gray-500">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(product.id)}
                                            onChange={() => toggleSelect(product.id)}
                                            className="w-4 h-4 rounded border-gray-300"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                <Package className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <span className="font-medium">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">{product.sku}</td>
                                    <td className="p-4 font-medium">{formatPrice(product.price)}</td>
                                    <td className="p-4">
                                        <span className={`font-medium ${product.stock === 0 ? 'text-red-500' :
                                                product.stock < 10 ? 'text-yellow-500' : ''
                                            }`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500">{product.sold}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.status === 'active' ? 'bg-green-100 text-green-600' :
                                                product.status === 'out_of_stock' ? 'bg-red-100 text-red-600' :
                                                    product.status === 'low_stock' ? 'bg-yellow-100 text-yellow-600' :
                                                        'bg-gray-100 text-gray-600'
                                            }`}>
                                            {product.status === 'active' ? 'Aktif' :
                                                product.status === 'out_of_stock' ? 'Habis' :
                                                    product.status === 'low_stock' ? 'Stok Rendah' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/seller/products/${product.id}`}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                href={`/product/${product.id}`}
                                                target="_blank"
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500">
                                                <Trash2 className="w-4 h-4" />
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
                    <span className="text-sm text-gray-500">
                        Menampilkan 1-{filteredProducts.length} dari {products.length} produk
                    </span>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
                            Sebelumnya
                        </button>
                        <button className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                            Selanjutnya
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
