import css from ".//ContactPage.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectLoading, selectError } from "../../redux/contacts/selectors";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";

function ContactsPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.contactPage}>
      <h1>Your Contacts</h1>
      <div className={css.formContainer}>
        <ContactForm />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <SearchBox />
      <div className={css.contactListContainer}>
        <ContactList />
      </div>
    </div>
  );
}

export default ContactsPage;
