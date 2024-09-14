import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <div className={styles.authNav}>
      <NavLink to="/login" className={styles.link}>
        LogIn
      </NavLink>
      <NavLink to="/register" className={styles.link}>
        Register
      </NavLink>
    </div>
  );
};

export default AuthNav;
