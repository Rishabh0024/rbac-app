const express = require("express");
const createHttpError = require("http-errors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");
const connectFlash = require("connect-flash");
const passport = require("passport");
// const connectMongo = require("connect-mongo");
const MongoStore = require("connect-mongo");
const connectEnsureLogin = require("connect-ensure-login");
const { roles } = require("./utils/constants");
const compression = require("compression");

const app = express();

app.use(
  compression({
    level: 6,
    threshold: 0,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

const oneDay = 86400000;

app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.static("public", { maxAge: oneDay }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const MongoStore = connectMongo(session);

// Init Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: true,
      httpOnly: true,
    },
    store: MongoStore.create({
      // mongooseConnection: mongoose.connection
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// for Passport JS Authentication
app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport.auth");

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// for Flash Messages
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Routes
app.use("/", require("./routes/index.route"));

app.use("/auth", require("./routes/auth.route"));

app.use(
  "/user",
  connectEnsureLogin.ensureLoggedIn({ redirectTo: "/auth/login" }),
  require("./routes/user.route")
);

app.use(
  "/admin",
  connectEnsureLogin.ensureLoggedIn({ redirectTo: "/auth/login" }),
  ensureAdmin,
  require("./routes/admin.route")
);

app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.render("error_40x", { error });
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`server running in port http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect("/auth/login");
//   }
// }

function ensureAdmin(req, res, next) {
  if (req.user.role === roles.admin) {
    next();
  } else {
    req.flash("warning", "You are not authorized to see this route.");
    res.redirect("/");
  }
}

// function ensureModerator(req, res, next) {
//   if (req.user.role === roles.moderator) {
//     next();
//   } else {
//     req.flash("warning", "You are not authorized to see this route.");
//     res.redirect("/");
//   }
// }
