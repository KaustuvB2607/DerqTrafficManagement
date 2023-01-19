const ChatMessage = require("../DAO/chatMessage");

function getChatMessagesByTargetId(targetId, res) {
  ChatMessage.find({targetId: targetId}, (error, result) => {
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

module.exports = getChatMessagesByTargetId;
