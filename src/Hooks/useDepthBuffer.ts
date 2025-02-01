import {
  DepthTexture,
  DepthFormat,
  OrthographicCamera,
  RepeatWrapping,
} from "three";
import * as React from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";

function useDepthBuffer({
  size = 256,
  cameraRef,
}: {
  size?: number;
  cameraRef: React.RefObject<OrthographicCamera>;
}) {
  const dpr = useThree((state) => state.viewport.dpr);
  const { width, height } = useThree((state) => state.size);
  const w = size || width * dpr;
  const h = size || height * dpr;
  const depthConfig = React.useMemo(() => {
    const depthTexture = new DepthTexture(w, h);
    depthTexture.format = DepthFormat;
    depthTexture.repeat.y = -1;
    depthTexture.wrapT = RepeatWrapping;
    return {
      depthTexture,
    };
  }, [w, h]);
  const depthFBO = useFBO(w, h, depthConfig);
  useFrame((state) => {
    state.gl.setRenderTarget(depthFBO);
    state.gl.autoClear = false;
    state.gl.render(state.scene, cameraRef.current ?? state.camera);
    state.gl.autoClear = true;
    state.gl.setRenderTarget(null);
  });
  return {
    texture: depthFBO.texture,
    depthTexture: depthFBO.depthTexture,
  };
}

export { useDepthBuffer };
