import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useMemo } from "react";

const planeSize = 8 * 4;

export function Box() {
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({ color: "lightblue" });
  }, []);
  const wallGeometry = useMemo(() => {
    return new THREE.BoxGeometry(2, 0.5, planeSize);
  }, []);

  return (
    <>
      <RigidBody type="fixed">
        <mesh position={[0, -0.25, 0]} material={material}>
          <boxGeometry args={[planeSize, 0.5, planeSize]} />
        </mesh>
        <mesh
          position={[planeSize * 0.5 + 0.25, 0.5, 0]}
          rotation={[0, 0, Math.PI * 0.5]}
          material={material}
          geometry={wallGeometry}
        ></mesh>
        <mesh
          position={[planeSize * -0.5 - 0.25, 0.5, 0]}
          rotation={[0, 0, Math.PI * 0.5]}
          material={material}
          geometry={wallGeometry}
        ></mesh>
        <mesh
          position={[0, 0.5, planeSize * 0.5 + 0.25]}
          rotation={[0, Math.PI * 0.5, Math.PI * 0.5]}
          material={material}
          geometry={wallGeometry}
        ></mesh>
        <mesh
          position={[0, 0.5, planeSize * -0.5 - 0.25]}
          rotation={[0, Math.PI * 0.5, Math.PI * 0.5]}
          material={material}
          geometry={wallGeometry}
        ></mesh>
      </RigidBody>
    </>
  );
}
