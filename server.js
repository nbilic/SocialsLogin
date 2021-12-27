const cookieSession = require("cookie-session");
const express = require("express");
const passport = require("passport");
const authRoute = require("./routes/auth.js");
const cors = require("cors");
const app = express();
const passportSetup = require("./passport.js");
require("dotenv").config();

app.use(
  cookieSession({
    name: process.env.SESSION_NAME,
    keys: [process.env.SESSION_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App running on PORT ${PORT}`));
