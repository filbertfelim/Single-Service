import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "No token provided. Access denied.",
      data: null,
    });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err)
        return res.status(403).json({
          status: "error",
          message: "Token not authorized",
          data: null,
        });
      req.id = decoded.id;
      next();
    });
  }
};

export default verifyToken;
