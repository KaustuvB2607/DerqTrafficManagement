const Event = require("../DAO/eventSchema");

function addEventData(eventInfo, res) {
  let newEvent = new Event({
    eventId: eventInfo.eventId,
    eventName: eventInfo.eventName,  
    eventDate: eventInfo.eventDate,
    eventLocation: eventInfo.eventLocation,
  });

  newEvent.save((err) => {
    if (err) res.json({ message: "Database error", type: "error" });
    else {
      res.status(202);
      res.json({
        message: "Created",
        type: "Success",
        event: {
          eventId: eventInfo.eventId,
          eventName: eventInfo.eventName,  
          eventDate: eventInfo.eventDate,
          eventLocation: eventInfo.eventLocation,
        },
      });
    }
  });
}

module.exports = addEventData;
