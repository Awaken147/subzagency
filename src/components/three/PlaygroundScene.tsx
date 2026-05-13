'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import React from 'react';

/* ============================================================
   Scene 1: Particle Field
   ============================================================ */
const PARTICLE_COUNT = 400;

const ParticleFieldScene = React.memo(function ParticleFieldScene() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const mouseRef = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const arr: { pos: THREE.Vector3; speed: number; offset: number }[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12
        ),
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  const colorArray = useMemo(() => {
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const green = new THREE.Color('#39ff14');
    const cyan = new THREE.Color('#00f0ff');
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const c = Math.random() > 0.5 ? green : cyan;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return colors;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    mouseRef.current.x = pointer.x * 2;
    mouseRef.current.y = pointer.y * 2;

    const time = clock.getElapsedTime();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      dummy.position.set(
        p.pos.x + Math.sin(time * p.speed + p.offset) * 0.3 + mouseRef.current.x * 0.3,
        p.pos.y + Math.cos(time * p.speed + p.offset) * 0.3 + mouseRef.current.y * 0.3,
        p.pos.z + Math.sin(time * p.speed * 0.5 + p.offset) * 0.2
      );
      dummy.scale.setScalar(0.03 + Math.sin(time * p.speed + p.offset) * 0.01);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 6, 6]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </sphereGeometry>
      <meshBasicMaterial
        vertexColors
        toneMapped={false}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
});

/* ============================================================
   Scene 2: 3D Geometry (Torus Knot)
   ============================================================ */
const GeometryScene = React.memo(function GeometryScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.x = t * 0.3;
    groupRef.current.rotation.y = t * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        <mesh>
          <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
          <meshBasicMaterial color="#39ff14" wireframe toneMapped={false} />
        </mesh>
        <mesh scale={1.02}>
          <torusKnotGeometry args={[1.5, 0.4, 64, 16]} />
          <meshBasicMaterial
            color="#00f0ff"
            wireframe
            toneMapped={false}
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    </Float>
  );
});

/* ============================================================
   Scene 3: Wave Motion
   ============================================================ */
const WAVE_SEGMENTS = 70;

const WaveScene = React.memo(function WaveScene() {
  const meshRef = useRef<THREE.Mesh>(null);

  const basePositions = useMemo(() => {
    const geo = new THREE.PlaneGeometry(12, 12, WAVE_SEGMENTS, WAVE_SEGMENTS);
    return geo.attributes.position.array.slice();
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < positions.length; i += 3) {
      const x = basePositions[i];
      const y = basePositions[i + 1];
      positions[i + 2] =
        Math.sin(x * 1.5 + time * 1.2) * 0.5 +
        Math.cos(y * 1.5 + time * 0.8) * 0.5 +
        Math.sin((x + y) * 0.8 + time) * 0.3;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[12, 12, WAVE_SEGMENTS, WAVE_SEGMENTS]} />
      <meshBasicMaterial
        color="#00f0ff"
        wireframe
        toneMapped={false}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
});

/* ============================================================
   Scene 4: Orbit System
   ============================================================ */
const OrbitScene = React.memo(function OrbitScene() {
  const groupRef = useRef<THREE.Group>(null);

  const orbits = useMemo(() => {
    const arr: { radius: number; speed: number; bodies: { angle: number; size: number; color: string }[] }[] = [];
    const colors = ['#39ff14', '#00f0ff', '#a855f7', '#39ff14'];
    for (let o = 0; o < 4; o++) {
      const radius = 2 + o * 1.2;
      const bodies: { angle: number; size: number; color: string }[] = [];
      const bodyCount = 4 + o * 2;
      for (let b = 0; b < bodyCount; b++) {
        bodies.push({
          angle: (b / bodyCount) * Math.PI * 2,
          size: 0.08 + Math.random() * 0.08,
          color: colors[(o + b) % colors.length],
        });
      }
      arr.push({ radius, speed: 0.5 - o * 0.08, bodies });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const time = clock.getElapsedTime();
    const children = groupRef.current.children[0]?.children;
    if (!children) return;

    let bodyIndex = 0;
    orbits.forEach((orbit) => {
      orbit.bodies.forEach((body) => {
        const bodyMesh = children[bodyIndex];
        if (bodyMesh) {
          const angle = body.angle + time * orbit.speed;
          bodyMesh.position.x = Math.cos(angle) * orbit.radius;
          bodyMesh.position.z = Math.sin(angle) * orbit.radius;
          bodyMesh.position.y = Math.sin(angle * 2 + time) * 0.3;
        }
        bodyIndex++;
      });
    });
  });

  return (
    <group ref={groupRef}>
      <group>
        {/* Central sphere */}
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshBasicMaterial color="#39ff14" toneMapped={false} />
        </mesh>
        <pointLight color="#39ff14" intensity={2} distance={15} />

        {/* Orbit bodies */}
        {orbits.map((orbit, oIdx) =>
          orbit.bodies.map((body, bIdx) => (
            <mesh key={`body-${oIdx}-${bIdx}`} position={[orbit.radius, 0, 0]}>
              <sphereGeometry args={[body.size, 8, 8]} />
              <meshBasicMaterial color={body.color} toneMapped={false} />
            </mesh>
          ))
        )}

        {/* Orbit rings */}
        {orbits.map((orbit, oIdx) => (
          <mesh key={`ring-${oIdx}`} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[orbit.radius - 0.01, orbit.radius + 0.01, 64]} />
            <meshBasicMaterial
              color="#39ff14"
              toneMapped={false}
              transparent
              opacity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
});

/* ============================================================
   Camera Controller
   ============================================================ */
function CameraRig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (pointer.y * 0.3 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ============================================================
   Scene Selector
   ============================================================ */
function SceneContent({ activeTab }: { activeTab: number }) {
  return (
    <>
      <CameraRig />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />

      <ambientLight intensity={0.2} />

      {activeTab === 0 && <ParticleFieldScene />}
      {activeTab === 1 && <GeometryScene />}
      {activeTab === 2 && <WaveScene />}
      {activeTab === 3 && <OrbitScene />}
    </>
  );
}

/* ============================================================
   Main PlaygroundScene Component
   ============================================================ */
interface PlaygroundSceneProps {
  activeTab: number;
}

export default function PlaygroundScene({ activeTab }: PlaygroundSceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 60 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ background: '#050510' }}
        dpr={[1, 1.5]}
      >
        <SceneContent activeTab={activeTab} />
      </Canvas>
    </div>
  );
}
