import { Canvas } from "@react-three/fiber";
import styles from "./App.module.scss";
import { Scene } from "../Scene";
import { KeyboardControls } from "@react-three/drei";

function App() {
  return (
    <main className={styles.App}>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas>
          <Scene />
        </Canvas>
      </KeyboardControls>
    </main>
  );
}

export { App };
