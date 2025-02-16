import { CameraControls, Environment, Sky } from "@react-three/drei";
import { Snow } from "../Snow";
import { Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Box } from "../Box";

export function Scene() {
  const sphereRef = useRef(null);
  const cubeRef = useRef(null);
  const torusRef = useRef(null);
  const cylinderRef = useRef(null);

  const onBodyClick = (body: any, multiplier: number) => {
    body.wakeUp();
    body.applyImpulse({
      x: (Math.random() - 0.5) * multiplier,
      y: (Math.random() - 0.5) * multiplier,
      z: (Math.random() - 0.5) * multiplier,
    });
    body.applyTorqueImpulse({
      x: (Math.random() - 0.5) * multiplier,
      y: (Math.random() - 0.5) * multiplier,
      z: (Math.random() - 0.5) * multiplier,
    });
  };

  return (
    <>
      {/* Controls */}
      <CameraControls
        mouseButtons={{
          left: 0,
          middle: 2,
          wheel: 8,
          right: 1,
        }}
      />

      {/* Sky */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <Environment preset={"park"} environmentIntensity={1} />
      <directionalLight
        position={[0, 10, 0]}
        intensity={0.5}
        color={0xffccdd}
      />

      {/* Snow */}
      <Snow />

      {/* Physics */}
      <Physics>
        <RigidBody colliders="ball" ref={sphereRef}>
          <mesh
            position={[-2, 10, -2]}
            onClick={() => onBodyClick(sphereRef.current, 40)}
          >
            <sphereGeometry args={[1.2, 254, 254]} />
            <meshStandardMaterial color="coral" />
          </mesh>
        </RigidBody>

        <RigidBody ref={cubeRef}>
          <mesh
            position={[2, 10, -2]}
            onClick={() => onBodyClick(cubeRef.current, 100)}
          >
            <boxGeometry args={[1.5, 4, 1.5]} />
            <meshStandardMaterial color="darkseagreen" />
          </mesh>
        </RigidBody>

        <RigidBody ref={torusRef} colliders="hull">
          <mesh
            position={[2, 10, 2]}
            onClick={() => onBodyClick(torusRef.current, 100)}
          >
            <torusGeometry args={[1.5, 0.5, 16, 100]} />
            <meshStandardMaterial color="dodgerblue" />
          </mesh>
        </RigidBody>

        <RigidBody ref={cylinderRef} colliders="hull">
          <mesh
            position={[-2, 10, 2]}
            onClick={() => onBodyClick(cylinderRef.current, 80)}
          >
            <cylinderGeometry args={[1, 1, 2]} />
            <meshStandardMaterial color="violet" />
          </mesh>
        </RigidBody>

        <Box />
      </Physics>
    </>
  );
}
