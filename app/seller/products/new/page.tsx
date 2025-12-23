'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Upload,
    X,
    Plus,
    Trash2,
    Image as ImageIcon,
    Save,
    Eye,
    ChevronDown,
    Info,
    Grip
} from 'lucide-react';

const categories = [
    {
        id: 1, name: 'Elektronik', children: [
            { id: 11, name: 'Handphone' },
            { id: 12, name: 'Laptop' },
            { id: 13, name: 'Tablet' },
        ]
    },
    {
        id: 2, name: 'Fashion', children: [
            { id: 21, name: 'Pakaian Pria' },
            { id: 22, name: 'Pakaian Wanita' },
        ]
    },
];

export default function NewProductPage() {
    const [images, setImages] = useState<string[]>([]);
    const [variants, setVariants] = useState<{ name: string; value: string; price: number; stock: number }[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categoryId: '',
        price: '',
        discount: '0',
        stock: '',
        weight: '',
        condition: 'NEW',
        hasWarranty: false,
        isFreeShipping: false,
    });

    const handleImageUpload = () => {
        // Mock - in real app this would upload to cloud storage
        const mockUrl = `/products/placeholder-${images.length + 1}.jpg`;
        setImages([...images, mockUrl]);
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const addVariant = () => {
        setVariants([...variants, { name: '', value: '', price: 0, stock: 0 }]);
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const updateVariant = (index: number, field: string, value: string | number) => {
        const updated = [...variants];
        updated[index] = { ...updated[index], [field]: value };
        setVariants(updated);
    };

    return (
        <div className="p-6 space-y-6 max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/seller/products"
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Tambah Produk Baru</h1>
                        <p className="text-gray-500">Isi informasi produk dengan lengkap</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                    <button className="btn-primary px-6 py-2 rounded-xl flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Simpan Produk
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-lg mb-4">Informasi Dasar</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Nama Produk <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Contoh: iPhone 15 Pro Max 256GB"
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                />
                                <p className="text-xs text-gray-500 mt-1">Min. 20 karakter, Max 200 karakter</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Kategori <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories.map((cat) => (
                                        <optgroup key={cat.id} label={cat.name}>
                                            {cat.children.map((child) => (
                                                <option key={child.id} value={child.id}>{child.name}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Deskripsi Produk <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={6}
                                    placeholder="Jelaskan detail produk, spesifikasi, cara penggunaan, dll."
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl resize-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">Min. 100 karakter</p>
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-lg mb-4">Foto Produk</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Upload min. 3 foto. Foto pertama akan menjadi cover. Format: JPG, PNG. Max 5MB per foto.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {images.map((img, index) => (
                                <div key={index} className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden group">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <ImageIcon className="w-12 h-12 text-gray-300" />
                                    </div>
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
                                            <Grip className="w-5 h-5 text-white" />
                                        </button>
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="p-2 bg-red-500/80 rounded-lg hover:bg-red-500"
                                        >
                                            <Trash2 className="w-5 h-5 text-white" />
                                        </button>
                                    </div>
                                    {index === 0 && (
                                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary-500 text-white text-xs rounded">
                                            Cover
                                        </span>
                                    )}
                                </div>
                            ))}

                            {images.length < 9 && (
                                <button
                                    onClick={handleImageUpload}
                                    className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
                                >
                                    <Upload className="w-8 h-8 text-gray-400" />
                                    <span className="text-sm text-gray-500">Upload</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Variants */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="font-bold text-lg">Varian Produk</h2>
                                <p className="text-sm text-gray-500">Tambahkan varian jika produk memiliki ukuran, warna, dll.</p>
                            </div>
                            <button
                                onClick={addVariant}
                                className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Tambah Varian
                            </button>
                        </div>

                        {variants.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <Info className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p>Belum ada varian. Klik tombol di atas untuk menambahkan.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {variants.map((variant, index) => (
                                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Nama Varian</label>
                                                <input
                                                    type="text"
                                                    value={variant.name}
                                                    onChange={(e) => updateVariant(index, 'name', e.target.value)}
                                                    placeholder="Size, Color"
                                                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Nilai</label>
                                                <input
                                                    type="text"
                                                    value={variant.value}
                                                    onChange={(e) => updateVariant(index, 'value', e.target.value)}
                                                    placeholder="XL, Merah"
                                                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Harga</label>
                                                <input
                                                    type="number"
                                                    value={variant.price || ''}
                                                    onChange={(e) => updateVariant(index, 'price', parseInt(e.target.value) || 0)}
                                                    placeholder="0"
                                                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div className="flex items-end gap-2">
                                                <div className="flex-1">
                                                    <label className="block text-xs font-medium mb-1">Stok</label>
                                                    <input
                                                        type="number"
                                                        value={variant.stock || ''}
                                                        onChange={(e) => updateVariant(index, 'stock', parseInt(e.target.value) || 0)}
                                                        placeholder="0"
                                                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm"
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => removeVariant(index)}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Price & Stock */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-lg mb-4">Harga & Stok</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Harga <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="0"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Diskon (%)</label>
                                <input
                                    type="number"
                                    value={formData.discount}
                                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                    min="0"
                                    max="99"
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Stok <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    placeholder="0"
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Shipping */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-lg mb-4">Pengiriman</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Berat (gram) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                    placeholder="100"
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                />
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isFreeShipping}
                                    onChange={(e) => setFormData({ ...formData, isFreeShipping: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300"
                                />
                                <span className="text-sm">Gratis Ongkir</span>
                            </label>
                        </div>
                    </div>

                    {/* Condition */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="font-bold text-lg mb-4">Detail Lainnya</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Kondisi</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['NEW', 'USED'].map((cond) => (
                                        <button
                                            key={cond}
                                            onClick={() => setFormData({ ...formData, condition: cond })}
                                            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${formData.condition === cond
                                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                                                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            {cond === 'NEW' ? 'Baru' : 'Bekas'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.hasWarranty}
                                    onChange={(e) => setFormData({ ...formData, hasWarranty: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300"
                                />
                                <span className="text-sm">Ada Garansi</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
