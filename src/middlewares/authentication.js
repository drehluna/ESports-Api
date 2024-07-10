import jwt from "jsonwebtoken";

export const jwtMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ error: "no token provenied" });
  }

  try {
    const decoded = jwt.decode(token);
    req.userId = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};
