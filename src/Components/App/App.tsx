import { Canvas } from "@react-three/fiber";
import styles from "./App.module.scss";
import { Scene } from "../Scene";
import { KeyboardControls } from "@react-three/drei";

const controls = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "back", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "brake", keys: ["Space"] },
  { name: "reset", keys: ["KeyR"] },
];

export type KeyControls = {
  forward: boolean;
  back: boolean;
  left: boolean;
  right: boolean;
  brake: boolean;
  reset: boolean;
};

function App() {
  return (
    <main className={styles.App}>
      <KeyboardControls map={controls}>
        <Canvas>
          <Scene />
        </Canvas>
      </KeyboardControls>
    </main>
  );
}

export { App };
