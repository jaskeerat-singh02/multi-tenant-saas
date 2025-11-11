const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");
const auth = require("../middleware/auth");

// ✅ GET all resources of this tenant
router.get("/", auth, async (req, res) => {
  const items = await Resource.find({ tenantId: req.tenant._id }).sort({ createdAt: -1 });
  res.json(items);
});

// ✅ CREATE a new resource
router.post("/", auth, async (req, res) => {
  const newItem = await Resource.create({
    tenantId: req.tenant._id,
    name: req.body.name,
    data: req.body.data || ""
  });

  res.json(newItem);
});

module.exports = router;
