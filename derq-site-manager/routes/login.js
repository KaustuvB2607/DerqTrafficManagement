const { Router } = require("express");
const passport = require("./shared/passportSettings");

const router = Router();

router.post('/auth', passport.authenticate('local'),  function(req, res) {
    res.json(req.body.username + " logged in");
});

module.exports = router;