const mongoose = require("mongoose");

const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subdomain: { type: String, unique: true, index: true },
  theme: {
    logo: String,
    primaryColor: String,
    secondaryColor: String,
    font: String
  }
});

module.exports = mongoose.model("Tenant", TenantSchema);
