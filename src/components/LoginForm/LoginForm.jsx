import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/features/users/userActions";
import {
  validateEmail,
  validateUsername,
} from "../../services/validationService";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const usernameValue = watch("emailOrUsername");
  const passValue = watch("password");

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(loginUser(data));
      console.log(data);

      if (loginUser.fulfilled.match(resultAction)) {
        console.log("Login successful");
        navigate("/home");
      } else {
        console.error(
          "Login failed:",
          setErrorMessage(resultAction.payload || resultAction.error)
        );
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login or password is incorrect");
    }
  };

  useEffect(() => {
    if (usernameValue || passValue) {
      setErrorMessage(null);
    }
  }, [usernameValue, passValue, dispatch]);

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
