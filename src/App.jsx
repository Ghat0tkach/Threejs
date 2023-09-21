import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "./utils";
import "./index.css";


const taglines = [ "Our support, your development",
"ہمارا ساتھ، آپ کا وکس",
"અમારો સાથ, તમારું વિકાસ",
"আমাদের সাথে, আপনার উন্নতি",
"আমাৰ সাথে, আপোনাৰ উন্নতি",
"எங்கள் ஆதரம், உங்கள் வளர்ச்சி",
"మా మద్దతు, మీ అభివృద్ధి",
"ഞങ്ങളുടെ സഹായം, നിങ്ങളുടെ വളരെ",
"आमच्या सहाय्यात, तुमच्या विकासात"]; // Replace with your taglines

const ThreadsLanding = () => {
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  useEffect(() => {
    // Automatically change the tagline every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 3000);

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, []);

  const headerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    color: "#b0c3d9",
    fontWeight: "500",
    fontSize: "3.25rem",
    fontFamily: "Poppins, sans-serif",
    pointerEvents: "none",
  };

  if (window.innerWidth >= 768) {
    headerStyle.fontSize = "2.5rem";
  }

  const taglineStyle = {
    position: "absolute",
    top: "60%", // Adjust as needed
    left: "50%",
    transform: "translateX(-50%)",
    color: "#b0c3d9",
    fontWeight: "400", // Adjust as needed
    fontSize: "2.5rem", // Adjust as needed
    fontFamily: "Poppins, sans-serif", // Adjust as needed
    pointerEvents: "none",
  };

  return (
    <div className="relative" style={{ position: "relative" }}>
      <Canvas
        camera={{
          position: [10, -7.5, -5],
        }}
        className="bg-[#101010]"
        style={{ height: "100vh", background: "#101010" }}
      >
     
        <OrbitControls maxDistance={20} minDistance={10} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>
      <h1 style={headerStyle}>S A R T H I</h1>
      <h2 style={taglineStyle}>{taglines[currentTaglineIndex]}</h2>
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    ref.current.rotation.y = Math.sin(t * 0.05) * Math.PI; // Horizontal infinity rotation
    ref.current.rotation.x = Math.cos(t * 0.35) * Math.PI; // Vertical rotation (optional)

    // You can adjust the rotation speed and direction by changing the factors in sin and cos functions
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
      }
const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};

export default ThreadsLanding;