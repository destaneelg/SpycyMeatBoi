// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Tables JSON (DATA)
// =============================================================
var tables = [
  {
    routeName: "table",
    id: "tables",
    name: "Tables",
    email: "email@email.com",
    phoneNumber: "000-000-0000"
  },
];

var waitlist = [
  {
    routeName: "waitlist",
    id: "waitlist",
    name: "Waitlist",
    email: "email@email.com",
    phoneNumber: "000-000-0000"
  },
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

// Displays all tables
app.get("/api/tables", function (req, res) {
  return res.json(tables);
});

// Displays all waitlist
app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});


// Create New Reservation - takes in JSON input
app.post("/api/tables", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newReservation routename
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);
    if(tables.length <= 4){
        tables.push(newReservation);
    } else {
        waitlist.push(newReservation);
        res.json(null);
    }
res.json(newReservation);
});

// Create New Reservation - takes in JSON input
app.post("/api/clear", function (req, res) {
    tables = []
    waitlist = []
  });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
