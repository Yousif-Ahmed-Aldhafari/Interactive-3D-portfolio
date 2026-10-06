import { PerspectiveCamera } from "@react-three/drei";

function SceneCamera() {
  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 0, 5]}
      fov={35}
      near={0.1}
      far={100}
    />
  );
}

export default SceneCamera;
