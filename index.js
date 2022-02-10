var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
var client = require("./routes/client");
const path = require("path");
app.use(express.static(path.join(__dirname, "lab", "build")));

app.use(express.static(path.join(__dirname, "client", "build")));
var lab = require("./routes/lab/index");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hamoudi");
});
//-----------------------laboratoire------------------//

app.use("/lab", lab);
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "lab", "build", "index.html"));
});

//-----------------------client------------------//
app.use("/client", client);
app.get("/cl", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.get("/*", (req, res) => {
  res.redirect("/");
});
app.listen(3001, function () {
  console.log("Server listeninng in 3001");
});
