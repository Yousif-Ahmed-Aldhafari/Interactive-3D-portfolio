import SiteHeader from "@/components/layout/SiteHeader";
import HeroSection from "@/sections/HeroSection";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <SiteHeader />

      <main className="app-main">
        <HeroSection />
      </main>
    </div>
  );
}

export default App;
