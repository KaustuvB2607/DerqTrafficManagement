const mongoose = require("./baseDAOSettings");

var siteSchema = mongoose.Schema({
    siteID: String,
    siteName: String,  
    timezone: String,
    totalDetection: String
 });
 var Site = mongoose.model("Site", siteSchema);

 module.exports = Site;