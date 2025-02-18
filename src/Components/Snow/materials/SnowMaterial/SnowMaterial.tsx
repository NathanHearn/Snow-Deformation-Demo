import * as THREE from "three";
import { useMemo } from "react";
import CustomShaderMaterial from "three-custom-shader-material";
import snowVertex from "../../shaders/snow/vertex.glsl";
import snowFragment from "../../shaders/snow/fragment.glsl";

export const SnowMaterial = ({
  depthTexture,
  resolution,
  size,
}: {
  depthTexture: THREE.Texture | null;
  resolution: number;
  size: number;
}) => {
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
    <CustomShaderMaterial
      // baseMaterial={THREE.MeshNormalMaterial}
      baseMaterial={THREE.MeshPhysicalMaterial}
      color={0xe0f7ff} // Slightly blueish white
      roughness={0.8} // Powdery snow
      metalness={0.0} // Almost non-metallic
      clearcoat={0.0} // Icy layer effect
      clearcoatRoughness={0.6} // Adds a bit of roughness to ice
      sheen={0.5} // Subtle light scattering
      vertexShader={snowVertex}
      fragmentShader={snowFragment}
      uniforms={uniforms}
    />
  );
};
