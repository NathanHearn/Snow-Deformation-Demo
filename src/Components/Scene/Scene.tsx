import { CameraControls, DragControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Snow } from "../Snow";

const SPIN_CUBE = true;

export function Scene() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current && SPIN_CUBE) {
      sphereRef.current.position.x = Math.cos(clock.getElapsedTime()) * 2;
      sphereRef.current.position.z = Math.sin(clock.getElapsedTime()) * 2;
    }
  });

  return (
    <>
      {/* Controls */}
      <CameraControls
        mouseButtons={{
          left: 0,
          middle: 2,
          wheel: 8,
          right: 1,
        }}
      />

      {/* Sphere */}
      <DragControls>
        <mesh ref={sphereRef} position={[0, 1, 0]}>
          <sphereGeometry args={[1, 254, 254]} />
          <meshBasicMaterial color="hotpink" />
        </mesh>
      </DragControls>

      <Snow />
    </>
  );
}
