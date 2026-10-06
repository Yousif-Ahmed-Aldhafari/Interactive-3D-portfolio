function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
    </>
  );
}

export default SceneLights;
