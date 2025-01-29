import { CameraControls, useDepthBuffer } from "@react-three/drei";

export function Scene() {
  const depthBuffer = useDepthBuffer({ size: 1024 });
  return (
    <>
      {/* Controls */}
      <CameraControls />

      {/* Cube */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>

      {/* Plane */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial map={depthBuffer} />
      </mesh>

      <orthographicCamera />
    </>
  );
}
