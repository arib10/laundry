const express  = require("express"),
      Payment  = require("../models/payment"),
      router   = express.Router();

router.get("/payments/:id", (req, res) => {
    Payment.findById(req.params.id, (err, payment) => {
        if (err) {
            console.log(err);
            req.flash("error", "Couldn't find payment record with ID: " + req.params.id);
            return res.redirect("/washes");
        }
        console.log(payment);
        res.send(payment.wash.description);
    })
});

module.exports = router;