"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Environment, OrbitControls, Html } from "@react-three/drei"
import type * as THREE from "three"

// Typewriter effect component
function TypewriterText() {
  const [text, setText] = useState("")
  const fullText = "We craft performant, animated, and futuristic web experiences."

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-green-400 font-mono text-xs leading-relaxed">
      <div className="mb-1">$ npm run dev</div>
      <div className="mb-1 text-cyan-400">{"> Ready on http://localhost:3000"}</div>
      <div className="mb-2 text-yellow-400">{"> Building amazing experiences..."}</div>
      <div className="text-white">
        {text}
        <span className="animate-pulse">|</span>
      </div>
    </div>
  )
}

// 3D Laptop Model Component
function LaptopModel() {
  const laptopRef = useRef<THREE.Group>(null)
  const { camera, mouse } = useThree()

  useFrame((state) => {
    if (laptopRef.current) {
      // Floating animation
      laptopRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1

      // Mouse-based rotation
      laptopRef.current.rotation.y = mouse.x * 0.1
      laptopRef.current.rotation.x = mouse.y * 0.05
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={laptopRef} position={[0, 0, 0]}>
        {/* Laptop Base */}
        <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[3, 0.1, 2]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Laptop Screen */}
        <mesh position={[0, 0.5, -0.9]} rotation={[-0.1, 0, 0]} castShadow>
          <boxGeometry args={[2.8, 1.8, 0.05]} />
          <meshStandardMaterial color="#000" />
        </mesh>

        {/* Screen Content */}
        <Html position={[0, 0.5, -0.87]} rotation={[-0.1, 0, 0]} transform occlude distanceFactor={1.2}>
          <div className="w-64 h-40 bg-black p-3 rounded overflow-hidden">
            <TypewriterText />
          </div>
        </Html>

        {/* Screen Glow */}
        <mesh position={[0, 0.5, -0.86]} rotation={[-0.1, 0, 0]}>
          <planeGeometry args={[2.4, 1.4]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

export default function Hero3D() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="h-96 lg:h-[500px] relative">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }} onCreated={() => setIsLoaded(true)}>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          color="#00ffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0080ff" />

        <LaptopModel />

        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
      </Canvas>

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-cyan-400">Loading 3D Scene...</div>
        </div>
      )}
    </div>
  )
}
