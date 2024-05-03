const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const UserModel = require("../../database/models/UserModel");
const { decodeAccessToken } = require("../utils/jwtUtils");

const UserRouter = Router();

// GET REQUESTS
UserRouter.get("/currentuser", async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const decodedToken = decodeAccessToken(accessToken);
  if (!decodedToken || !decodedToken.userId) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  }

 const userId = decodedToken.userId;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

module.exports = { UserRouter };
