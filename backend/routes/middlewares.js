exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.logout(() => {
      req.session.destroy();
    });
    return res.status(411).json("로그인 필요");
  }
};
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    return res.status(412).json("로그인 되어있음");
  }
};
