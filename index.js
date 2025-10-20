require("dotenv").config();

const express = require("express");
const http = require("http");
const sequelize = require("./db");
const cors = require("cors");

const authRoutes = require("./routes/auth/authRoutes");
const aiRoutes = require("./routes/ai/aiRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

const server = http.createServer(app);

app.use("/api", authRoutes, aiRoutes);

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
