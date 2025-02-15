const express = require("express");
const db = require("../config/db");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", (req, res) => {});

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
    const checkSchoolId = `SELECT * FROM  ${role}user WHERE ${idColumn} = ?`;
    db.query(checkSchoolId, [user.schoolId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.length > 0) {
        return res.status(400).json({
          exists: true,
          message: "The used school Id was already registered.",
        });
      }

      const checkUser = `SELECT * FROM ${role}user WHERE email = ?`;
      db.query(checkUser, [user.email], async (err, result) => {
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
          const registerStudentUser = `INSERT INTO ${role}user (studentId, firstName, lastName, course, email, password) VALUES(?,?,?,?,?,?)`;
          db.query(
            registerStudentUser,
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
          const registerProfessorUser = `INSERT INTO ${role}user (schoolId, firstName, lastName, department, email, password) VALUES(?,?,?,?,?,?)`;
          db.query(
            registerProfessorUser,
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
      });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/", (req, res) => {});
router.delete("/", (req, res) => {});

module.exports = router;
