import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Statistics from '../components/Statistics';
import Categories from '../components/Categories';
import HowItWorks from '../components/HowItWorks';
import FeaturedSchemes from '../components/FeaturedSchemes';
import AIAssistant from '../components/AIAssistant';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import SchemeModal from '../components/SchemeModal';

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  const handleSelectCategory = (catName) => {
    setActiveCategoryFilter(catName);
    const schemesElem = document.getElementById('schemes');
    if (schemesElem) {
      schemesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenChat = () => {
    const aiElem = document.getElementById('ai-assistant');
    if (aiElem) {
      aiElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-teal-500 selection:text-white flex flex-col">
      {/* 1. Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero onOpenFindSchemes={() => navigate('/register')} />

        {/* 3. Statistics Section */}
        <Statistics />

        {/* 4. Government Scheme Categories */}
        <Categories onSelectCategory={handleSelectCategory} />

        {/* 5. How It Works */}
        <HowItWorks onOpenFindSchemes={() => navigate('/register')} />

        {/* 6. Featured Schemes */}
        <FeaturedSchemes 
          onSelectScheme={(scheme) => setSelectedScheme(scheme)}
          activeCategoryFilter={activeCategoryFilter}
        />

        {/* 7. AI Assistant Section */}
        <AIAssistant onOpenChatModal={handleOpenChat} />

        {/* 8. Call-to-Action Section */}
        <CTASection onOpenAuth={(mode) => navigate(mode === 'login' ? '/login' : '/register')} />
      </main>

      {/* 9. Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Modal for Scheme Details */}
      {selectedScheme && (
        <SchemeModal 
          scheme={selectedScheme} 
          onClose={() => setSelectedScheme(null)} 
        />
      )}
    </div>
  );
}
