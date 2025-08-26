const router = require("express").Router();

router.get("/profile", async (req, res, next) => {
  // // console.log(req.user);
  // const person = req.user;
  // delete person.__v;

  let person = req.user.toObject ? req.user.toObject() : req.user; // ensure plain object
  delete person.password;
  delete person.__v;
  res.render("profile", { person });
});

module.exports = router;
