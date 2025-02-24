import { CameraControls, Environment, Sky } from "@react-three/drei";
import { Snow } from "../Snow";
import { Physics } from "@react-three/rapier";
import { Base } from "../Base";
import { Vehicle } from "../Vehicle";

export function Scene() {
  return (
    <>
      {/* Controls */}
      <CameraControls
        mouseButtons={{
          left: 1,
          middle: 2,
          wheel: 8,
          right: 0,
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
        <Vehicle position={[0, 10, 0]} rotation={[0, 0, 0]} />

        <Base />
      </Physics>
    </>
  );
}
