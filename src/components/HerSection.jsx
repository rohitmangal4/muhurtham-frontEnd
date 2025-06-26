// src/components/HeroSection.jsx
import PrimaryButton from "./PrimaryButton";

const HeroSection = ({ title, subtitle, ctaLabel, onCTAClick }) => {
  return (
    <section className="bg-deepPlum text-white py-32 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
      <p className="text-lg max-w-2xl mx-auto text-warmPeach">{subtitle}</p>
      <div className="mt-6">
        <PrimaryButton label={ctaLabel} onClick={onCTAClick} />
      </div>
    </section>
  );
};

export default HeroSection;
