import * as THREE from "three";
import { useLayoutEffect, useMemo, useRef } from "react";
import { useBlur, useDepth } from "./Hooks";
import { SnowMaterial } from "./materials/SnowMaterial";

const depthBufferResolution = 1024 * 1;
const planeSize = 8 * 4;

export const Snow = () => {
  // Refs
  const orthoCamRef = useRef<THREE.OrthographicCamera>(null);

  // Get depth texture from orthographic camera
  const depthTexture = useDepth({
    size: depthBufferResolution,
    cameraRef: orthoCamRef,
  });

  // Apply blur to depth map an return as simple texture
  const blurredTexture = useBlur({ size: depthBufferResolution, depthTexture });

  useLayoutEffect(() => {
    orthoCamRef.current?.lookAt(0, 0, 0);
  });

  const planeGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(
      planeSize,
      planeSize,
      depthBufferResolution,
      depthBufferResolution
    );
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }, []);

  return (
    <>
      <mesh position={[0, 5, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={blurredTexture} />
      </mesh>
      <mesh geometry={planeGeometry}>
        <SnowMaterial
          depthTexture={blurredTexture}
          resolution={depthBufferResolution}
          size={planeSize}
        />
      </mesh>
      <orthographicCamera
        ref={orthoCamRef}
        position={[0, -0.1, 0]}
        args={[
          -planeSize * 0.5,
          planeSize * 0.5,
          planeSize * 0.5,
          -planeSize * 0.5,
          0.1,
          1,
        ]}
      />
    </>
  );
};
