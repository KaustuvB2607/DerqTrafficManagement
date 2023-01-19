const Ad = require("../DAO/adSchema");

function updateAdById(adId, adInfo, res) {
 
  let updatedAd = {};
  if (adInfo.adTitle) {
    updatedAd["adTitle"] = adInfo.adTitle;
  }

  if (adInfo.adContent) {
    updatedAd["adContent"] = adInfo.adContent;
  }
  
  Ad.updateOne({"adId": adId}, {...updatedAd}, (err) => {
    if (err) res.json({ message: "Database error", type: "error" });
    else {
      res.status(200);
      res.json({
        message: "Updated",
        type: "Success",
        ad: {
          adId: adId,
          ...updatedAd
        },
      });
    }
  });
}

module.exports = updateAdById;
