import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";

export const Ball = () => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();

  const bodyRef = useRef<RapierRigidBody>(null);

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta * 20;
    const torqueStrength = 0.2 * delta * 20;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    bodyRef.current?.applyImpulse(impulse, true);
    bodyRef.current?.applyTorqueImpulse(torque, true);
  });

  const jump = () => {
    const origin = bodyRef.current?.translation();
    origin!.y -= 1.01;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin!, direction);
    const hit = world.castRay(ray, 20, true);

    if ((hit?.timeOfImpact as number) < 0.15)
      bodyRef.current?.applyImpulse({ x: 0, y: 20, z: 0 }, true);
  };

  useEffect(() => {
    const unsubscribe = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) jump();
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <RigidBody
      linearDamping={0.5}
      angularDamping={0.5}
      colliders="ball"
      ref={bodyRef}
      position={[-2, 10, -2]}
    >
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial flatShading color="coral" />
      </mesh>
    </RigidBody>
  );
};
