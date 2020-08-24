
const mongoose = require("mongoose");
const paymentSchema = mongoose.Schema({
    wash: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wash"
    },
    amount: Number,
    staff: {
        id: { type: mongoose.Schema.Types.ObjectId },
        name: String
    },
    method: String,
    payment_date: { type: Date, default: Date.now }

});

module.exports = mongoose.model("Payment", paymentSchema);