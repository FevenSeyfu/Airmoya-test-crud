import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@redux/authSlice";
import InputField from "@components/utility/Input/Input";
import Typography from "@components/utility/Typography/Typography";
import Button from "@components/utility/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailTouched && !validateEmail(value)) {
      setEmailError("Please enter correct email format");
    } else {
      setEmailError("");
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    if (!validateEmail(email)) {
      setEmailError("Please enter correct email format");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordTouched && value.length === 0) {
      setPasswordError("Password cannot be empty");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    if (password.length === 0) {
      setPasswordError("Password cannot be empty");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (password.length === 0) {
      toast.error("Password cannot be empty");
      return;
    }
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const resultAction = await dispatch(loginUser({ email, password: hashedPassword }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/');
    } else {
      toast.error("Login failed: " + error);
    }
  };
  const isFormValid = validateEmail(email) && password.length > 0;

  return (
    <article className="flex flex-col items-start gap-y-4 border border-dark-blue rounded-md m-4 md:m-20 p-4 md:p-6">
      <Typography variant="h1" weight="strong" color="primaryHeading">
        Login
      </Typography>
      <form className="w-full flex flex-col items-start gap-y-4">
        <InputField
          placeholder="Enter Email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          state={emailError ? "error" : "default"}
          helperMessage={emailError}
          size="regular"
          isRequired={true}
          label="Email"
          type='email'
        />
        <InputField
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          state={passwordError ? "error" : "default"}
          helperMessage={passwordError}
          size="regular"
          isRequired={true}
          label="Password"
        />
        <Button type='submit' onClick={handleLogin} disabled={loading || !isFormValid}>
          Login
        </Button>
      </form>
      {error && <p>{error}</p>}
      <ToastContainer />
    </article>
  );
};

export default Login;