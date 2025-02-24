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
      <Environment background={true}>
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0.0}
          azimuth={0.55}
          rayleigh={0.1}
          turbidity={1}
        />
      </Environment>

      <directionalLight
        position={[0, 10, 0]}
        intensity={0.3}
        color={0xffccdd}
      />

      {/* Snow */}
      <Snow />

      {/* Physics */}
      <Physics>
        <Vehicle position={[0, 2, 0]} rotation={[0, 0, 0]} />

        <Base />
      </Physics>
    </>
  );
}
