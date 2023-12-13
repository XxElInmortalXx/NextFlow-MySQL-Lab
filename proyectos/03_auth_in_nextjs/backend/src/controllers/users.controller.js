import jwt from "jsonwebtoken";
import { Users } from "../models/users.model.js";

const userRegister = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username === "" || password === "") {
      res.status(400).json({
        error: "Bad request",
      });
      return
    }
    await Users.create({
      username,
      password,
    });
    res.status(200).json({
      msg: "register...",
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username === "" || password === "") {
      res.status(400).json({
        error: "Bad request",
      });
      return
    }
    // validar que el usuario esté en la DB
    const user = await Users.findOne({ where: { username } });
    if (!user) {
      res.status(400).json({
        error: "User not found",
      });
      return
    }
    if (user.dataValues.password !== password) {
      res.status(400).json({
        error: "Wrong password",
      });
      return
    }
    // generar token
    const token = jwt.sign(
      { user_id: user.dataValues.user_id },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400,
      }
    );
    // mensaje de éxito
    res.status(200).json({
      msg: "login...",
      token,
    });
  } catch (error) {
    res.status(400).json({
      error
    });
  }
};

const getUser = async (req, res) => {
  const user = req.user
  try {
    res.status(200).json({
      msg: user
    })
  } catch (error) {
    res.status(500).json({
      error
    })
  }
}

export { userRegister, userLogin, getUser };
