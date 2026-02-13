require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");

// shared database module
const { sequelize } = require("@career-mentor/db-core");

// routes
const authRoutes = require("./routes/auth/authRoutes");
const aiRoutes = require("./routes/ai/aiRoutes");
const userRoutes = require("./routes/user/userRoutes");
const isAdminRequest = require("./middlewares/isAdminRequest");


const app = express();
app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(isAdminRequest);

const server = http.createServer(app);

app.use("/api", authRoutes, aiRoutes, userRoutes);

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
