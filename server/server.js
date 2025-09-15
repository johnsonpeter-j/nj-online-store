const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

const seedUsers = require("./seed/seedUsers");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// CORS setup
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
  : ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  await seedUsers();
});

