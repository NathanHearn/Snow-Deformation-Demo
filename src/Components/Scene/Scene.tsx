import { CameraControls, DragControls } from "@react-three/drei";
import { useDepthBuffer } from "../../Hooks";
import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { SnowMaterial } from "../../Materials/SnowMaterial";

const SPIN_CUBE = true;

export function Scene() {
  const orthoCamRef = useRef<THREE.OrthographicCamera>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const groundRef = useRef<THREE.PlaneGeometry>(null);

  const depthBuffer = useDepthBuffer({
    size: 1024,
    cameraRef: orthoCamRef,
  });

  useLayoutEffect(() => {
    orthoCamRef.current?.lookAt(0, 0, 0);
    groundRef.current?.rotateX(-Math.PI * 0.5);
  });

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

      {/* Light */}
      {/* <ambientLight intensity={4} /> */}

      {/* Ground */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[8, 8, 1000, 1000]} ref={groundRef} />

        {/* <TestMaterial /> */}
        <SnowMaterial depthTexture={depthBuffer.depthTexture} />
      </mesh>

      {/* Debug */}
      <mesh position={[0, 4, 0]} rotation={[Math.PI * -0.5, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial map={depthBuffer.depthTexture} />
      </mesh>

      <orthographicCamera
        ref={orthoCamRef}
        position={[0, -0.1, 0]}
        args={[-4, 4, 4, -4, 0.1, 1]}
      />
    </>
  );
}
