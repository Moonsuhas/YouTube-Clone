/**
 * ============================================================
 * AUTH MIDDLEWARE
 * Validates JWT token passed in the "Authorization" header.
 *
 * Flow:
 *  1. Check if Authorization header exists.
 *  2. Validate the format: should be "Bearer <token>".
 *  3. Extract token and verify using JWT_SECRET.
 *  4. Attach decoded user payload to req.user.
 *  5. Call next() to continue request handling.
 * ============================================================
 */

import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
