const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Only users of this tenant can login
  const user = await User.findOne({ email, tenantId: req.tenant._id });

  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid email or password" });

  const token = jwt.sign(
    {
      userId: user._id,
      tenantId: user.tenantId.toString(),
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
});

module.exports = router;
