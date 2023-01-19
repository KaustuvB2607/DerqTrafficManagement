const Event = require("../DAO/eventSchema");

function getEventByEventId(eventId, res) {
  Event.find({eventId: eventId}, (error, result) => {
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

module.exports = getEventByEventId;
