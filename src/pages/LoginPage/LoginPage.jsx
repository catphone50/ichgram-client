/* eslint-disable react/no-unescaped-entities */
import styles from "./LoginPage.module.css";
import phoneFrame from "../../assets/images/Background.png";
import logo from "../../assets/images/logo.svg";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img
          src={phoneFrame}
          alt="Phone preview"
          className={styles.phoneImage}
        />
      </div>

      <div className={styles.right}>
        <div className={styles.loginContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <LoginForm />

          <div className={styles.orDivider}>
            <span></span>
            <p>OR</p>
            <span></span>
          </div>
          <a href="#" className={styles.forgotPassword}>
            Forgot password?
          </a>
        </div>

        <div className={styles.loginContainer}>
          <div className={styles.signupLink}>
            <p>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
