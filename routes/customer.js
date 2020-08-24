const express    = require("express"),
      Customer   = require("../models/customer"),
      Wash   = require("../models/washes"),
      router     = express.Router();

// SHOWS ALL CUSTOMERS
router.get("/customers", isLoggedIn, (req, res) => {
    Customer.find({}, (err, customers) => {
        if (err) {
            console.log(err);
            res.send("An Error Occurred...");
        } else {
            res.render("customer/showall", {customers: customers});
        }
    });
});

// DISPLAYS CUSTOMER REGISTRATION FORM
router.get("/customers/new", isLoggedIn, (req, res) => {
    res.render("customer/register");
});

// ADDS A NEW CUSTOMER
router.post("/customers", isLoggedIn, (req, res) => {
    Customer.create(req.body.customer, (err, customer) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.redirect("/customers/" + customer._id);
        }
    });
});

//SHOW PAGE FOR A CUSTOMER
router.get("/customers/:id", isLoggedIn, (req, res) => {
    Customer.findById(req.params.id).populate("washes").exec( (err, customer) => {
        if (err) {
            console.log(err);
            res.send("An Error Occured..");
        } else {
            res.render("customer/show", {customer: customer});
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;