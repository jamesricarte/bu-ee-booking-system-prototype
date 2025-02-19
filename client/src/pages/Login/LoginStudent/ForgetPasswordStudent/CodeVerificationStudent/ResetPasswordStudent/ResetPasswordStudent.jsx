import React, { useEffect, useRef, useState } from "react";
import Input from "../../../../../../components/Input";
import Button from "../../../../../../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const ResetPasswordStudent = () => {
  const [message, setMessage] = useState(null);
  const [messageVisibility, setMessageVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const messageTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const email = searchParams.get("email");
  const id = searchParams.get("id") || searchParams.get("Id");

  useEffect(() => {
    if (!location.state?.verifiedCode) {
      return navigate("/login/student/account/recover");
    }

    if (!email || !id) {
      return navigate("/login/student/account/recover");
    }
  }, [email, id, location, navigate]);

  const [newPasswordInput, setNewPasswordInput] = useState({
    newPassword: "",
    confirmPassword: "",
    email: email,
    id: id,
    role: "student",
  });

  const handleNewPasswordInput = (e) => {
    const { name, value } = e.target;
    setNewPasswordInput({ ...newPasswordInput, [name]: value });
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    const startTime = Date.now();
    let message = { text: "", type: "" };

    try {
      const response = await fetch(`${API_URL}/api/reset/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPasswordInput),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message || errorData);
      }

      const result = await response.json();
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
          navigate("/login/student/", {
            state: { message: `${message.text} You can now login.` },
          });
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
      <h3 className="font-bold text-2xl">Reset your password</h3>
      <p className="max-w-96 mb-9">
        Create a new password that is at least 8 characters long and include
        uppercase, lowercase, number, and special character.
      </p>

      <form className="flex flex-col gap-3" onSubmit={resetPassword}>
        <div className="flex flex-col gap-1">
          <label htmlFor="newPassword">New Password:</label>
          <div className="relative w-full">
            <Input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={newPasswordInput.newPassword}
              required={true}
              onChange={handleNewPasswordInput}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <label htmlFor="confirmPassword">Confirm Password:</label>

          <div className="relative w-full">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={newPasswordInput.confirmPassword}
              required={true}
              onChange={handleNewPasswordInput}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <Button type="submit">Change Password</Button>
      </form>

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

export default ResetPasswordStudent;
