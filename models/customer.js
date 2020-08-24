const mongoose = require("mongoose");

customerSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    phone: String,
    address: String,
    washes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wash"
        }
    ],
    date_registered: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Customer", customerSchema);