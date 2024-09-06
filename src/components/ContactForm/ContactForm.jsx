import { useFormik } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import css from "./ContactForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Мінімум 3 символи")
    .max(50, "Максимум 50 символів")
    .required("Обов'язкове поле"),
  number: Yup.string()
    .min(3, "Мінімум 3 символи")
    .max(50, "Максимум 50 символів")
    .required("Обов'язкове поле"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addContact(values))
        .unwrap()
        .then(() => {
          resetForm();
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <label>
        <span>Name: </span>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.touched.name && formik.errors.name ? css.error : ""}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className={css.errorMessage}>{formik.errors.name}</div>
        ) : null}
      </label>
      <label>
        <span>Number: </span>
        <input
          type="text"
          name="number"
          value={formik.values.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.number && formik.errors.number ? css.error : ""
          }
        />
        {formik.touched.number && formik.errors.number ? (
          <div className={css.errorMessage}>{formik.errors.number}</div>
        ) : null}
      </label>
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
