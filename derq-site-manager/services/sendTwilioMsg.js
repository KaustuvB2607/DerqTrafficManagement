const accountSid = process.env.TWILLIO_SID;
const authToken = process.env.TWILLIO_AUTH;
const messagingServiceSid = process.env.TWILLIO_MSG_SID;
const client = require("twilio")(accountSid, authToken);

function sendTwilioMsg(phoneNumber, msg) {
  client.messages
    .create({
      body: msg,
      messagingServiceSid: messagingServiceSid,
      to: phoneNumber,
    })
    .then((message) => {
      console.log("Message sent");
    });
}

module.exports = sendTwilioMsg;
