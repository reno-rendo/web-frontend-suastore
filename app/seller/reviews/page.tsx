'use client';

import { useState } from 'react';
import {
    Star,
    Search,
    Filter,
    MessageSquare,
    ThumbsUp,
    ChevronDown,
    Image as ImageIcon
} from 'lucide-react';

// Mock reviews data
const reviews = [
    {
        id: 1,
        customer: { name: 'John Doe', avatar: null },
        product: 'iPhone 15 Pro Max 256GB',
        rating: 5,
        comment: 'Produk original 100%, pengiriman cepat, packaging rapi dan aman. Sangat recommended!',
        images: [],
        date: '23 Des 2024',
        replied: true,
        reply: 'Terima kasih atas ulasannya! Senang bisa melayani Anda.',
        helpful: 12
    },
    {
        id: 2,
        customer: { name: 'Jane Smith', avatar: null },
        product: 'MacBook Pro M3 14"',
        rating: 5,
        comment: 'Barang sesuai deskripsi, seller ramah dan responsif. Makasih ya!',
        images: ['/review1.jpg', '/review2.jpg'],
        date: '22 Des 2024',
        replied: false,
        reply: null,
        helpful: 8
    },
    {
        id: 3,
        customer: { name: 'Ahmad Yusuf', avatar: null },
        product: 'AirPods Pro 2',
        rating: 4,
        comment: 'Kualitas bagus, suara jernih. Cuma box agak penyok sedikit tapi produknya aman.',
        images: [],
        date: '20 Des 2024',
        replied: true,
        reply: 'Mohon maaf atas ketidaknyamanannya. Terima kasih feedbacknya!',
        helpful: 5
    },
    {
        id: 4,
        customer: { name: 'Siti Aminah', avatar: null },
        product: 'iPad Pro 12.9"',
        rating: 3,
        comment: 'Produk bagus tapi pengiriman agak lama. Semoga next lebih cepat.',
        images: [],
        date: '18 Des 2024',
        replied: false,
        reply: null,
        helpful: 2
    },
];

const ratingTabs = [
    { id: 'all', label: 'Semua', count: 15420 },
    { id: '5', label: '5 Bintang', count: 12850 },
    { id: '4', label: '4 Bintang', count: 1850 },
    { id: '3', label: '3 Bintang', count: 450 },
    { id: '2', label: '2 Bintang', count: 170 },
    { id: '1', label: '1 Bintang', count: 100 },
];

export default function SellerReviewsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');

    const filteredReviews = reviews.filter(review => {
        const matchesSearch = review.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.comment.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRating = activeTab === 'all' || review.rating.toString() === activeTab;
        return matchesSearch && matchesRating;
    });

    const handleReply = (reviewId: number) => {
        // Mock - in real app this would send to API
        console.log('Reply to review', reviewId, replyText);
        setReplyingTo(null);
        setReplyText('');
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Ulasan Produk</h1>
                    <p className="text-gray-500">Kelola ulasan dari pembeli</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 rounded-xl">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">4.9</span>
                        <span className="text-gray-500 text-sm">(15,420 ulasan)</span>
                    </div>
                </div>
            </div>

            {/* Rating Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {ratingTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeTab === tab.id
                                ? 'bg-primary-500 text-white'
                                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                            }`}
                    >
                        {tab.id !== 'all' && <Star className="w-4 h-4 fill-current" />}
                        {tab.label}
                        <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'
                            }`}>
                            {tab.count.toLocaleString()}
                        </span>
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari ulasan..."
                        className="w-full pl-12 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-transparent"
                    />
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {filteredReviews.map((review) => (
                    <div key={review.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                        {/* Review Header */}
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold">
                                        {review.customer.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{review.customer.name}</p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500">{review.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                    {review.product}
                                </span>
                            </div>
                        </div>

                        {/* Review Content */}
                        <div className="p-4">
                            <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>

                            {/* Review Images */}
                            {review.images.length > 0 && (
                                <div className="flex gap-2 mt-3">
                                    {review.images.map((img, i) => (
                                        <div key={i} className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                            <ImageIcon className="w-6 h-6 text-gray-400" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Helpful */}
                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                <button className="flex items-center gap-1 hover:text-primary-600">
                                    <ThumbsUp className="w-4 h-4" />
                                    {review.helpful} terbantu
                                </button>
                            </div>
                        </div>

                        {/* Reply Section */}
                        {review.replied && review.reply && (
                            <div className="mx-4 mb-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <MessageSquare className="w-4 h-4 text-primary-600" />
                                    <span className="font-medium text-primary-600">Balasan Anda</span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">{review.reply}</p>
                            </div>
                        )}

                        {/* Reply Form */}
                        {replyingTo === review.id && (
                            <div className="mx-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Tulis balasan Anda..."
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl resize-none"
                                />
                                <div className="flex justify-end gap-2 mt-3">
                                    <button
                                        onClick={() => setReplyingTo(null)}
                                        className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-600"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={() => handleReply(review.id)}
                                        className="btn-primary px-4 py-2 rounded-lg"
                                    >
                                        Kirim Balasan
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        {!review.replied && replyingTo !== review.id && (
                            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
                                <button
                                    onClick={() => setReplyingTo(review.id)}
                                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-2"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Balas Ulasan
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredReviews.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm">
                    <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-bold mb-2">Tidak ada ulasan</h3>
                    <p className="text-gray-500">Belum ada ulasan dengan filter ini.</p>
                </div>
            )}
        </div>
    );
}
