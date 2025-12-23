import Link from 'next/link';

export function BannerPromo() {
    return (
        <section className="py-8 container-app">
            <div className="grid md:grid-cols-2 gap-4">
                {/* Banner 1 */}
                <Link
                    href="/promo/gadget"
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 p-6 md:p-8 group"
                >
                    <div className="relative z-10">
                        <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                            GADGET FEST
                        </span>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                            Diskon Gadget
                        </h3>
                        <p className="text-white/80 mb-4">
                            Hingga 50% untuk smartphone & laptop
                        </p>
                        <span className="inline-flex items-center text-white font-semibold group-hover:underline">
                            Belanja Sekarang →
                        </span>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full" />
                    <div className="absolute -right-5 -top-5 w-24 h-24 bg-white/10 rounded-full" />
                </Link>

                {/* Banner 2 */}
                <Link
                    href="/promo/fashion"
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 p-6 md:p-8 group"
                >
                    <div className="relative z-10">
                        <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                            FASHION WEEK
                        </span>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                            Koleksi Terbaru
                        </h3>
                        <p className="text-white/80 mb-4">
                            Trend fashion terkini dengan harga terbaik
                        </p>
                        <span className="inline-flex items-center text-white font-semibold group-hover:underline">
                            Lihat Koleksi →
                        </span>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full" />
                    <div className="absolute -right-5 -top-5 w-24 h-24 bg-white/10 rounded-full" />
                </Link>
            </div>
        </section>
    );
}
