const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Tenant = require("../models/Tenant");

// ✅ GET tenant details
router.get("/", auth, (req, res) => {
  res.json(req.tenant);
});

// ✅ UPDATE tenant theme (admin only)
router.put("/theme", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }

  const updated = await Tenant.findByIdAndUpdate(
    req.tenant._id,
    { theme: req.body.theme },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;
