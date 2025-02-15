import * as THREE from "three";
import { useMemo, useRef } from "react";

// Import shaders
import snowVertex from "../../shaders/snow/vertex.glsl";
import snowFragment from "../../shaders/snow/fragment.glsl";

export const SnowMaterial = ({
  depthTexture,
}: {
  depthTexture: THREE.DepthTexture | null;
}) => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uDepthTexture: { value: depthTexture },
      uResolution: {
        value: new THREE.Vector2(
          depthTexture?.image.width,
          depthTexture?.image.height
        ),
      },
    }),
    [depthTexture]
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
