const express       = require("express"),
      router        = express.Router(),
      Staff         = require("../models/staff"),
      Wash          = require("../models/washes"),
      Payment       = require("../models/payment"),
      passport      = require("passport");

//DISPLAY STAFFS REGISTER FORM
router.get("/register", (req, res) => {
    res.render("staff/register");
});

// ADD NEW STAFF
router.post("/staffs", (req, res) => {
    const newStaff  = {
        fullname: req.body.fullname,
        username: req.body.username,
        phone: req.body.phone,
        address: req.body.address
    };
    Staff.register(newStaff, req.body.password, (err, staff) => {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register")
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/staffs/" + staff._id);
        });
    });
});

// SHOW ALL STAFFS 
router.get("/staffs", isLoggedIn, (req, res) => {
    Staff.find({}, (err, staffs) => {
        if (err) {
            req.flash("error", "Customers couldn't be fetched from the database.");
            res.redirect("/");
        } else {
            res.render("staff/showall", {staffs: staffs});
            console.log(req.user);
        }
    });
});

//SHOW STAFF
router.get("/staffs/:id", isLoggedIn, (req, res) => {
    Staff.findById(req.params.id, (err, logedInStaff) => {
        if (err) {
            console.log(err);
            return res.redirect("/");
        }
        Wash.find({staff: logedInStaff.fullname}, (err, washes) => {
            if (err) {
                console.log(err);
                return res.send("An Error Occurred...");
            }
            Payment.find({staff: {id: {_id: req.params.id}, name: logedInStaff.fullname}}, (err, payments) => {
                if (err) {
                    console.log(err);
                    return res.send("An Error Occurred....");
                }
                res.render("staff/show", {staff: logedInStaff, washes: washes, payments: payments});
            })
        })
    });
});

// SHOW STAFF LOGIN FORM
router.get("/login", (req, res) => {
    res.render("staff/login");
});

//STAFF LOGIN LOGIC
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: "You must have entered an incorrect username or password."
}), (req, res) => {
    res.redirect("/staffs/" + req.user._id);
});

//STAFF LOGOUT LOGIC
router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/")
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
