import React, { useRef, useState } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const API_URL = import.meta.env.VITE_API_URL;

const ForgetPasswordStudent = () => {
  const [message, setMessage] = useState(null);
  const [messageVisibility, setMessageVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const messageTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const [emailOrStudentInput, setEmailOrStudentIdInput] = useState({
    emailOrStudentId: "",
    role: "student",
  });

  const handleEmailOrStudentIdInput = (e) => {
    const { name, value } = e.target;
    setEmailOrStudentIdInput({ ...emailOrStudentInput, [name]: value });
  };

  const checkUser = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    const startTime = Date.now();
    let result;
    let message = { text: "", type: "" };

    try {
      const response = await fetch(`${API_URL}/api/checkUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailOrStudentInput),
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
          navigate(
            `/login/student/account/verification?email=${result.fetchedUser.email}&id=${result.fetchedUser.studentId}`
          );
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
        <h3 className="font-bold text-2xl">Recover your account</h3>
        <p>Please enter your email or student ID to find your account.</p>
        <Link to="/login/student" className="cursor-pointer">
          <IoArrowBack size="26" color="#575757" />
        </Link>
      </div>

      <form className="flex flex-col gap-3" onSubmit={checkUser}>
        <div className="flex flex-col">
          <label htmlFor="emailOrStudentId">Email or Student ID:</label>
          <Input
            type="text"
            id="emailOrStudentId"
            name="emailOrStudentId"
            value={emailOrStudentInput.emailOrStudentId}
            required={true}
            onChange={handleEmailOrStudentIdInput}
          />
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

export default ForgetPasswordStudent;
