const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");

router.post("/join", async (req, res) => {
  const { email, name, password, rank } = req.body;
  console.log(email, name, password, rank);
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(400).json("이미 사용중인 이메일 입니다.");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({ email, password: hash, name, rank });
    return res.status(200).json("join_ok");
  } catch (e) {
    return res.status(400).json(e);
  }
});
router.post("/login", async (req, res) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      return res.status(401).json(authError);
    }
    if (!user) {
      return res.status(402).json(info.message);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        return res.status(403).json(loginError);
      } else {
        return res.status(200).json("login_ok");
      }
    });
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
  return req.logout((e) => {
    if (e) {
      return;
    }
    req.session.destroy();
    return res.send("logout_ok");
  });
});
module.exports = router;
