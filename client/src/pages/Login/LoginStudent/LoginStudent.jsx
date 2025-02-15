import React from "react";
import Input from "../../../components/Input";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const API_URL = import.meta.env.VITE_API_URL;

const LoginStudent = () => {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="mb-10">
        <h3 className="font-bold text-2xl">Welcome to Classroom Booking</h3>
        <p>Please login your credentials to access the classrooms.</p>
        <Link to="/login" className="cursor-pointer">
          <IoArrowBack size="26" color="#575757" />
        </Link>
      </div>
      <form className="flex flex-col gap-3" action="">
        <div className="flex flex-col">
          <label htmlFor="">Student ID:</label>
          <Input type="text" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Password:</label>
          <Input type="password" />
        </div>
        <Input
          additionalClassName="bg-green-300 border-0 text-white cursor-pointer"
          type="submit"
          value="Login"
        ></Input>
      </form>
      <p className="mt-12">
        Don't have an account yet?{" "}
        <Link className="text-green-300" to="/register">
          Register here
        </Link>
      </p>
    </main>
  );
};

export default LoginStudent;
