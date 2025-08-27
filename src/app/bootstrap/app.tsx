import React from "react";
import "../styles/index.scss";
import styles from "./styles.module.scss";

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>React boilerplate by Aspor</h1>
      <img className={styles.logo} src="/assets/favicon.svg" alt="logo" />
      <a
        className={styles.link}
        href="https://github.com/Aspors"
        target="_blank"
      >
        [github]
      </a>
    </div>
  );
};

export default App;
