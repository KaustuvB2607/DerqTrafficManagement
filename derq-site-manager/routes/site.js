const { Router } = require("express");
const addSiteData = require("../services/addSiteData");
const getAllSiteList = require("../services/getAllSiteList");
const getSiteBySiteId = require("../services/getSiteBySiteId");
// const updateAdById = require("../services/updateAdById");
// const pushAdViaTwilio = require("../services/pushAdViaTwilio");
// const connectEnsureLogin = require('connect-ensure-login');// authorization

const router = Router();

/* POST Site data. */
router.post("/create", 
//connectEnsureLogin.ensureLoggedIn('/login/auth'), 
(req, res) => {
  let siteInfo = req.body;
  if (
    !siteInfo.siteID ||
    !siteInfo.siteName ||
    !siteInfo.timezone ||
    !siteInfo.totalDetection 
  ) {
    res.json({
      message: "Insufficient Information",
      type: "error",
    });
  } else {
    addSiteData(siteInfo, res);
  }
});

/* GET list of Ad data for a given event id */
router.get("/list/:siteId", 
//connectEnsureLogin.ensureLoggedIn('/login/auth'), 
(req, res) => {
    let siteId = req.params.siteId;
    if(!siteId) {
        res.json({
            message: "Insufficient Information",
            type: "error",
        });
    }else {
      getSiteBySiteId(siteId, res);
    }
});

/* GET list of Ad data */
router.get("/list", 
//connectEnsureLogin.ensureLoggedIn('/login/auth'), 
(req, res) => {
   getAllSiteList(res);
});

// /* Update Ad data for a given Ad id */
// router.put("/update/:adId", connectEnsureLogin.ensureLoggedIn('/login/auth'), (req, res) => {
//   let adId = req.params.adId;
//   let adInfo = req.body;
//   if(!adId || !(adInfo.adTitle || adInfo.adContent)) {
//       res.json({
//           message: "Insufficient Information",
//           type: "error",
//       });
//   }else {
//       updateAdById(adId, adInfo, res);
//   }
// });

// router.post("/pushAd/:eventId", connectEnsureLogin.ensureLoggedIn('/login/auth'), (req, res) => {
//   let eventId = req.params.eventId;

//   if(!eventId) {
//     res.json({
//         message: "Insufficient Information",
//         type: "error",
//     });
// }else {
//     pushAdViaTwilio(eventId, res);
// }
// });



module.exports = router;
