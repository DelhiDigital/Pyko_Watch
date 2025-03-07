import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import '../styles/app.css'
// import Watch3DModel from './Watch3DModel';
const Model3d = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents SSR errors in Hydrogen

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh>
        
        <boxGeometry />
        <meshStandardMaterial color="red"  />
       
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default Model3d;
