import css from "./ContactList.module.css";
import { FaUserCircle } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import {
  selectNameFilter,
  selectNumberFilter,
} from "../../redux/filters/selectors";
import toast from "react-hot-toast";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const nameFilter = useSelector(selectNameFilter).toLowerCase();
  const numberFilter = useSelector(selectNumberFilter)
    .toLowerCase()
    .replace(/\s+/g, "");
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(({ name, number }) => {
    const formattedNumber = number.replace(/\s+/g, "");
    const nameMatch = name.toLowerCase().includes(nameFilter);
    const numberMatch =
      numberFilter === "" || formattedNumber.includes(numberFilter);
    return nameMatch && numberMatch;
  });

  const handleDelete = (id) => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => toast.success("Contact deleted successfully"))
      .catch((error) => toast.error(error.message));
  };

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={css.contact}>
          <div>
            <p className={css.name}>
              <FaUserCircle /> {name}
            </p>
            <p className={css.number}>
              <AiFillPhone /> {number}
            </p>
          </div>
          <button
            className={css.contactListButton}
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
