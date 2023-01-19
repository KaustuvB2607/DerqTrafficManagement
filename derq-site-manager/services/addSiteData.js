const Site = require("../DAO/siteSchema");

function addSiteData(siteInfo, res) {
      
  let newSite = new Site({
    siteID: siteInfo.siteID,
    siteName: siteInfo.siteName,
    timezone: String(siteInfo.timezone),
    totalDetection: String(siteInfo.totalDetection),
  });

  newSite.save((err) => {
    if (err) res.json({ message: "Database error", type: "error" });
    else {
      res.status(202);
      res.json({
        message: "Created",
        type: "Success",
        site: {
          siteID: siteInfo.siteID,
          siteName: siteInfo.siteName,
          timezone: String(siteInfo.timezone),
          totalDetection: String(siteInfo.totalDetection),
        },
      });
    }
  });
}

module.exports = addSiteData;
