import React from "react";
import Input from "../../../../../components/Input";
import Button from "../../../../../components/Button";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CodeVerificationStudent = () => {
  const navigate = useNavigate();

  const verifyUser = async (e) => {
    e.preventDefault();
    navigate("/login/student/account/password/reset");
  };
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h3 className="text-2xl font-bold">Acount Verification</h3>
      <p className="mb-10">
        Enter the code that was sent to your email to verify it is you:
      </p>
      <form className="flex flex-col gap-3" onSubmit={verifyUser}>
        <div className="flex flex-col">
          <label htmlFor="code">Code:</label>
          <Input type="text" id="code" name="code" required={true}></Input>
        </div>
        <Button type="submit">Reset password</Button>
      </form>
    </main>
  );
};

export default CodeVerificationStudent;
