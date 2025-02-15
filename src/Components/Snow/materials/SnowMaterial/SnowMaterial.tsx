import * as THREE from "three";
import { useMemo, useRef } from "react";

// Import shaders
import snowVertex from "../../shaders/snow/vertex.glsl";
import snowFragment from "../../shaders/snow/fragment.glsl";

export const SnowMaterial = ({
  depthTexture,
  resolution,
  size,
}: {
  depthTexture: THREE.DepthTexture | null;
  resolution: number;
  size: number;
}) => {
  // Refs
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uDepthTexture: { value: depthTexture },
      uResolution: { value: resolution },
      uSize: { value: size },
    }),
    [depthTexture, resolution, size]
  );

  return (
    <shaderMaterial
      vertexShader={snowVertex}
      fragmentShader={snowFragment}
      uniforms={uniforms}
      ref={shaderRef}
    />
  );
};
