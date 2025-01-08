import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  validateEmail,
  validateUsername,
} from "../../services/validationService";
import { registerUser } from "../../store/features/users/userActions";

import styles from "./SignUpForm.module.css";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data));

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Email"
        className={styles.inputField}
        {...register("email", {
          required: "Email is required",
          validate: (value) => validateEmail(value) || "Enter a valid email",
        })}
      />
      {errors.email && (
        <span className={styles.error}>{errors.email.message}</span>
      )}

      <input
        type="text"
        placeholder="Full Name"
        className={styles.inputField}
        {...register("fullName", {
          required: "Full Name is required",
          minLength: {
            value: 3,
            message: "Full Name must be at least 3 characters",
          },
        })}
      />
      {errors.fullName && (
        <span className={styles.error}>{errors.fullName.message}</span>
      )}

      <input
        type="text"
        placeholder="Username"
        className={styles.inputField}
        {...register("username", {
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username must be at least 3 characters",
          },
          validate: (value) =>
            validateUsername(value) || "Username must start with @",
        })}
      />
      {errors.username && (
        <span className={styles.error}>{errors.username.message}</span>
      )}

      <input
        type="password"
        placeholder="Password"
        className={styles.inputField}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Username must be at least 6 characters",
          },
        })}
      />
      {errors.password && (
        <span className={styles.error}>{errors.password.message}</span>
      )}

      <div className={styles.info}>
        <p>
          People who use our service may have uploaded your contact information
          to Instagram.
          <a href="#"> Learn More</a>
        </p>

        <p>
          By signing up, you agree to our
          <a href="#"> Terms</a>,<a href="#"> Privacy Policy </a>
          and
          <a href="#"> Cookies Policy</a>
        </p>
      </div>

      <button className={styles.loginBtn} type="submit">
        Sign up
      </button>
    </form>
  );
};

export default SignUpForm;
