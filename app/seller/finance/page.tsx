'use client';

import { useState } from 'react';
import {
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    DollarSign,
    Clock,
    Check,
    ChevronDown,
    Building2,
    CreditCard
} from 'lucide-react';

// Mock financial data
const balance = {
    available: 45800000,
    pending: 12500000,
    withdrawn: 125000000,
};

const transactions = [
    { id: 1, type: 'income', description: 'Pesanan INV/20241223/001', amount: 22499100, date: '23 Des 2024', status: 'completed' },
    { id: 2, type: 'income', description: 'Pesanan INV/20241222/003', amount: 37998000, date: '22 Des 2024', status: 'pending' },
    { id: 3, type: 'withdrawal', description: 'Penarikan ke BCA ****1234', amount: -10000000, date: '20 Des 2024', status: 'completed' },
    { id: 4, type: 'income', description: 'Pesanan INV/20241218/008', amount: 3999000, date: '18 Des 2024', status: 'completed' },
    { id: 5, type: 'withdrawal', description: 'Penarikan ke BCA ****1234', amount: -15000000, date: '15 Des 2024', status: 'completed' },
];

const bankAccounts = [
    { id: 1, bank: 'BCA', number: '****1234', name: 'John Doe', isDefault: true },
    { id: 2, bank: 'Mandiri', number: '****5678', name: 'John Doe', isDefault: false },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(Math.abs(price));
};

export default function SellerFinancePage() {
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [selectedBank, setSelectedBank] = useState(1);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Keuangan</h1>
                    <p className="text-gray-500">Kelola saldo dan penarikan dana</p>
                </div>
                <button
                    onClick={() => setShowWithdrawModal(true)}
                    className="btn-primary px-6 py-2.5 rounded-xl flex items-center gap-2 justify-center"
                >
                    <ArrowUpRight className="w-5 h-5" />
                    Tarik Dana
                </button>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <span className="font-medium">Saldo Tersedia</span>
                    </div>
                    <p className="text-3xl font-bold">{formatPrice(balance.available)}</p>
                    <p className="text-sm text-white/70 mt-2">Dapat ditarik kapan saja</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                            <Clock className="w-6 h-6 text-yellow-500" />
                        </div>
                        <span className="font-medium">Saldo Tertahan</span>
                    </div>
                    <p className="text-2xl font-bold">{formatPrice(balance.pending)}</p>
                    <p className="text-sm text-gray-500 mt-2">Menunggu pesanan selesai</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <Check className="w-6 h-6 text-green-500" />
                        </div>
                        <span className="font-medium">Total Penarikan</span>
                    </div>
                    <p className="text-2xl font-bold">{formatPrice(balance.withdrawn)}</p>
                    <p className="text-sm text-gray-500 mt-2">Sepanjang waktu</p>
                </div>
            </div>

            {/* Bank Accounts */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg">Rekening Bank</h2>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        + Tambah Rekening
                    </button>
                </div>
                <div className="space-y-3">
                    {bankAccounts.map((account) => (
                        <div
                            key={account.id}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 ${account.isDefault
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-gray-500" />
                                </div>
                                <div>
                                    <p className="font-semibold">{account.bank}</p>
                                    <p className="text-sm text-gray-500">{account.number} - {account.name}</p>
                                </div>
                            </div>
                            {account.isDefault && (
                                <span className="px-3 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-full">
                                    Utama
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="font-bold text-lg">Riwayat Transaksi</h2>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                    }`}>
                                    {tx.type === 'income' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-medium">{tx.description}</p>
                                    <p className="text-sm text-gray-500">{tx.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {tx.amount > 0 ? '+' : ''}{formatPrice(tx.amount)}
                                </p>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${tx.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                    }`}>
                                    {tx.status === 'completed' ? 'Selesai' : 'Pending'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Withdraw Modal */}
            {showWithdrawModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6">
                        <h2 className="text-xl font-bold mb-6">Tarik Dana</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Saldo Tersedia</label>
                                <p className="text-2xl font-bold text-primary-600">{formatPrice(balance.available)}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Jumlah Penarikan</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                                    <input
                                        type="number"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        placeholder="0"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-lg"
                                    />
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {[10000000, 20000000, 45800000].map((amount) => (
                                        <button
                                            key={amount}
                                            onClick={() => setWithdrawAmount(amount.toString())}
                                            className="px-3 py-1 border border-gray-200 dark:border-gray-600 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            {formatPrice(amount)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Rekening Tujuan</label>
                                <select
                                    value={selectedBank}
                                    onChange={(e) => setSelectedBank(Number(e.target.value))}
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl"
                                >
                                    {bankAccounts.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.bank} - {account.number}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowWithdrawModal(false)}
                                className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Batal
                            </button>
                            <button className="flex-1 btn-primary px-4 py-3 rounded-xl">
                                Tarik Dana
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
