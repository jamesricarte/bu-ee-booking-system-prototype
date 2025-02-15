import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <main className="flex flex-col gap-4 justify-center items-center h-screen">
      <h3 className="font-bold text-xl">
        Which account type would you register?
      </h3>
      <Link to="/register/student">
        <div className="border border-gray-300 p-4 rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-green-300 hover:text-white">
          <p>Register as a student</p>
        </div>
      </Link>
      <div className="border border-gray-300 p-4 rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-green-300 hover:text-white">
        <p>Register as a professor</p>
      </div>

      <p className="mt-10">
        Already have an account?{" "}
        <Link className="text-green-300" to="/login">
          Login here
        </Link>
      </p>
    </main>
  );
};

export default Register;
