import { MotionConfig } from 'framer-motion'
import { UIProvider } from './context/ui'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrandMarquee from './components/BrandMarquee'
import Catalog from './components/Catalog'
import Stats from './components/Stats'
import WhyUs from './components/WhyUs'
import BrandStory from './components/BrandStory'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import ProductModal from './components/ProductModal'
import QuoteDrawer from './components/QuoteDrawer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <UIProvider>
        {/* Skip link cho người dùng bàn phím / screen reader */}
        <a
          href="#catalog"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-brand-500 focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white"
        >
          Bỏ qua tới danh sách sản phẩm
        </a>

        <Navbar />

        <main>
          <Hero />
          <BrandMarquee />
          <Catalog />
          <Stats />
          <WhyUs />
          <BrandStory />
          <Testimonials />
          <FAQ />
          <ContactCTA />
        </main>

        <Footer />
        <FloatingActions />
        <ProductModal />
        <QuoteDrawer />
      </UIProvider>
    </MotionConfig>
  )
}
