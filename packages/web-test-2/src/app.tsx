import React from "react";

import styles from "./test.module.scss";
import "./test.scss";

export function App() {
  return (
    <>
      <div className={`testClass`}>Green</div>
      <div className={styles.testModule}>Orange</div>
    </>
  );
}
