'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Plus,
    MapPin,
    Home,
    Building,
    Phone,
    Edit,
    Trash2,
    Check,
    X
} from 'lucide-react';

// Mock addresses data
const initialAddresses = [
    {
        id: 1,
        label: 'Rumah',
        name: 'John Doe',
        phone: '081234567890',
        address: 'Jl. Sudirman No. 123, RT 05/RW 03',
        city: 'Jakarta Selatan',
        province: 'DKI Jakarta',
        postalCode: '12190',
        isDefault: true,
    },
    {
        id: 2,
        label: 'Kantor',
        name: 'John Doe',
        phone: '081234567891',
        address: 'Gedung Wisma BNI Lt. 5, Jl. Jenderal Sudirman Kav 1',
        city: 'Jakarta Pusat',
        province: 'DKI Jakarta',
        postalCode: '10220',
        isDefault: false,
    },
];

const provinces = ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Banten'];
const cities: Record<string, string[]> = {
    'DKI Jakarta': ['Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Barat', 'Jakarta Timur', 'Jakarta Utara'],
    'Jawa Barat': ['Bandung', 'Bogor', 'Bekasi', 'Depok', 'Cirebon'],
    'Jawa Tengah': ['Semarang', 'Solo', 'Magelang', 'Salatiga'],
    'Jawa Timur': ['Surabaya', 'Malang', 'Sidoarjo', 'Gresik'],
    'Banten': ['Tangerang', 'Tangerang Selatan', 'Serang', 'Cilegon'],
};

export default function AddressPage() {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [showModal, setShowModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState<typeof initialAddresses[0] | null>(null);
    const [formData, setFormData] = useState({
        label: 'Rumah',
        name: '',
        phone: '',
        address: '',
        province: '',
        city: '',
        postalCode: '',
    });

    const openAddModal = () => {
        setEditingAddress(null);
        setFormData({
            label: 'Rumah',
            name: '',
            phone: '',
            address: '',
            province: '',
            city: '',
            postalCode: '',
        });
        setShowModal(true);
    };

    const openEditModal = (address: typeof initialAddresses[0]) => {
        setEditingAddress(address);
        setFormData({
            label: address.label,
            name: address.name,
            phone: address.phone,
            address: address.address,
            province: address.province,
            city: address.city,
            postalCode: address.postalCode,
        });
        setShowModal(true);
    };

    const handleSave = () => {
        if (editingAddress) {
            setAddresses(addresses.map(a => a.id === editingAddress.id ? { ...a, ...formData } : a));
        } else {
            const newAddress = {
                id: Date.now(),
                ...formData,
                isDefault: addresses.length === 0,
            };
            setAddresses([...addresses, newAddress]);
        }
        setShowModal(false);
    };

    const handleDelete = (id: number) => {
        setAddresses(addresses.filter(a => a.id !== id));
    };

    const setAsDefault = (id: number) => {
        setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/profile" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-xl font-bold">Alamat Pengiriman</h1>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="btn-primary px-4 py-2 rounded-xl flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Tambah Alamat</span>
                    </button>
                </div>
            </header>

            {/* Address List */}
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
                {addresses.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center">
                        <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-bold mb-2">Belum ada alamat</h3>
                        <p className="text-gray-500 mb-4">Tambahkan alamat pengiriman untuk mempermudah checkout</p>
                        <button
                            onClick={openAddModal}
                            className="btn-primary px-6 py-2 rounded-xl inline-flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Alamat
                        </button>
                    </div>
                ) : (
                    addresses.map((address) => (
                        <div
                            key={address.id}
                            className={`bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border-2 ${address.isDefault ? 'border-primary-500' : 'border-transparent'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${address.label === 'Rumah'
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-purple-100 text-purple-600'
                                            }`}>
                                            {address.label === 'Rumah' ? <Home className="w-3 h-3 inline mr-1" /> : <Building className="w-3 h-3 inline mr-1" />}
                                            {address.label}
                                        </span>
                                        {address.isDefault && (
                                            <span className="px-2 py-0.5 bg-primary-100 text-primary-600 text-xs font-medium rounded">
                                                Utama
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="font-bold">{address.name}</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                        <Phone className="w-3 h-3" />
                                        {address.phone}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                        {address.address}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {address.city}, {address.province} {address.postalCode}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => openEditModal(address)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                                    >
                                        <Edit className="w-4 h-4 text-gray-500" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(address.id)}
                                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                        disabled={address.isDefault}
                                    >
                                        <Trash2 className={`w-4 h-4 ${address.isDefault ? 'text-gray-300' : 'text-red-500'}`} />
                                    </button>
                                </div>
                            </div>

                            {!address.isDefault && (
                                <button
                                    onClick={() => setAsDefault(address.id)}
                                    className="mt-4 text-primary-600 text-sm font-medium hover:underline"
                                >
                                    Jadikan Alamat Utama
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                {editingAddress ? 'Edit Alamat' : 'Tambah Alamat Baru'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Label */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Label Alamat</label>
                                <div className="flex gap-2">
                                    {['Rumah', 'Kantor'].map((label) => (
                                        <button
                                            key={label}
                                            onClick={() => setFormData({ ...formData, label })}
                                            className={`flex-1 px-4 py-2 rounded-xl border flex items-center justify-center gap-2 ${formData.label === label
                                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                                                    : 'border-gray-200 dark:border-gray-600'
                                                }`}
                                        >
                                            {label === 'Rumah' ? <Home className="w-4 h-4" /> : <Building className="w-4 h-4" />}
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Nama Penerima</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Nama lengkap penerima"
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Nomor HP</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="08xxxxxxxxxx"
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Alamat Lengkap</label>
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="Nama jalan, nomor rumah, RT/RW"
                                    rows={2}
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl resize-none"
                                />
                            </div>

                            {/* Province & City */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Provinsi</label>
                                    <select
                                        value={formData.province}
                                        onChange={(e) => setFormData({ ...formData, province: e.target.value, city: '' })}
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                    >
                                        <option value="">Pilih Provinsi</option>
                                        {provinces.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Kota</label>
                                    <select
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                        disabled={!formData.province}
                                    >
                                        <option value="">Pilih Kota</option>
                                        {formData.province && cities[formData.province]?.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Postal Code */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Kode Pos</label>
                                <input
                                    type="text"
                                    value={formData.postalCode}
                                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                    placeholder="12345"
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 btn-primary px-4 py-3 rounded-xl"
                            >
                                {editingAddress ? 'Simpan' : 'Tambah Alamat'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
