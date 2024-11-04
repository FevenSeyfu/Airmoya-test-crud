import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@redux/authSlice";
import InputField from "@components/utility/Input/Input";
import Typography from "@components/utility/Typography/Typography";
import Button from "@components/utility/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    confirmPassword: { value: "", error: "" },
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "username" && value.length === 0) {
      error = "Username cannot be empty";
    } else if (name === "email" && !validateEmail(value)) {
      error = "Invalid email format";
    } else if (name === "password" && value.length === 0) {
      error = "Password cannot be empty";
    } else if (name === "confirmPassword" && value !== form.password.value) {
      error = "Passwords do not match";
    }

    setForm({
      ...form,
      [name]: { value, error },
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = form[name].error;

    if (name === "username" && value.length === 0) {
      error = "Username cannot be empty";
    } else if (name === "email" && !validateEmail(value)) {
      error = "Invalid email format";
    } else if (name === "password" && value.length === 0) {
      error = "Password cannot be empty";
    } else if (name === "confirmPassword" && value !== form.password.value) {
      error = "Passwords do not match";
    }

    setForm({
      ...form,
      [name]: { ...form[name], error },
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(form).some(
      (field) => field.error || field.value.length === 0
    );

    if (hasErrors) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    const hashedPassword = CryptoJS.SHA256(form.password.value).toString();
    dispatch(
      registerUser({
        username: form.username.value,
        email: form.email.value,
        password: hashedPassword,
      })
    )
      .unwrap()
      .then(() => {
        setForm({
          username: { value: "", error: "" },
          email: { value: "", error: "" },
          password: { value: "", error: "" },
          confirmPassword: { value: "", error: "" },
        });
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message || "Registration failed");
      });
  };

  const isFormValid = Object.values(form).every(
    (field) => !field.error && field.value
  );

  return (
    <article className="flex flex-col items-start gap-y-4 border border-dark-blue rounded-md m-4 md:m-20 p-4 md:p-6">
      <Typography variant="h1" weight="strong" color="primaryHeading">
        Register
      </Typography>
      <form
        className="w-full flex flex-col items-start gap-y-4"
        onSubmit={handleRegister}
      >
        <InputField
          placeholder="Enter Username"
          name="username"
          value={form.username.value}
          onChange={handleChange}
          onBlur={handleBlur}
          state={form.username.error ? "error" : "default"}
          helperMessage={form.username.error}
          size="regular"
          isRequired={true}
          label="Username"
        />
        <InputField
          placeholder="Enter Email"
          name="email"
          value={form.email.value}
          onChange={handleChange}
          onBlur={handleBlur}
          state={form.email.error ? "error" : "default"}
          helperMessage={form.email.error}
          size="regular"
          isRequired={true}
          label="Email"
          type="email"
        />
        <InputField
          placeholder="Enter Password"
          name="password"
          type="password"
          value={form.password.value}
          onChange={handleChange}
          onBlur={handleBlur}
          state={form.password.error ? "error" : "default"}
          helperMessage={form.password.error}
          size="regular"
          isRequired={true}
          label="Password"
        />
        <InputField
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword.value}
          onChange={handleChange}
          onBlur={handleBlur}
          state={form.confirmPassword.error ? "error" : "default"}
          helperMessage={form.confirmPassword.error}
          size="regular"
          isRequired={true}
          label="Confirm Password"
        />
        <Button type="submit" disabled={loading || !isFormValid}>
          Register
        </Button>
      </form>
      {error && (
        <p>
          {typeof error === "string"
            ? error
            : error.message || "An error occurred."}
        </p>
      )}

      <ToastContainer />
    </article>
  );
};

export default Register;
