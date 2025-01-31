import { CameraControls } from "@react-three/drei";
import { useDepthBuffer } from "../../Hooks";
import { useLayoutEffect, useRef } from "react";
import { Mesh, OrthographicCamera } from "three";
import { useFrame } from "@react-three/fiber";

export function Scene() {
  const orthoCamRef = useRef<OrthographicCamera>(null);
  const cubeRef = useRef<Mesh>(null);
  const depthBuffer = useDepthBuffer({
    size: 1024,
    cameraRef: orthoCamRef,
  });

  useLayoutEffect(() => {
    orthoCamRef.current?.lookAt(0, 0, 0);
  });

  useFrame(({ clock }) => {
    if (cubeRef.current) cubeRef.current.rotation.y = clock.getElapsedTime();
  });

  return (
    <>
      {/* Controls */}
      <CameraControls />

      {/* Cube */}
      <mesh ref={cubeRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>

      {/* Plane */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial map={depthBuffer.depthTexture} />
      </mesh>

      <orthographicCamera ref={orthoCamRef} position={[0, -1, 0]} />
    </>
  );
}
