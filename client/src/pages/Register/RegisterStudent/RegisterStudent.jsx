import React, { useEffect, useRef, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Eye, EyeOff } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const RegisterStudent = () => {
  const [message, setMessage] = useState(null);
  const [messageVisibility, setMessageVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const messageTimeoutRef = useRef(null);

  const [studentUser, setStudentUser] = useState({
    schoolId: "",
    firstName: "",
    lastName: "",
    course: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const handleStudentUserInput = (e) => {
    const { name, value } = e.target;
    setStudentUser({ ...studentUser, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    setShowPassword(false);
    setLoading(true);

    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    const startTime = Date.now();
    let message = { text: "", type: "" };

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentUser),
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
        <p>Please register your account to access Classroom Booking</p>
        <Link to="/register" className="cursor-pointer">
          <IoArrowBack size="26" color="#575757" />
        </Link>
      </div>
      <form className="flex flex-col gap-3" onSubmit={registerUser}>
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label htmlFor="studentId">Student ID:</label>
            <Input
              type="text"
              id="studentId"
              name="schoolId"
              value={studentUser.schoolId}
              required={true}
              onChange={handleStudentUserInput}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstName">First Name:</label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={studentUser.firstName}
              required={true}
              onChange={handleStudentUserInput}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name:</label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={studentUser.lastName}
              required={true}
              onChange={handleStudentUserInput}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="course">Course:</label>
            <Input
              type="text"
              id="course"
              name="course"
              value={studentUser.course}
              required={true}
              onChange={handleStudentUserInput}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <Input
            type="email"
            id="email"
            name="email"
            value={studentUser.email}
            required={true}
            onChange={handleStudentUserInput}
          />
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={studentUser.password}
                required={true}
                onChange={handleStudentUserInput}
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
          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="relative w-full">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={studentUser.confirmPassword}
                required={false}
                onChange={handleStudentUserInput}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer"
              >
                {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>
        </div>
        <Button type="submit">Register</Button>
      </form>
      <p className="mt-12">
        Already have an account?{" "}
        <Link className="text-green-400 hover:opacity-40" to="/login/student">
          Login here
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

export default RegisterStudent;
