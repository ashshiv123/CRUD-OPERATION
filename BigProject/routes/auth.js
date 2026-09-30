const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

const serializeUser = (user) => ({
  _id: user._id,
  username: user.username,
  email: user.email,
});

router.get("/me", (req, res) => {
  if (!req.user) {
    return res.json({ user: null });
  }
  res.json({ user: serializeUser(req.user) });
});

router.post(
  "/signup",
  wrapAsync(async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);

      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        res.status(201).json({ user: serializeUser(registeredUser) });
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
);

router.post(
  "/login",
  passport.authenticate("local"),
  wrapAsync(async (req, res) => {
    res.json({ user: serializeUser(req.user) });
  })
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(204).send();
  });
});

module.exports = router;
