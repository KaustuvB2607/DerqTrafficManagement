const Target = require("../DAO/targetSchema");

function getTargetsByEventId(eventId, res) {
    Target.find({eventId: eventId}, (error, result) => {
        if(error) {
          res.status(400);
          res.json({
            message: "Database error",
            type: "Error"
          })
        }else {
          res.status(200);
          res.type("application/json");
          res.json(result);
        }
      })
}

module.exports = getTargetsByEventId;
