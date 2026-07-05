import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import StatsSection from '../components/StatsSection'
import ModelsSection from '../components/ModelsSection'
import RulesSection from '../components/RulesSection'
import HowItWorks from '../components/HowItWorks'
import SuccessStories from '../components/SuccessStories'
import FAQSection from '../components/FAQSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div style={{ backgroundColor: '#0A0E17', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ModelsSection />
      <RulesSection />
      <HowItWorks />
      <SuccessStories />
      <FAQSection />
      <Footer />
    </div>
  )
}

export default Home