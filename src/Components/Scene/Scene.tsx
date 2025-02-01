import { CameraControls, DragControls } from "@react-three/drei";
import { useDepthBuffer } from "../../Hooks";
import { useLayoutEffect, useRef } from "react";
import { Mesh, OrthographicCamera } from "three";
import { useFrame } from "@react-three/fiber";

const SPIN_CUBE = true;

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
    if (cubeRef.current && SPIN_CUBE) {
      cubeRef.current.position.x = Math.cos(clock.getElapsedTime()) * 2;
      cubeRef.current.position.z = Math.sin(clock.getElapsedTime()) * 2;
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

      {/* Cube */}
      <DragControls>
        <mesh ref={cubeRef} position={[0, 1, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="hotpink" />
        </mesh>
      </DragControls>

      {/* Plane */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI * -0.5, 0, 0]}>
        <planeGeometry args={[8, 8]} />
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
