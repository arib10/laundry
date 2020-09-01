const express                 = require("express"),
      app                     = express(),
      mongoose                = require("mongoose"),
      passport                = require("passport"),
      localStrategy           = require("passport-local"),
      expressSession          = require("express-session"),
      bodyParser              = require("body-parser"),
      Staff                   = require("./models/staff"),
      flash                   = require("connect-flash"),
      passportLocalMongoose   = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/laundry_app");


//Passport SET-UP
app.use(expressSession({
    secret: "Allaah is One",
    resave: false,
    saveUninitialized: false
}));
passport.use(new localStrategy(Staff.authenticate()));
passport.serializeUser(Staff.serializeUser());
passport.deserializeUser(Staff.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());


//================
// USING APPS
//================
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use((req, res, next) => {
    res.locals.currentStaff = req.user;
    res.locals.errorMessage = req.flash("error");
    res.locals.successMessage = req.flash("success");
    next();
});

//============
// ROUTES
//============
//INDEX ROUTE
app.get("/", (req, res) => {
    res.render("index");
});

// SETTING UP ROUTES 
const staffsRoute = require("./routes/staff");
const customersRoute = require("./routes/customer");
const washesRoute = require("./routes/washes");
const paymentsRoute = require("./routes/payment");
app.use(staffsRoute);
app.use(customersRoute);
app.use(washesRoute);
app.use(paymentsRoute);
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Your laundry server is running....");
});

//mongod --storageEngine=mmapv1 --dbpath C:\mongodb\data\db