require("dotenv").config();

const express = require("express");
const http = require("http");
const sequelize = require("./db");

const app = express();
const server = http.createServer(app);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const PORT = process.env.PORT || 7000;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
