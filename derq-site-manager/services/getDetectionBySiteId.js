const Detection = require("../DAO/detectionSchema");

function getDetectionBySiteId(siteId, res) {
  console.log("SITE ID");
  console.log(siteId);
  Detection.find({"siteId": String(siteId)}, (error, result) => {
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

module.exports = getDetectionBySiteId;
