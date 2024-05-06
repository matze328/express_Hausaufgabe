const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const UserModel = require("../../database/models/UserModel");
const { createAccessToken } = require("../../services/auth/AccessToken");

const AuthRouter = Router();

// POST REQUESTS

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.scope("allData").findOne({ email });

  if (!user || user.password !== password) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  }
  user.password = null;
  
  const accessToken = createAccessToken(user.id);
  res.json({ accessToken });
});

AuthRouter.post("/signup", async (req, res) => {
  const { email, password, name, profileImgUrl } = req.body;

  if (!email || !password || !name || !profileImgUrl) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }

 try {
    const newUser = new UserModel({ email, password, name, profileImgUrl });
    await newUser.save();

   const accessToken = createAccessToken(newUser.id);
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

module.exports = { AuthRouter };
