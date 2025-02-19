import React, { useEffect, useRef, useState } from "react";
import Input from "../../../../../components/Input";
import Button from "../../../../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CodeVerificationStudent = () => {
  const [message, setMessage] = useState(null);
  const [messageVisibility, setMessageVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const messageTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const email = searchParams.get("email");
  const id = searchParams.get("id") || searchParams.get("Id");

  const [codeInput, setCodeInput] = useState({
    codeInput: "",
    studentId: id,
    email: email,
    role: "student",
  });

  useEffect(() => {
    if (!email || !id) {
      return navigate("/login/student/account/recover");
    }

    checkUserCode();
  }, [email, id, navigate]);

  const checkUserCode = async () => {
    try {
      const response = await fetch(`${API_URL}/api/code/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, id, role: "student" }),
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
    } catch (error) {
      console.error(error);
      navigate("/login/student/account/recover");
    }
  };

  const handleCodeInput = (e) => {
    const { name, value } = e.target;
    setCodeInput({ ...codeInput, [name]: value });
  };

  const authenticateCode = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    const startTime = Date.now();
    let result;
    let message = { text: "", type: "" };

    try {
      const response = await fetch(`${API_URL}/api/code/verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(codeInput),
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
            `/login/student/account/password/reset?email=${result.fetchedUser.email}&id=${result.fetchedUser.studentId}`,
            { state: { verifiedCode: true } }
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
      <h3 className="text-2xl font-bold">Acount Verification</h3>
      <p className="mb-10">
        Enter the code that was sent to your email to verify it is you:
      </p>
      <form className="flex flex-col gap-3" onSubmit={authenticateCode}>
        <div className="flex flex-col">
          <label htmlFor="codeInput">Code:</label>
          <Input
            type="text"
            id="codeInput"
            name="codeInput"
            value={codeInput.codeInput}
            required={true}
            onChange={handleCodeInput}
          ></Input>
        </div>
        <Button type="submit">Reset password</Button>
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

export default CodeVerificationStudent;
