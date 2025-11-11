const Tenant = require("../models/Tenant");

module.exports = async (req, res, next) => {
  try {
    const host = req.headers.host || "";

    // Example:
    // tenant1.localhost:3000 → tenant1
    const subdomain = host.split(".")[0];

    const tenant = await Tenant.findOne({ subdomain });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    req.tenant = tenant;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Tenant resolution failed" });
  }
};
