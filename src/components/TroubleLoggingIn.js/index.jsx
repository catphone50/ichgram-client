import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import logo from "../../assets/icons/troubleLogging.svg";

const TroubleLoggingIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    // Логика для отправки данных на сервер
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h2 className={styles.title}>Trouble logging in?</h2>
        <p className={styles.description}>
          Enter your email, phone, or username and we&apos;ll send you a link to
          get back into your account.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Email or Username"
            {...register("emailOrUsername", {
              required: "This field is required",
            })}
            className={`${styles.input} ${
              errors.emailOrUsername ? styles.inputError : ""
            }`}
          />
          {errors.emailOrUsername && (
            <p className={styles.error}>{errors.emailOrUsername.message}</p>
          )}
          <button type="submit" className={styles.btn}>
            Reset your password
          </button>
        </form>
        <div className={styles.divider}>OR</div>
        <a href="/signup" className={`${styles.secondary}`}>
          Create new account
        </a>
        <a href="/login" className={styles.backToLogin}>
          Back to login
        </a>
      </div>
    </div>
  );
};

export default TroubleLoggingIn;
