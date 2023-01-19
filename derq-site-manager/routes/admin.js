const { Router } = require("express");
const addAdmin = require("../services/addAdmin");
const getAllAdminsList = require("../services/getAllAdminsList");
const updateAdmin = require("../services/updateAdmin");
const connectEnsureLogin = require('connect-ensure-login');// authorization

const router = Router();

/* POST Admin data. */
router.post("/create", connectEnsureLogin.ensureLoggedIn('/login/auth'), (req, res) => {
//router.post("/create", (req, res) => { // To add a default admin comment previous line and uncomment this line and add admin data to the CREATE ADMIN endpoint
  let adminInfo = req.body;
  if (
    !adminInfo.username ||
    !adminInfo.password 
  ) {
    res.json({
      message: "Insufficient Information",
      type: "error",
    });
  } else {
    addAdmin(adminInfo, res);
  }
});


/* GET list of Admin data */
//router.get("/list", connectEnsureLogin.ensureLoggedIn('/login/auth'), (req, res) => {
router.get("/list", (req, res) => {
    getAllAdminsList(res);
});

/* Update Admin data for a given Admin id(username) */
router.put("/update", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  let adminInfo = req.body;
  if(!adminInfo.username) {
      res.json({
          message: "Admin name requires",
          type: "error",
      });
  }else {
    updateAdmin(adminInfo, res);
  }
});


module.exports = router;
