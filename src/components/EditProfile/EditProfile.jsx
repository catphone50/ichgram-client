import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./EditProfile.module.css";
import avatar from "../../assets/icons/benutzer.svg";
import Compressor from "compressorjs";
import {
  validateEmail,
  validateUsername,
} from "../../services/validationService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../../store/features/users/userActions";
import { fileToBase64 } from "../../services/converterToBasw64";

const EditProfile = ({ profile }) => {
  const [avatarBase64, setAvatarBase64] = useState(profile.avatar || avatar);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: profile.fullName || "",
      email: profile.email || "",
      username: profile.username || "",
      socialLinks: profile.socialLinks || "",
      description: profile.description || "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data.avatar = avatarBase64;
    try {
      await dispatch(updateUserInfo(data));
      navigate(`/profile/${profile.id}`);
    } catch (error) {
      console.error("Updating profile failed:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/profile/${profile.id}`);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        success: async (compressedResult) => {
          const base64 = await fileToBase64(compressedResult);
          setAvatarBase64(base64);
        },
        error(err) {
          console.error(err.message);
        },
      });
    }
  };
  React.useEffect(() => {
    setValue("avatarUrl", profile.avatar || avatar);
  }, [profile.avatar, setValue]);

  return (
    <form className={styles.editProfileForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.profileHeader}>
        <h1>Edit Profile</h1>
      </div>
      <div className={styles.editAvatarContainer}>
        <img
          src={profile.avatar || avatar}
          alt="Avatar"
          className={styles.avatar}
        />
        <button
          type="button"
          className={styles.editAvatarButton}
          onClick={() => document.querySelector(`.${styles.fileInput}`).click()}
        >
          Edit Avatar
        </button>
        <input
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={handleFileChange}
        />
      </div>

      <label htmlFor="fullName">Full Name</label>
      <input
        type="text"
        id="fullName"
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

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        {...register("email", {
          required: "Email is required",
          validate: (value) => validateEmail(value) || "Enter a valid email",
        })}
      />
      {errors.email && (
        <span className={styles.error}>{errors.email.message}</span>
      )}

      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
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

      <label htmlFor="socialLinks">Website</label>
      <input type="text" id="socialLinks" {...register("socialLinks")} />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        {...register("description", {
          maxLength: {
            value: 500,
            message: "Description cannot exceed 500 characters",
          },
        })}
        rows="5"
        style={{ resize: "none" }}
      />
      {errors.description && (
        <span className={styles.error}>{errors.description.message}</span>
      )}

      <div className={styles.buttonContainer}>
        <button type="submit">Save Changes</button>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
