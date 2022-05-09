require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to developer application." });
});

require("./app/routes/user.routes")(app);

const PORT = process.env.NODE_DOCKER_PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
