"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Html } from "@react-three/drei";
import * as THREE from "three";

/* ─── Types ─────────────────────────────────────────────────── */
type Vec3 = [number, number, number];

/* ─── Node ──────────────────────────────────────────────────── */
function Node({ position, size = 0.055, glow = false }: { position: Vec3; size?: number; glow?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (meshRef.current) meshRef.current.rotation.y += dt * 0.4;
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial
        color={glow ? "#A5B4FC" : "#6366F1"}
        emissive={glow ? "#818CF8" : "#4338CA"}
        emissiveIntensity={glow ? 2.2 : 1.2}
        roughness={0.1}
        metalness={0.4}
        transparent
        opacity={glow ? 1 : 0.85}
      />
    </mesh>
  );
}

/* ─── Connections ───────────────────────────────────────────── */
function Connections({ nodes }: { nodes: Vec3[] }) {
  const lines = useMemo(() => {
    const out: { pts: THREE.Vector3[]; opacity: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(
          nodes[i][0] - nodes[j][0],
          nodes[i][1] - nodes[j][1],
          nodes[i][2] - nodes[j][2],
        );
        if (d < 2.4) {
          out.push({
            pts: [new THREE.Vector3(...nodes[i]), new THREE.Vector3(...nodes[j])],
            opacity: (1 - d / 2.4) * 0.22,
          });
        }
      }
    }
    return out;
  }, [nodes]);

  const lineObjects = useMemo(() =>
    lines.map((l) => {
      const geo = new THREE.BufferGeometry().setFromPoints(l.pts);
      const mat = new THREE.LineBasicMaterial({ color: "#818CF8", transparent: true, opacity: l.opacity });
      return new THREE.Line(geo, mat);
    }),
    [lines]
  );

  return (
    <>
      {lineObjects.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}
    </>
  );
}

/* ─── Central orb ───────────────────────────────────────────── */
function CentralOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((t) => {
    if (ref.current) ref.current.rotation.z = t.clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <MeshDistortMaterial
          color="#6366F1"
          emissive="#4338CA"
          emissiveIntensity={1.8}
          distort={0.35}
          speed={2}
          roughness={0.08}
          metalness={0.55}
          transparent
          opacity={0.95}
        />
      </mesh>
    </Float>
  );
}

/* ─── Label node (featured) ─────────────────────────────────── */
function LabelNode({ position, label }: { position: Vec3; label: string }) {
  return (
    <group position={position}>
      <Node position={[0, 0, 0]} size={0.1} glow />
      <Html position={[0, -0.28, 0]} center distanceFactor={6}>
        <span style={{
          color: "#C7D2FE",
          fontSize: "11px",
          fontFamily: "Inter, sans-serif",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}>
          {label}
        </span>
      </Html>
    </group>
  );
}

/* ─── Network group ─────────────────────────────────────────── */
function Network() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const bgNodes: Vec3[] = useMemo(() => {
    const arr: Vec3[] = [];
    for (let i = 0; i < 52; i++) {
      arr.push([
        (Math.random() - .5) * 9,
        (Math.random() - .5) * 5.5,
        (Math.random() - .5) * 4,
      ]);
    }
    return arr;
  }, []);

  const featured: { pos: Vec3; label: string }[] = [
    { pos: [ 2.2,  0.4, -0.5], label: "The Compass"       },
    { pos: [-2.0,  0.8,  0.6], label: "The Board of Nine" },
    { pos: [ 0.2, -1.6, -0.3], label: "The Summit"        },
  ];

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - .5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - .5) * 2;
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.045;
    groupRef.current.rotation.x += (mouse.current.y * 0.25 - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y += (mouse.current.x * 0.15 - groupRef.current.rotation.y) * 0.015;
  });

  return (
    <group ref={groupRef}>
      <Connections nodes={[...bgNodes, ...featured.map(f => f.pos)]} />
      {bgNodes.map((p, i) => <Node key={i} position={p} />)}
      {featured.map((f) => <LabelNode key={f.label} position={f.pos} label={f.label} />)}
      <CentralOrb />
    </group>
  );
}

/* ─── Lights ─────────────────────────────────────────────────── */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 4]}  intensity={3}   color="#818CF8" />
      <pointLight position={[-5, -4, -4]} intensity={1.5} color="#4338CA" />
      <pointLight position={[0, 0, 3]}  intensity={1.2} color="#A5B4FC" />
    </>
  );
}

/* ─── Export ─────────────────────────────────────────────────── */
export default function NetworkScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 58 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Lights />
      <Network />
    </Canvas>
  );
}
