require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const tenantResolver = require("./middleware/tenantResolver");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Tenant resolution for ALL routes
app.use(tenantResolver);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/resources", require("./routes/resources"));
app.use("/api/tenants", require("./routes/tenants"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
