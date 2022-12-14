const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const db = require("./config/db");
let cors = require("cors");
const google = require('googleapis');
// const {uploadFile} = require('./app/models/Upload');
const app = express()
const port = 5000

const route = require("./routes/index.route");
app.use(express.static(path.join(__dirname, "public")));
// uploadFile();

//connect db
db.connect();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(methodOverride("_method"));

//Template engine
const hbs = handlebars.engine({
  extname: ".hbs",
  helpers: {
    sum: (a, b) => a + b,
  },
});
app.engine("hbs", hbs);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//HTTP logger
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.render("home");
});

// route innit
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
