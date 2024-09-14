import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { logOut } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogOut = async () => {
    try {
      await dispatch(logOut()).unwrap();
      // No need to call logOutSuccess here anymore
    } catch (error) {
      console.error("Failed to log out:", error.message);
    }
  };

  return (
    <div className={css.userMenu}>
      <span className={css.userName}>
        <p className={css.named}>
          <FaUserCircle /> {user.name}
        </p>
      </span>
      <button onClick={handleLogOut} className={css.logoutButton}>
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;
