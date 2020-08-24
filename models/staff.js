const mongoose = require("mongoose");
const passportLocalMongoose   = require("passport-local-mongoose");

const staffSchema = new mongoose.Schema({
    fullname: String,
    address: String,
    username: String,
    phone: String,
    date_staff_resumed: {type: Date, default: Date.now}
});
staffSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Staff", staffSchema);