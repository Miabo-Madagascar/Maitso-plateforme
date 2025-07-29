import React from 'react';
import HeroSection from '../components/home/HeroSection';
import MissionSection from '../components/home/MissionSection';
import OddSection from '../components/home/OddSection';
import ServiceSection from '../components/home/ServiceSection';
import NewsletterSection from '../components/home/NewsletterSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <MissionSection />
      <OddSection />
      <ServiceSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;