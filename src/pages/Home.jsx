// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HerSection";
import SectionCard from "../components/SectionCard";
import CommunityBadge from "../components/CommunityBadge";
import PrimaryButton from "../components/PrimaryButton";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      {/* 🔶 Section 1: Hero Section */}
      <HeroSection
        title="Welcome to Muhurtham ❤️"
        subtitle="Find your soulmate within the Tamil community. 100% verified profiles, secure matchmaking, and meaningful connections."
        ctaLabel="Join Now"
        onCTAClick={() => navigate("/matches")}
      />

      {/* 🔶 Section 2: Why Muhurtham */}
      <section className="py-16 px-4 bg-white text-center">
        <h2 className="text-3xl font-bold text-deepPlum mb-6">Why Choose Muhurtham?</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <SectionCard
            title="Verified Profiles"
            description="Every profile is manually verified by our team to ensure authenticity and safety."
          />
          <SectionCard
            title="Tamil Community Focus"
            description="Dedicated exclusively to Tamil families, with community-based filtering like Iyer, Iyengar, Chettiar, etc."
          />
          <SectionCard
            title="Smart Interest & Chat"
            description="Send interests, get mutual matches, and start secure real-time conversations instantly."
          />
        </div>
      </section>

      {/* 🔶 Section 3: Top Communities */}
      <section className="py-16 px-4 bg-warmPeach/40 text-center">
        <h2 className="text-3xl font-bold text-deepPlum mb-6">Top Tamil Communities We Serve</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {["Iyer", "Iyengar", "Chettiar", "Pillai", "Mudaliar"].map((name) => (
            <CommunityBadge key={name} name={name} />
          ))}
        </div>
      </section>

      {/* 🔶 Section 4: Call To Action */}
      <section className="py-20 px-4 bg-deepPlum text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to begin your journey?</h2>
        <p className="max-w-xl mx-auto text-warmPeach">
          Sign up now and let us help you find a partner who shares your values, culture, and vision for life.
        </p>
        <div className="mt-6">
          <PrimaryButton label="Create Your Profile" onClick={() => navigate("/matches")} />
        </div>
      </section>
    </div>
  );
};

export default Home;
