const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  name: { type: String, required: true },
  data: String,
  createdAt: { type: Date, default: Date.now }
});

// Index for fast tenant queries
ResourceSchema.index({ tenantId: 1, createdAt: -1 });

module.exports = mongoose.model("Resource", ResourceSchema);
