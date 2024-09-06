import { FaUserCircle } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import css from "./Contact.module.css";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const onDeleteContact = () => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      <div className="profile">
        <p className={css.name}>
          <FaUserCircle /> {name}
        </p>
        <p className={css.number}>
          <AiFillPhone /> {number}
        </p>
      </div>
      <button className={css.button} type="button" onClick={onDeleteContact}>
        Delete
      </button>
    </>
  );
};
export default Contact;
