import * as THREE from "three";
import * as React from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";

function useDepthBuffer({
  size = 256,
  cameraRef,
}: {
  size?: number;
  cameraRef: React.RefObject<THREE.OrthographicCamera>;
}) {
  const dpr = useThree((state) => state.viewport.dpr);
  const { width, height } = useThree((state) => state.size);
  const w = size || width * dpr;
  const h = size || height * dpr;

  const depthConfig = React.useMemo(() => {
    const depthTexture = new THREE.DepthTexture(w, h);
    depthTexture.format = THREE.DepthFormat;
    return {
      depthTexture,
    };
  }, [w, h]);

  const depthFBO = useFBO(w, h, depthConfig);
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
        depthMap: { value: null }, // This will hold the depth texture
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D depthMap;
        varying vec2 vUv;
    
        void main() {
          float depth = texture2D(depthMap, vUv).r;
          gl_FragColor = vec4(vec3(depth), 1.0); // Show raw depth as grayscale
        }
      `,
    });

    const quad = new THREE.Mesh(quadGeometry, postProcessingMaterial);
    postProcessingScene.add(quad);

    return {
      scene: postProcessingScene,
      camera: postProcessingCamera,
      material: postProcessingMaterial,
    };
  }, []);

  useFrame((state) => {
    state.gl.setRenderTarget(depthFBO);
    state.gl.autoClear = false;
    state.gl.render(state.scene, cameraRef.current ?? state.camera);

    state.gl.setRenderTarget(null);
    state.gl.setRenderTarget(postProcessingFBO);

    postProcessingScene.material.uniforms.depthMap.value =
      depthFBO.depthTexture;
    state.gl.render(postProcessingScene.scene, postProcessingScene.camera);

    state.gl.autoClear = true;
    state.gl.setRenderTarget(null);
  });

  return postProcessingFBO.texture;
}

export { useDepthBuffer };
