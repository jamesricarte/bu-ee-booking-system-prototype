const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
const db = require("../config/db");
const bcrypt = require("bcrypt");

const router = express.Router();

const generateCode = () => Math.floor(100000 + Math.random() * 900000);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS,
  },
});

router.get("/", (req, res) => {});

//login
router.post("/login", async (req, res) => {
  const user = req.body;
  try {
    if (
      Object.values(user).includes("") ||
      Object.values(user).includes(null) ||
      Object.values(user).includes(undefined)
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const role = user.role === "student" ? "student" : "professor";

    const idColumn = user.role === "student" ? "studentId" : "schoolId";
    db.query(
      `SELECT * FROM  ${role}user WHERE ${idColumn} = ?`,
      [user.schoolId],
      async (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
          return res
            .status(400)
            .json({ message: `Invalid ${role} ID or password` });
        }

        const fetchedUser = results[0];

        const passwordMatch = await bcrypt.compare(
          user.password,
          fetchedUser.password
        );
        if (passwordMatch) {
          res.status(200).json({ message: "Login Successfull!", fetchedUser });
        } else {
          res.status(401).json({ message: `Your password is incorrect.` });
        }
      }
    );
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//register
router.post("/register", async (req, res) => {
  const user = req.body;
  try {
    if (
      Object.values(user).includes("") ||
      Object.values(user).includes(null) ||
      Object.values(user).includes(undefined)
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (user.password !== user.confirmPassword) {
      return res
        .status(400)
        .json({ message: "Your confirmation password does not match" });
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        user.password
      )
    ) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const role = user.role === "student" ? "student" : "professor";

    const idColumn = user.role === "student" ? "studentId" : "schoolId";
    db.query(
      `SELECT * FROM  ${role}user WHERE ${idColumn} = ?`,
      [user.schoolId],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (result.length > 0) {
          return res.status(400).json({
            exists: true,
            message: "This school Id was already registered.",
          });
        }

        db.query(
          `SELECT * FROM ${role}user WHERE email = ?`,
          [user.email],
          async (err, result) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            if (result.length > 0) {
              return res.status(400).json({
                exists: true,
                message: "Email is already registered",
              });
            }

            const hashedPassword = await bcrypt.hash(user.password, 10);
            if (role === "student") {
              db.query(
                `INSERT INTO ${role}user (studentId, firstName, lastName, course, email, password) VALUES(?,?,?,?,?,?)`,
                [
                  user.schoolId,
                  user.firstName,
                  user.lastName,
                  user.course,
                  user.email,
                  hashedPassword,
                ],
                (err, result) => {
                  if (err) {
                    return res.status(500).json({ error: err.message });
                  }

                  res.status(201).json({
                    message: "Student account was registered successfully.",
                    id: result.insertId,
                  });
                  console.log(
                    `${user.lastName} student account is registered successfully.`
                  );
                }
              );
            } else {
              db.query(
                `INSERT INTO ${role}user (schoolId, firstName, lastName, department, email, password) VALUES(?,?,?,?,?,?)`,
                [
                  user.schoolId,
                  user.firstName,
                  user.lastName,
                  user.department,
                  user.email,
                  hashedPassword,
                ],
                (err, result) => {
                  if (err) {
                    return res.status(500).json({ error: err.message });
                  }

                  res.status(201).json({
                    message: "Professor account was registered successfully.",
                    id: result.insertId,
                  });
                  console.log(
                    `${user.lastName} professor account is registered successfully.`
                  );
                }
              );
            }
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Forget password
router.post("/checkUser", async (req, res) => {
  const user = req.body;
  const code = generateCode();

  try {
    if (
      Object.values(user).includes("") ||
      Object.values(user).includes(null) ||
      Object.values(user).includes(undefined)
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const role = user.role === "student" ? "student" : "professor";
    const idColumn = user.role === "student" ? "studentId" : "schooId";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const studentIdRegex = /^[a-zA-Z0-9]+$/;

    let columnName = "";
    if (emailRegex.test(user.emailOrStudentId)) {
      columnName = "email";
    } else if (studentIdRegex.test(user.emailOrStudentId)) {
      columnName = idColumn;
    } else {
      return res
        .status(400)
        .json({ message: `Invalid email or ${role} ID format.` });
    }

    db.query(
      `SELECT * FROM  ${role}user WHERE ${columnName} = ?`,
      [user.emailOrStudentId],
      async (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
          return res
            .status(400)
            .json({ message: "Account is not yet registered" });
        }

        const fetchedUser = results[0];

        db.query(
          `UPDATE ${role}user SET resetCode = ? WHERE email = ?`,
          [code, fetchedUser.email],
          async (err, results) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            const mailOptions = {
              from: process.env.ADMIN_EMAIL,
              to: fetchedUser.email,
              subject: "Password Reset Code",
              text: `Your password reset code is: ${code}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                return res
                  .status(500)
                  .json({ message: "Email failed to send" });
              }

              res.json({
                message: "Code sent successfully",
                info,
                fetchedUser,
              });
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Verify if the user have code
router.post("/code/check", async (req, res) => {
  const { email, id, role } = req.body;

  try {
    if (
      Object.values({ email, id, role }).includes("") ||
      Object.values({ email, id, role }).includes(null) ||
      Object.values({ email, id, role }).includes(undefined)
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const idColumn = role === "student" ? "studentId" : "schoolId";
    db.query(
      `SELECT resetCode FROM ${role}user WHERE email = ? AND ${idColumn} = ?`,
      [email, id],
      async (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
          return res.status(400).json({ message: "Account was not found." });
        }

        const resetCode = result[0];

        if (resetCode.resetCode === null) {
          res.status(400).json({ message: "Code is not present" });
        } else {
          res.status(200).json({ message: "Code is present" });
        }
      }
    );
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Code Verification
router.post("/code/verification", async (req, res) => {
  const code = req.body;

  try {
    if (
      Object.values(code).includes("") ||
      Object.values(code).includes(null) ||
      Object.values(code).includes(undefined)
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const role = code.role === "student" ? "student" : "professor";
    const idColumn = code.role === "student" ? "studentId" : "schoolId";
    const idValue = code.hasOwnProperty("studentId")
      ? code.studentId
      : code.professorId;
    db.query(
      `SELECT * FROM ${role}user WHERE ${idColumn} = ? AND email = ?`,
      [idValue, code.email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
          return res.status(400).json({ message: "Account was not found." });
        }

        const fetchedUser = result[0];

        if (fetchedUser.resetCode === code.codeInput) {
          db.query(
            `UPDATE ${role}user SET resetCode = ? WHERE email = ? AND ${idColumn} = ?`,
            [null, code.email, idValue],
            async (err, result) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }

              res.status(200).json({
                message: "Code verified, you can now reset your password!",
                fetchedUser,
              });
            }
          );
        } else {
          res.status(400).json({ message: "Invalid Code" });
        }
      }
    );
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Reset password
router.put("/reset/password", async (req, res) => {
  const user = req.body;

  try {
    if (
      Object.values(user).includes("") ||
      Object.values(user).includes(null) ||
      Object.values(user).includes(undefined)
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (user.newPassword !== user.confirmPassword) {
      return res
        .status(400)
        .json({ message: "Your confirmation password does not match" });
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        user.newPassword
      )
    ) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const role = user.role === "student" ? "student" : "professor";
    const idColumn = user.role === "student" ? "studentId" : "schoolId";
    const hashedPassword = await bcrypt.hash(user.newPassword, 10);
    db.query(
      `SELECT * FROM ${role}user WHERE email = ? AND ${idColumn} = ?`,
      [user.email, user.id],
      async (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
          return res.status(400).json({ message: "Account was not found" });
        }

        db.query(
          `UPDATE ${role}user SET password = ? WHERE email = ? AND ${idColumn} = ?`,
          [hashedPassword, user.email, user.id],
          async (err, result) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            res
              .status(200)
              .json({ message: "Password was changed successfully!" });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/", (req, res) => {});

module.exports = router;
