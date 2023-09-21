import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ThreeBackground = () => {
  const cameraRef = useRef();
  const sceneRef = useRef();

  return (
    <div className="background">
      <Canvas>
        <perspectiveCamera
          ref={cameraRef}
          position={[0, 0, 5]}
          fov={75}
          aspect={window.innerWidth / window.innerHeight}
          near={0.1}
          far={1000}
        />
        <scene ref={sceneRef}>
          {/* Add your 3D objects here */}
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={"#FF5733"} />
          </mesh>
        </scene>
        {/* Animation logic for the 3D background */}
        <ThreeBackgroundAnimation cameraRef={cameraRef} sceneRef={sceneRef} />
      </Canvas>
    </div>
  );
};

const ThreeBackgroundAnimation = ({ cameraRef, sceneRef }) => {
  // Animation logic for the 3D background
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    cameraRef.current.position.z = Math.sin(t) * 5;
    sceneRef.current.rotation.x = Math.sin(t / 2);
    sceneRef.current.rotation.y = Math.sin(t / 2);
  });

  return null; // No rendering needed for this component
};

export default ThreeBackground;
