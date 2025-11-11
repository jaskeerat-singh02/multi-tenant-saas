const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check tenant isolation
    if (decoded.tenantId !== req.tenant._id.toString()) {
      return res.status(403).json({ message: "Unauthorized for this tenant" });
    }

    req.user = decoded;  // store logged user
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
