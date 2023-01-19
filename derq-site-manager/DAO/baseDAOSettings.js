const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/site-manager-db", {useNewUrlParser: true});

var db = mongoose.connection;

db.error("error", console.error.bind(console, "CONNECTION_ERROR"));
db.once("open", function() {
    console.log("Connected");
})

module.exports = mongoose;