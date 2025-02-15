import React, { useEffect, useState } from "react";
import Input from "../../../components/Input";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const API_URL = import.meta.env.VITE_API_URL;

const RegisterStudent = () => {
  const [message, setMessage] = useState(null);
  const [messageVisibility, setMessageVisibility] = useState(false);

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
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      setMessage({ text: result.message, type: "success" });
    } catch (error) {
      console.log(error);

      let errorMessage = error.message;

      if (error.message === "Failed to fetch") {
        errorMessage =
          "Unable to connect to the server. Check your internet connection";
      }

      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setMessageVisibility(true);

      setTimeout(() => {
        setMessageVisibility(false);
      }, 5000);
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
        <div className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            id="password"
            name="password"
            value={studentUser.password}
            required={true}
            onChange={handleStudentUserInput}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={studentUser.confirmPassword}
            required={false}
            onChange={handleStudentUserInput}
          />
        </div>
        <Input
          additionalClassName="bg-green-300 border-0 text-white cursor-pointer"
          type="submit"
          value="Register"
        ></Input>
      </form>
      <p className="mt-12">
        Already have an account?{" "}
        <Link className="text-green-300" to="/login">
          Login here
        </Link>
      </p>

      <div
        className={`text-white rounded-md p-3 fixed left-1/2 transform -translate-x-1/2 transition-all duration-300 ease ${
          messageVisibility
            ? "top-12 opacity-100 pointer-events-auto"
            : "-top-24 opacity-0 pointer-events-none"
        } ${message?.type === "success" ? "bg-green-400" : "bg-red-400"}`}
      >
        <p>{message?.text}</p>
      </div>
    </main>
  );
};

export default RegisterStudent;
