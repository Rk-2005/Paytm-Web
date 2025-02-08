import jwt from "jsonwebtoken";
import config from "../config.js";
const { jwtscrect } = config;


const authmiddleware = (req, res, next) => {
  const authheader = req.headers.authorization;
  
  if (!authheader || !authheader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Invalid or missing token" });
  }

  const token = authheader.split(" ")[1]; // Extract the token
  
  try {
    const decoded = jwt.verify(token, jwtscrect);
   
    if (decoded.userId) {
      req.userId = decoded.userId; // Attach userId to the request
      return next();
    }
    return res.status(403).json({ msg: "Forbidden" });
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.status(403).json({ msg: "Invalid token" });
  }
};

export { authmiddleware };
