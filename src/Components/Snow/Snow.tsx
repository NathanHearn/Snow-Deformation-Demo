import * as THREE from "three";
import { useLayoutEffect, useMemo, useRef } from "react";
import { useDepthBuffer } from "../../Hooks/useDepthBuffer";
import { SnowMaterial } from "./materials/SnowMaterial";

const depthBufferResolution = 1024 * 1;
const planeSize = 8 * 4;

export const Snow = () => {
  // Refs
  const orthoCamRef = useRef<THREE.OrthographicCamera>(null);

  const depthBuffer = useDepthBuffer({
    size: depthBufferResolution,
    cameraRef: orthoCamRef,
  });

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
      <mesh geometry={planeGeometry}>
        <SnowMaterial
          depthTexture={depthBuffer.depthTexture}
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
