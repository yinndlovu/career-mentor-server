require("dotenv").config();

const express = require("express");
const http = require("http");
const sequelize = require("./db");

const authRoutes = require("./routes/auth/authRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

const server = http.createServer(app);

app.use("/api", authRoutes);

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
