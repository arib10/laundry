
const express    = require("express"),
      Customer   = require("../models/customer"),
      Wash       = require("../models/washes"),
      Payment       = require("../models/payment"),
      router     = express.Router();

//DISPLAYS ALL WASHES
router.get("/washes", isLoggedIn, (req, res) => {
    Wash.find({}).populate("customer").exec( (err, washes) => {
        if (err) {
            console.log(err);
            res.send("An Error Occurred...")
        } else {
            console.log(washes);
            res.render("washes/show", {washes: washes});
        }
    });
});

//SHOWS FORM TO ADD A WASH RECORD FOR A CUSTOMER
router.get("/customers/:id/washes/new", isLoggedIn, (req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
        if (err) {
            console.log(err);
            res.send("An Error Occurred...");
        } else {
            res.render("washes/new", {customer: customer});   
        }
    })
});

//ADDS A NEW WASH RECORD FOR A CUSTOMER
router.post("/customers/:id/washes", isLoggedIn, (req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
        if (err) {
            console.log(err);
            res.send("An Error Occurred..");
        } else {
            const newWash = {
                staff: req.user.fullname,
                description: req.body.description,
                wash_types: req.body["wash-types"]
            }
            Wash.create(newWash, (err, wash) => {
                if (err) {
                    console.log(err);
                    res.send("An Error Occurred..");
                } else {
                    console.log(wash);
                    wash.customer.id = req.params.id;
                    wash.customer.name = customer.fullname;
                    wash.save();
                    customer.washes.push(wash);
                    customer.save( (err, resp) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(resp);
                            res.redirect("/customers/" + customer._id);
                        }
                    });
                }
            });
        }
    });
});

//SHOOWS FORM TO ADD PAYMENT FOR A PARTICULAR WASH
router.get("/customers/:id/washes/:wash_id/payment/new", (req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
        if (err) {
            console.log(err);
            res.send("An Error Occurred...");
        } else {
            res.render("payment/new", {washId: req.params.wash_id, customer: customer, staff: req.user.fullname });
        }
    });
});

router.post("/customers/:id/washes/:wash_id/payment/", (req, res) => {
    Wash.findById(req.params.wash_id, (err, wash) => {
        if (err) {
            console.log(err);
            return res.send("An Error Occurred...");
        }
        const newPayment = {
            amount: req.body.amount,
            method: req.body.method,
            wash: wash._id,
            staff: {
                id: req.user.id,
                name: req.user.fullname
            }
        }
        Payment.create(newPayment, (err, payment) => {
            if (err) {
                console.log(err);
                res.send("An Error Occurred...");
            } else {
                wash.payment = payment;
                wash.save();
                console.log(wash);
            }
        })
        wash.payment.status = "Paid";
        wash.payment.id = req.params.wash_id;
        wash.save((err, wash) => {
            if (err) {
                console.log(err);
                return res.send("An Error Occurred...");
            }
            console.log(wash);
            console.log(wash.customer);
            res.redirect("/customers/" + wash.customer.id + "/");
        });
    });
});

//AUTHENTICATION MIDDLEWARE
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
module.exports = router;