const ChatMessage = require("../DAO/chatMessage");

function addChatMessage(
  targetId,
  phoneNumber,
  date,
  time,
  message,
  isInbox,
  res = null
) {
  let newChatMessage = new ChatMessage({
    targetId: targetId,
    phoneNumber: phoneNumber,
    date: date,
    time: time,
    message: message,
    isInbox: isInbox,
  });

  newChatMessage.save((err) => {
    if (err) {
      console.log("Error while adding new message");
      if (res != null) {
        res.json({ message: "Database error", type: "error" });
      }
    } else {
      console.log("New Message added");
      if (res != null) {
        res.status(202);
        res.json({
          message: "Created",
          type: "Success",
          message: {
            targetId: targetId,
            phoneNumber: phoneNumber,
            date: date,
            time: time,
            message: message,
            isInbox: isInbox,
          },
        });
      }
    }
  });
}

module.exports = addChatMessage;
