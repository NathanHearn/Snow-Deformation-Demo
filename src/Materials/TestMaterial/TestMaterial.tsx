import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

// Import shaders
import testVertex from "../../shaders/test/vertex.glsl";
import testFragment from "../../shaders/test/fragment.glsl";

export const TestMaterial = () => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uColor: { value: new THREE.Color("hotpink") },
    }),
    []
  );

  return (
    <shaderMaterial
      vertexShader={testVertex}
      fragmentShader={testFragment}
      uniforms={uniforms}
      ref={shaderRef}
    />
  );
};
