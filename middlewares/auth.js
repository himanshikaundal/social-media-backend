const jsonwebtoken = require("jsonwebtoken");
function auth(req, res, next) {
  
  if (!req.headers.authorization)
    return next(createError(401, "invalid authorization token"));
  if (!req.headers.authorization.startsWith("Bearer ")) {
    return next(createError(401, "invalid authorization token"));
  }
  token = req.headers.authorization.substring(
    7,
    req.headers.authorization.length
  );
  const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  
  if (!(decoded && decoded.data))
    return next(createError(401, "invalid authorization token"));
  req.loggedInUser = decoded.data;
  next();
}
module.exports = auth;
