import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import "./ExperienceCanvas.css";

function ExperienceCanvas() {
  return (
    <Canvas
      className="experience-canvas"
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      fallback={
        <div className="experience-canvas__fallback">
          Interactive 3D is unavailable in this browser.
        </div>
      }
    >
      <Scene />
    </Canvas>
  );
}

export default ExperienceCanvas;
