const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000";

// ON SUCCESFULL LOGIN
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } else {
    console.log("No user found");
  }
});

// ON FAILED LOGIN
router.get("/login/failed", (req, res) => {
  console.log("Login failed");
  res.setStatus(401).send("Failed to login");
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

// LOG IN VIA GOOGLE
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// LOG IN VIA DISCORD
router.get(
  "/discord",
  passport.authenticate("discord", {
    scope: ["identify", "email"],
  })
);
router.get(
  "/discord/callback",
  passport.authenticate("discord", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// LOG IN VIA GITHUB
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

// LOG IN VIA TWITCH
router.get("/twitch", passport.authenticate("twitch"));

router.get(
  "/twitch/callback",
  passport.authenticate("twitch", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
module.exports = router;
