import * as THREE from "three";
import * as React from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";

import blurVertex from "../shaders/blur/vertex.glsl";
import blurFragment from "../shaders/blur/fragment.glsl";

function useBlur({
  size = 256,
  depthTexture,
}: {
  size?: number;
  depthTexture: THREE.DepthTexture | null;
}) {
  const dpr = useThree((state) => state.viewport.dpr);
  const { width, height } = useThree((state) => state.size);
  const w = size || width * dpr;
  const h = size || height * dpr;

  const postProcessingFBO = useFBO(w, h);

  const postProcessingScene = React.useMemo(() => {
    const postProcessingScene = new THREE.Scene();
    const postProcessingCamera = new THREE.OrthographicCamera(
      -1,
      1,
      1,
      -1,
      0,
      1
    );
    const quadGeometry = new THREE.PlaneGeometry(2, 2);
    const postProcessingMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uDepthTexture: { value: null }, // This will hold the depth texture
        uResolution: { value: size },
        uBlurRadius: { value: 2.5 },
      },
      vertexShader: blurVertex,
      fragmentShader: blurFragment,
    });

    const quad = new THREE.Mesh(quadGeometry, postProcessingMaterial);
    postProcessingScene.add(quad);

    return {
      scene: postProcessingScene,
      camera: postProcessingCamera,
      material: postProcessingMaterial,
    };
  }, [size]);

  useFrame((state) => {
    state.gl.setRenderTarget(postProcessingFBO);
    postProcessingScene.material.uniforms.uDepthTexture.value = depthTexture;
    state.gl.render(postProcessingScene.scene, postProcessingScene.camera);
    state.gl.setRenderTarget(null);
  });

  return postProcessingFBO.texture;
}

export { useBlur };
