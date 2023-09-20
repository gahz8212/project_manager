const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");
// const CustomerError = require("./CustomError");

router.post("/join", async (req, res) => {
  try {
    const { email, name, password, rank } = req.body;
    // console.log(email, name, password, rank);

    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      throw new Error("이미 사용중인 이메일 입니다.");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({ email, password: hash, name, rank });
    return res.status(200).json("join_ok");
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/login", (req, res) => {
  passport.authenticate("local", (authError, user, info) => {
    try {
      if (authError) {
        throw new Error(authError);
      }
      if (!user) {
        throw new Error(info.message);
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          throw new Error(loginError);
        } else {
          User.update({ status: true }, { where: { id: user.id } });
          req.app.get("io").emit("login_user", user.name);
          return res.status(200).json("login_ok");
        }
      });
    } catch (e) {
      res.status(406).json(e.message);
    }
  })(req, res);
});

router.get("/check", (req, res) => {
  try {
    const { id, name, rank } = req.user;

    return res.status(200).json({ id, name, rank });
  } catch (e) {
    return res.status(400).json(e);
  }
});
router.get("/logout", (req, res) => {
  try {
    const { id, name } = req.user;

    req.app.get("io").emit("logout_user", name);

    return req.logout((e) => {
      if (e) {
        return;
      }
      req.session.destroy();
      User.update({ status: false }, { where: { id } });
      return res.send("logout_ok");
    });
  } catch (e) {
    console.error(e);
  }
});
router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: true },
      attributes: ["name"],
    });
    console.log(users);
    return res.status(200).json(users);
  } catch (e) {
    console.error(e);
  }
});
module.exports = router;
