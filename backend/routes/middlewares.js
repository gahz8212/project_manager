exports.isLoggedIn = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      next();
    } else {
      req.logout(() => {
        req.session.destroy();
      });
      throw new Error("로그인이 필요 합니다.");
    }
  } catch (e) {
    return res.status(405).json(e.message);
  }
};
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    return res.status(412).json("로그인이 되어있음");
  }
};
