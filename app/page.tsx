import { Header, Footer } from '@/components/layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/home/CategorySection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { FlashSale } from '@/components/home/FlashSale';
import { BannerPromo } from '@/components/home/BannerPromo';
import { NewArrivals } from '@/components/home/NewArrivals';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <HeroSection />

        {/* Categories */}
        <CategorySection />

        {/* Flash Sale */}
        <section className="py-8 bg-gradient-to-r from-red-500 to-orange-500">
          <FlashSale />
        </section>

        {/* Featured Products */}
        <section className="py-12 container-app">
          <FeaturedProducts />
        </section>

        {/* Promo Banner */}
        <BannerPromo />

        {/* New Arrivals */}
        <section className="py-12 container-app">
          <NewArrivals />
        </section>
      </main>
      <Footer />
    </>
  );
}
