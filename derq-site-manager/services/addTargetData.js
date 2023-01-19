const Target = require("../DAO/targetSchema");
const sendTwilioMsg = require("../services/sendTwilioMsg");

function addTargetData(targetInfo, res) {
  let newTarget = new Target({
    targetId: targetInfo.targetId,
    firstName: targetInfo.firstName,
    lastName: targetInfo.lastName,
    phoneNumber: targetInfo.phoneNumber,
    email: targetInfo.email,
    eventId: targetInfo.eventId,
    isSubscribed: false,
    timeStamp: new Date().toDateString(),
  });

  newTarget.save((err) => {
    if (err) res.json({ message: "Database error", type: "error" });
    else {
      sendTwilioMsg(
        targetInfo.phoneNumber,
        "Hi " +
          targetInfo.firstName +
          ". \nYou have been added to the Breen Concierge services. \nPlease type 'Accept' to receive service texts or 'Decline' to remove enrollment. \nLooking forward to seeing you onboard."
      );
      res.status(202);
      res.json({
        message: "Created",
        type: "Success",
        target: {
          targetId: targetInfo.targetId,
          firstName: targetInfo.firstName,
          lastName: targetInfo.lastName,
          phoneNumber: targetInfo.phoneNumber,
          email: targetInfo.email,
          eventId: targetInfo.eventId,
          isSubscribed: false,
        },
      });
    }
  });
}

module.exports = addTargetData;
