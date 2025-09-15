const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const userRoutes = require("./routes/user.routes");
const colorRoutes = require("./routes/color.routes");
const productRoutes = require("./routes/product.routes");
const sizeRoutes = require("./routes/size.routes");
const tagRoutes = require("./routes/tag.routes");

const seedUsers = require("./seed/seedUsers");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// CORS setup
const allowedOrigins = process.env.CORS_ORIGINS.split(",");

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
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/tags", tagRoutes);
app.use("/color", colorRoutes);
app.use("/size", sizeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  await seedUsers();
});

