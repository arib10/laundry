const mongoose = require("mongoose");

const washSchema = mongoose.Schema({
    customer: {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },
        name: String
    },
    staff: String,
    wash_types: [
        {type: String}
    ],
    description: String,
    payment: {
        status: {type: String, default: "not-paid"},
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment"
        }
    },
    date_of_wash: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Wash", washSchema);


