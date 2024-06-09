var express = require("express");
const { isAuthenticatedForPages } = require("../../middlewares/isAuth");
const { contact } = require("../../actions");
var router = express.Router();

router.get("/", async function (req, res, next) {
  res.render("pages/login");
});
router.get("/home",isAuthenticatedForPages, async function (req, res, next) {
  res.render("pages/homepage");
});
router.get("/contact/add",isAuthenticatedForPages, async function (req, res, next) {
  res.render("pages/add-contact");
});
router.get("/contact/edit/:id",isAuthenticatedForPages, async function (req, res, next) {
    const data =  await contact.get( req.params.id ,req.user);
    console.log(data)
  res.render("pages/edit-contact", {data});
});

module.exports = router;
