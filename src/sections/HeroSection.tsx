import ExperienceCanvas from "@/three/scene/ExperienceCanvas";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">Interactive 3D Portfolio</p>
          <h1 id="hero-title">
            Building digital experiences with precision and personality.
          </h1>
          <p className="hero__description">
            A personal portfolio combining thoughtful interface design,
            technical craft, and a real-time 3D character that responds
            naturally to the visitor.
          </p>
          <div className="hero__meta">
            <span>Available for selected opportunities</span>
            <span>Based on craft, interaction, and quality</span>
          </div>
        </div>

        <div className="hero__visual">
          <div
            className="hero__stage"
            aria-label="Reserved area for the interactive 3D character"
          >
            <ExperienceCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
