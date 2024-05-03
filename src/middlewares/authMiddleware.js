function authMiddleWare(req, res, next) {
  const accessToken = req.headers.authorization.split(" ")[1];
  if (!accessToken) {
      return res.status(401).send("Access Token fehlt");
    }

    try {
      const decodedToken = verifyAccessToken(accessToken);
      req.userId = decodedToken.userId;
      next();
  } catch (error) {
      console.error(error);
      return res.status(403).send("Ungültiges Access Token");
    }
  };


module.exports = authMiddleWare;
