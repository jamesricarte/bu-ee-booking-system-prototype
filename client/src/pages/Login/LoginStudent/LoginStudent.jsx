import React, { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const LoginStudent = () => {
  const [message, setMessage] = useState(null);
  const [messageVisibility, setMessageVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const messageTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [userLogin, setUserLogin] = useState({
    schoolId: "",
    password: "",
    role: "student",
  });

  useEffect(() => {
    detectChangedPassword();
  }, [location]);

  const handleUserLoginInput = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const detectChangedPassword = () => {
    if (location.state?.message) {
      setMessageVisibility(true);
      setMessage({ text: location.state.message, type: "success" });

      navigate(location.pathname, { replace: true, state: {} });

      setTimeout(() => {
        setMessageVisibility(false);
      }, [4000]);
    }
  };

  const logInUser = async (e) => {
    e.preventDefault();

    setShowPassword(false);
    setLoading(true);

    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    const startTime = Date.now();
    let result;
    let message = { text: "", type: "" };

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `${
              response.status === 500
                ? "Error: Can't access the server"
                : `Error: ${response.status} ${response.statusText}`
            }`
        );
      }

      result = await response.json();
      console.log(result);

      message = { text: result.message, type: "success" };
    } catch (error) {
      console.log(error);

      let errorMessage = error.message;

      if (error.message === "Failed to fetch") {
        errorMessage =
          "Unable to connect to the server. Check your internet connection";
      }

      message = { text: errorMessage, type: "error" };
    } finally {
      const elapsedTime = Date.now() - startTime;
      const minimumTime = 2000;

      setTimeout(() => {
        if (message.type === "success") {
          login(result.fetchedUser);
          navigate("/dashboard");
        }
        setMessage(message);
        setLoading(false);
        setMessageVisibility(true);

        messageTimeoutRef.current = setTimeout(() => {
          setMessageVisibility(false);
        }, 4000);
      }, Math.max(0, minimumTime - elapsedTime));
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="mb-10">
        <h3 className="font-bold text-2xl">Welcome to Classroom Booking</h3>
        <p>Please login your credentials to access the classrooms.</p>
        <Link to="/login" className="cursor-pointer">
          <IoArrowBack size="26" color="#575757" />
        </Link>
      </div>
      <form className="flex flex-col gap-3" onSubmit={logInUser}>
        <div className="flex flex-col">
          <label htmlFor="studentId">Student ID:</label>
          <Input
            type="text"
            id="studentId"
            name="schoolId"
            value={userLogin.schoolId}
            required={true}
            onChange={handleUserLoginInput}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <div className="relative w-full">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={userLogin.password}
              required={true}
              onChange={handleUserLoginInput}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer"
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
        </div>
        <Link to="/login/student/account/recover">
          <p className="text-sm text-green-400 hover:opacity-40 cursor-pointer">
            Forget password?
          </p>
        </Link>
        <Button type="submit">Login</Button>
      </form>
      <p className="mt-12">
        Don't have an account yet?{" "}
        <Link
          className="text-green-400 hover:opacity-40"
          to="/register/student"
        >
          Register here
        </Link>
      </p>

      <div
        className={`text-white rounded-md p-3 fixed left-1/2 transform -translate-x-1/2 transition-all duration-700 ease ${
          messageVisibility
            ? "top-6 opacity-70 pointer-events-auto"
            : "-top-24 opacity-0 pointer-events-none"
        } ${message?.type === "success" ? "bg-green-400" : "bg-red-400"}`}
      >
        <p>{message?.text}</p>
      </div>

      <div
        className={`${
          loading
            ? "pointer-events-auto opacity-50"
            : "pointer-events-none opacity-0"
        } fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white`}
      >
        <div
          className={`${
            loading ? "animate-spin" : ""
          } rounded-full h-6 w-6 border-4 border-green-400 border-t-transparent`}
        ></div>
      </div>
    </main>
  );
};

export default LoginStudent;
