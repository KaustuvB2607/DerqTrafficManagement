const Ad = require("../DAO/adSchema");
const Target = require("../DAO/targetSchema");

const accountSid = process.env.TWILLIO_SID;
const authToken = process.env.TWILLIO_AUTH;
const messagingServiceSid = process.env.TWILLIO_MSG_SID;
const client = require("twilio")(accountSid, authToken);

function pushAdViaTwilio(eventId, res) {
  Ad.find({ eventId: eventId }, (error, result) => {
    if (error) {
      res.status(400);
      res.json({
        message: "Database error",
        type: "Error",
      });
    } else {
      let ad = result[0];
      Target.find(
        { $and: [{ eventId: eventId }, { isSubscribed: true }] },
        (error, result) => {
          if (error) {
            res.status(400);
            res.json({
              message: "Database error",
              type: "Error",
            });
          } else {
            let targetList = result.map((target) => target.phoneNumber);
            pushAdToTwilio(targetList, ad.adContent, res);
          }
        }
      );
    }
  });
}

function pushAdToTwilio(targetList, ad, res) {
  if (targetList.length === 0) {
    res.status(400);
    res.json({ message: "No subscribed user for the event", type: "Error" });
  } else {
    targetList.forEach((target) => {
      client.messages
        .create({
          body: ad,
          messagingServiceSid: messagingServiceSid,
          to: target,
        })
        .then((message) => {
          res.status(200);
          res.json({ SID: message.sid, status: message.status });
        });
    });
  }
}

module.exports = pushAdViaTwilio;
