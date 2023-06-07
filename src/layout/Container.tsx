import { Outlet } from "react-router-dom";
import styles from "/src/styles/Style.module.css";
import Footer from "./Footer";

const Container = () => {
  return (
    <>
    <div className={styles.container}>
      <header className={styles.header}>
        <img className={styles.imagelogo} src="src\images\um logo.png"/>
        <p></p>
      </header>
      <div>
        <Outlet />
        <Footer className={styles.footer} />
      </div>
      </div>
    </>
  );
};

export default Container;
