import { useEffect } from "react";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC<object> = () => {

  useEffect(() => {
    // lifecycle
  }, []);

  return (
    <>
      <section className="login-form">
        <LoginForm />
      </section>
    </>
  );
};

export default LoginPage;
