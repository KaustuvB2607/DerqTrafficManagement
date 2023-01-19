const { Router } = require("express");
const connectEnsureLogin = require('connect-ensure-login');// authorization


const router = Router();

// de-authentication route
router.post('/exit', connectEnsureLogin.ensureLoggedIn('/login/auth'),  function(req, res) {
	req.logOut();
    res.json("Logged out")
});

module.exports = router;
