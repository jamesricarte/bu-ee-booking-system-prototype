import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Login from "./pages/Login/Login";
import LoginStudent from "./pages/Login/LoginStudent/LoginStudent";
import ForgetPasswordStudent from "./pages/Login/LoginStudent/ForgetPasswordStudent/ForgetPasswordStudent";
import CodeVerificationStudent from "./pages/Login/LoginStudent/ForgetPasswordStudent/CodeVerificationStudent/CodeVerificationStudent";
import ResetPasswordStudent from "./pages/Login/LoginStudent/ForgetPasswordStudent/CodeVerificationStudent/ResetPasswordStudent/ResetPasswordStudent";
import Register from "./pages/Register/Register";
import RegisterStudent from "./pages/Register/RegisterStudent/RegisterStudent";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/login/student" element={<LoginStudent />}></Route>
      <Route
        path="/login/student/account/recover"
        element={<ForgetPasswordStudent />}
      ></Route>
      <Route
        path="/login/student/account/verification"
        element={<CodeVerificationStudent />}
      ></Route>
      <Route
        path="/login/student/account/password/reset"
        element={<ResetPasswordStudent />}
      ></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/register/student" element={<RegisterStudent />}></Route>
    </Routes>
  );
};

export default App;
