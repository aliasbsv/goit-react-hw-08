import css from "./App.module.css";
import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import { selectIsRefreshing } from "./redux/auth/selectors";
// Ленивая загрузка компонентов
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <div>Loading...</div>;
  }

  return (
    <div className={css.appContainer}>
      <Layout>
        <main className={css.content}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/register"
                element={<RestrictedRoute component={<RegistrationPage />} />}
              />
              <Route
                path="/login"
                element={<RestrictedRoute component={<LoginPage />} />}
              />
              <Route
                path="/contacts"
                element={<PrivateRoute component={<ContactsPage />} />}
              />
            </Routes>
          </Suspense>
        </main>
      </Layout>
    </div>
  );
};

export default App;
