const mongoose = require("mongoose");
const Tenant = require("../models/Tenant");
const User = require("../models/User");
require("dotenv").config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for seeding");

    // Clean old data
    await Tenant.deleteMany({});
    await User.deleteMany({});

    // Create tenants
    const tenants = await Tenant.insertMany([
      {
        name: "Tenant One",
        subdomain: "tenant1",
        theme: {
          primaryColor: "#4f46e5",
          secondaryColor: "#facc15",
          font: "Arial"
        }
      },
      {
        name: "Tenant Two",
        subdomain: "tenant2",
        theme: {
          primaryColor: "#16a34a",
          secondaryColor: "#f87171",
          font: "Verdana"
        }
      }
    ]);

    const [t1, t2] = tenants;

    // Create users
    await User.create([
      { tenantId: t1._id, email: "admin@t1.com", password: "Admin@123", role: "admin" },
      { tenantId: t1._id, email: "user@t1.com", password: "User@123", role: "user" },

      { tenantId: t2._id, email: "admin@t2.com", password: "Admin@123", role: "admin" },
      { tenantId: t2._id, email: "user@t2.com", password: "User@123", role: "user" }
    ]);

    console.log("✅ Seeded tenants and users successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
})();
