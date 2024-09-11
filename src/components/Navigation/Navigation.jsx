import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux"; // Імплементуємо useSelector
import { selectIsLoggedIn } from "../../redux/auth/selectors"; // Виправлений шлях до селектора
import styles from "./Navigation.module.css";

const Navigation = () => {
  // Використовуємо useSelector для отримання значення isLoggedIn
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.link}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={styles.link}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
