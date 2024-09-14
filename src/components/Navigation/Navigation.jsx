import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux"; // Імплементуємо useSelector
import { selectIsLoggedIn } from "../../redux/auth/selectors"; // Виправлений шлях до селектора
import css from "./Navigation.module.css";

const Navigation = () => {
  // Використовуємо useSelector для отримання значення isLoggedIn
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.nav}>
      <NavLink to="/" className={css.link}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/contacts" className={css.link}>
          Contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
