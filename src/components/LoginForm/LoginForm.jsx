import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/features/users/userActions";
import {
  validateEmail,
  validateUsername,
} from "../../services/validationService";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(loginUser(data));

      if (!response.payload.user) {
        setErrorMessage("Login or password is incorrect");
        return;
      }

      navigate("/main");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login or password is incorrect");
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Username or email"
        className={styles.inputField}
        {...register("emailOrUsername", {
          required: "Username is required",
          validate: (value) => {
            const isEmailValid = validateEmail(value);
            const isUsernameValid = validateUsername(value);

            if (!isEmailValid && !isUsernameValid) {
              return "Enter a valid email or username";
            }
          },
        })}
      />
      {errors.emailOrUsername && (
        <span className={styles.error}>{errors.emailOrUsername.message}</span>
      )}

      <input
        type="password"
        placeholder="Password"
        className={styles.inputField}
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && (
        <span className={styles.error}>{errors.password.message}</span>
      )}
      {errorMessage && (
        <span className={styles.error}>{"Login or password is incorrect"}</span>
      )}

      <button className={styles.loginBtn} type="submit">
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
