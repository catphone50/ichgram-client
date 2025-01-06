import logo from "../../assets/images/logo.svg";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
  return (
    <>
      <div className={styles.formContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <p className={styles.aboutUs}>
          Sign up to see photos and videos from your friends.
        </p>
        <SignUpForm />
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.signupLink}>
          <p>
            Have an account? <a href="/signup">Log in</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
