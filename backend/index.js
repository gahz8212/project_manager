require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const passportConfig = require("./passport");
const { sequelize } = require("./models");
const indexRouter = require("./routes");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const app = express();
passportConfig();
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db 연결됨");
  })
  .catch((e) => {
    console.log(e);
  });
app.set("port", process.env.PORT || 4000);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: { secure: false, httpOnly: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 서버 대기 중.`);
});
