import css from "./LoginForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";
import { useState } from "react";

const LoginValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "The password must be at least 8 characters long")
    .max(20, "Password must be less than 20 characters"),
  email: Yup.string()
    .email("Incorrect email address")
    .required("Email address is required"),
});

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (values) => {
    dispatch(login(values));
    setIsSubmitted(true);
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={LoginValidationSchema}
    >
      <Form className={css.form}>
        <label className={css.label}>
          <span>Email</span>
          <Field
            type="email"
            name="email"
            placeholder="example@gmail.com"
            className={css.input}
          />
          <ErrorMessage
            className={css.errorText}
            name="email"
            component="span"
          />
        </label>
        <label className={css.label}>
          <span>Password</span>
          <Field
            type="password"
            name="password"
            placeholder="Enter your password"
            className={css.input}
          />
          <ErrorMessage
            className={css.errorText}
            name="password"
            component="span"
          />
        </label>
        <button type="submit" className={css.button}>
          Log In
        </button>

        {error && isSubmitted && (
          <p className={css.errorText}>Oops, some error occurred... {error}</p>
        )}
      </Form>
    </Formik>
  );
};

export default LoginForm;
