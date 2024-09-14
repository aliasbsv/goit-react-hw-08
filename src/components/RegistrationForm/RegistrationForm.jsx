import * as Yup from "yup";
import css from "./RegistrationForm.module.css";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { register } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";

const INITIAL_VALUES = {
  username: "",
  useremail: "",
  userpassword: "",
};

const RegisterValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Username is required"),
  userpassword: Yup.string()
    .min(8, "Password must contains min 8 char")
    .max(20, "Password must be less than 20 characters")
    .required("Password is required"),
  useremail: Yup.string()
    .email("Must be a valid email!")
    .required("Email address is required"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  const handleSubmit = (values, actions) => {
    const name = values.username;
    const email = values.useremail;
    const password = values.userpassword;

    const userProfile = {
      name,
      email,
      password,
    };
    dispatch(register(userProfile));
    actions.resetForm();
  };

  return (
    <main>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={RegisterValidationSchema}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <span className={css.labelText}>Name</span>
            <Field
              type="text"
              name="username"
              placeholder="Enter your name"
              className={css.field}
            />
            <ErrorMessage
              name="username"
              component="span"
              className={css.errorText}
            />
          </label>
          <label className={css.label}>
            <span className={css.labelText}>Email</span>
            <Field
              type="text"
              name="useremail"
              placeholder="Enter your email"
              className={css.field}
            />
            <ErrorMessage
              name="useremail"
              component="span"
              className={css.errorText}
            />
          </label>
          <label className={css.label}>
            <span className={css.labelText}>Password</span>
            <Field
              type="password"
              name="userpassword"
              placeholder="Enter your password"
              className={css.field}
            />
            <ErrorMessage
              name="userpassword"
              component="span"
              className={css.errorText}
            />
          </label>
          <button type="submit" className={css.button}>
            Registration
          </button>
          {error && <p>User already exists</p>}
        </Form>
      </Formik>
    </main>
  );
};

export default RegistrationForm;
