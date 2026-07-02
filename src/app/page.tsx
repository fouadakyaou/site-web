import { Navbar, Footer } from '@/components/layout'
import {
  Hero,
  FeaturedCollections,
  FeaturedProducts,
  PromotionalBanner,
  NewArrivals,
  BestSellers,
  ReviewsSection,
  InstagramGallery,
  Newsletter,
} from '@/components/home'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedCollections />
        <FeaturedProducts />
        <PromotionalBanner />
        <NewArrivals />
        <BestSellers />
        <ReviewsSection />
        <InstagramGallery />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
