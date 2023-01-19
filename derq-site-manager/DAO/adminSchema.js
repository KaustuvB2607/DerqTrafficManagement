const mongoose = require("./baseDAOSettings");
const passportLocalMongoose = require('passport-local-mongoose');

var adminSchema = mongoose.Schema({
    username: String,
    password: String
 });

 adminSchema.plugin(passportLocalMongoose);

 var Admin = mongoose.model("Admin", adminSchema);

 module.exports = Admin;