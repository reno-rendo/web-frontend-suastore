import Link from 'next/link';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    MapPin,
    Phone,
    Mail,
    CreditCard,
    Truck,
    Shield,
    Headphones,
} from 'lucide-react';

const footerLinks = {
    suastore: [
        { label: 'Tentang Kami', href: '/about' },
        { label: 'Karir', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Syarat & Ketentuan', href: '/terms' },
        { label: 'Kebijakan Privasi', href: '/privacy' },
    ],
    bantuan: [
        { label: 'Pusat Bantuan', href: '/help' },
        { label: 'Cara Belanja', href: '/help/how-to-buy' },
        { label: 'Cara Jual', href: '/help/how-to-sell' },
        { label: 'Pembayaran', href: '/help/payment' },
        { label: 'Pengembalian', href: '/help/return' },
    ],
    jualDiSuastore: [
        { label: 'Mulai Berjualan', href: '/seller/register' },
        { label: 'Seller Center', href: '/seller' },
        { label: 'Panduan Seller', href: '/seller/guide' },
        { label: 'Biaya & Komisi', href: '/seller/fees' },
    ],
};

const paymentMethods = [
    'BCA', 'BNI', 'BRI', 'Mandiri', 'VISA', 'Mastercard', 'GoPay', 'OVO', 'DANA', 'ShopeePay',
];

const shippingPartners = [
    'JNE', 'TIKI', 'SiCepat', 'J&T', 'AnterAja', 'Ninja', 'Pos Indonesia',
];

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Features bar */}
            <div className="border-b border-gray-800">
                <div className="container-app py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
                                <Truck className="w-6 h-6 text-primary-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">Gratis Ongkir</h4>
                                <p className="text-sm text-gray-400">Min. belanja Rp50rb</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
                                <Shield className="w-6 h-6 text-primary-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">100% Original</h4>
                                <p className="text-sm text-gray-400">Produk asli terjamin</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
                                <CreditCard className="w-6 h-6 text-primary-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">Pembayaran Aman</h4>
                                <p className="text-sm text-gray-400">Banyak metode</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
                                <Headphones className="w-6 h-6 text-primary-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">CS 24/7</h4>
                                <p className="text-sm text-gray-400">Siap membantu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div className="container-app py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand & Contact */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="text-xl font-display font-bold text-white">
                                SuaStore
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-sm">
                            Platform e-commerce terpercaya dengan jutaan produk berkualitas dari seller terverifikasi di seluruh Indonesia.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-primary-400" />
                                <span>Jakarta, Indonesia</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary-400" />
                                <span>0800-123-4567</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary-400" />
                                <span>help@suastore.id</span>
                            </div>
                        </div>
                    </div>

                    {/* SuaStore links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">SuaStore</h3>
                        <ul className="space-y-3">
                            {footerLinks.suastore.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Bantuan</h3>
                        <ul className="space-y-3">
                            {footerLinks.bantuan.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Seller links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Jual di SuaStore</h3>
                        <ul className="space-y-3">
                            {footerLinks.jualDiSuastore.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Payment & Shipping */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold text-white mb-4">Metode Pembayaran</h4>
                            <div className="flex flex-wrap gap-2">
                                {paymentMethods.map((method) => (
                                    <span
                                        key={method}
                                        className="px-3 py-1 bg-gray-800 rounded-md text-sm text-gray-400"
                                    >
                                        {method}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Partner Pengiriman</h4>
                            <div className="flex flex-wrap gap-2">
                                {shippingPartners.map((partner) => (
                                    <span
                                        key={partner}
                                        className="px-3 py-1 bg-gray-800 rounded-md text-sm text-gray-400"
                                    >
                                        {partner}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800">
                <div className="container-app py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} SuaStore. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
