import { useEffect, useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import '../styles/app.css'
// import Watch3DModel from './Watch3DModel';

function Watch() {
  try {
    const obj = useLoader(OBJLoader, '/models/watch3d.obj');
    return (
      <primitive 
        object={obj} 
        scale={1.5}
        position={[0, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
    );
  } catch (error) {
    console.error('Error loading 3D model:', error);
    return null;
  }
}

// Loading component
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
}

const Model3d = () => {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (error) {
    return <div>Error loading model: {error.message}</div>;
  }

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Canvas 
        camera={{ 
          position: [3, 2, 5],
          fov: 45,
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={<LoadingFallback />}>
          <Watch />
          <Environment 
            files="/assets/studio_small_09_2k.hdr"
            background={false}
            blur={0.5}
            intensity={1.5}
          />
        </Suspense>
        <OrbitControls 
          minDistance={2}
          maxDistance={10}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
};

export default Model3d;