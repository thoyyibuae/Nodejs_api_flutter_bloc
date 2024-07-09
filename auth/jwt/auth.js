const jwt = require("jsonwebtoken");

// const config = process.env;

const verifyToken = (req, res, next) => {
  
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"]
    || req.headers['authorization'];

    
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
token = token.replace(/^Bearer\s+/, "");
    const  SECRET_KEY="abc123"
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;