const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.use("/abc", (req, res) => {
  const {name} = req.body
  res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/tutorial.routes")(app);
require("./routes/account.routes")(app);

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});