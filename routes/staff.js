const express       = require("express"),
      router        = express.Router(),
      Staff         = require("../models/staff"),
      passport      = require("passport");

//DISPLAY STAFFS REGISTER FORM
router.get("/register", (req, res) => {
    res.render("staff/register");
});

// ADD NEW STAFF
router.post("/staffs", (req, res) => {
    const newStaff  = new Staff({
        fullname: req.body.fullname,
        username: req.body.username,
        phone: req.body.phone,
        address: req.body.address,
    })
    Staff.register(newStaff, req.body.password, (err, staff) => {
        if (err) {
            console.log(err);
            return res.redirect("/")
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/staffs");
        });
    });
});

// SHOW ALL STAFFS 
router.get("/staffs", isLoggedIn, (req, res) => {
    Staff.find({}, (err, staffs) => {
        if (err) {
            console.log(err);
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
        res.render("staff/show", {staff: logedInStaff});
    });
});

// SHOW STAFF LOGIN FORM
router.get("/login", (req, res) => {
    res.render("staff/login");
});

//STAFF LOGIN LOGIC
router.post("/login", passport.authenticate("local"), (req, res) => {
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
