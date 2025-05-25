const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/config");

const verifyToken = (req, res, next, roles) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        const errorMessage =
          err.name === "TokenExpiredError"
            ? "Token expired"
            : "Invalid token";
        return res.status(401).json({ message: errorMessage });
      } else if (roles.includes(decoded.user.role)) {
        req.user = decoded.user;  // Attach the user data to req.user
        if (decoded.user.role === "admin" && !decoded.user.isPasswordChanged) {
          // Allow access to the change-password route even if password change is required
          return next();
        }
        next();
      } else {
        return res.status(403).json({ message: "Access denied" });
      }
    });
  } else {
    return res.status(403).json({ message: "Token not provided " });
  }
};

exports.checkAdminToken = (req, res, next) => verifyToken(req, res, next, ["admin"]);
exports.checkUserToken = (req, res, next) => verifyToken(req, res, next, ["user"]);
exports.checkAllToken = (req, res, next) => verifyToken(req, res, next, ["admin", "user"]);