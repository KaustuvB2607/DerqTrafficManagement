const ChatMessage = require("../DAO/chatMessage");

function deleteChatMessagesByTargetId(targetId, res) {
  ChatMessage.remove({targetId: targetId}, (error, result) => {
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

module.exports = deleteChatMessagesByTargetId;
