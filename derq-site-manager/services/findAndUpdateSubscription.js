const Target = require("../DAO/targetSchema");

function findAndUpdateSubscription(phoneNumber, subscribe, res = null) {
  Target.find({ phoneNumber: phoneNumber }, (error, result) => {
    if (error) {
      console.log("Database error. Can't update user subscription");
      if (res != null) {
        res.status(400);
        res.json({
          message: "Database error. Can't update user subscription",
          type: "Error",
        });
      }
    } else {
      Target.updateOne({targetId: result[0].targetId}, {isSubscribed: subscribe}, (error, result)=> {
        if (error) {
            console.log("Database error. Can't update user subscription");
            if (res != null) {
              res.status(400);
              res.json({
                message: "Database error. Can't update user subscription",
                type: "Error",
              });
            }
          }else {
            console.log("Subscription updated");
            if (res != null) {
                res.status(200);
                res.type("application/json");
                res.json(result);
              }
          }
      })
    }
  });
}

module.exports = findAndUpdateSubscription;
