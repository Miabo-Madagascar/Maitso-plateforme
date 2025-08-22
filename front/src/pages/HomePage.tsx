import HeroSection from '../components/home/HeroSection';
import TeamSection from '../components/home/TeamSection';
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
      <TeamSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;