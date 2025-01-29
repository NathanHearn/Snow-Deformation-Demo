import { Canvas } from "@react-three/fiber";
import styles from "./App.module.scss";
import { Scene } from "../Scene";

function App() {
  return (
    <main className={styles.App}>
      <Canvas>
        <Scene />
      </Canvas>
    </main>
  );
}

export { App };
