const mongoose = require("./baseDAOSettings");

var detectionSchema = mongoose.Schema({
    dateTime: String,
    class: String,  
    approach: String,
    movement: String,
    lane: String,
    siteId: String
 });
 var Detection = mongoose.model("Detection", detectionSchema);

 module.exports = Detection;    