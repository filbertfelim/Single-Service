import prisma from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findUnique({
      where: { token: req.headers["authorization"].split(" ")[1] },
    });
    const status = "success";

    res.json({
      status: status,
      message: "Success!",
      data: {
        username: users.username,
        name: users.name,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const register = async (req, res) => {
  const { username, password, name, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password don't match!" });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashed,
        name: name,
      },
    });
    const status = "success";

    res.json({ status: status, message: "Registration Success!", data: user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found!" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Wrong Password!" });
    }

    const userId = user.id;
    const jwttoken = jwt.sign(
      { userId, username },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.cookie("Token", jwttoken, { httpOnly: false });
    await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        token: jwttoken,
      },
    });
    res.json({
      status: "success",
      message: "Login Success",
      data: {
        user: {
          username: user.username,
          name: user.name,
        },
        token: jwttoken,
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};
