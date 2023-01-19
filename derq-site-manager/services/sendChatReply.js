const addChatMessage = require("../services/addChatMessage");

const accountSid = process.env.TWILLIO_SID;
const authToken = process.env.TWILLIO_AUTH;
const messagingServiceSid = process.env.TWILLIO_MSG_SID;
const client = require("twilio")(accountSid, authToken);

function sendChatReply(chatData, res) {
  let targetId = chatData.targetId;
  let phoneNumber = chatData.phoneNumber;
  let replyMsg = chatData.replyMsg;

  client.messages
    .create({
      body: replyMsg,
      messagingServiceSid: messagingServiceSid,
      to: phoneNumber,
    })
    .then((message) => {
      let currentDate = new Date();
      addChatMessage(targetId, phoneNumber, currentDate.toLocaleDateString(), currentDate.toLocaleTimeString(), replyMsg, false, res);
    });
}

module.exports = sendChatReply;
