exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.json("로그인이 필요 합니다.");
  }
};
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    return res.json("이미 로그인이 되어 있습니다.");
  }
};
