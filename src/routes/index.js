const { Router } = require("express");
const { AuthRouter } = require("./auth");
const { UserRouter } = require("./users");
const authMiddleWare = require("../middlewares/authMiddleware");
const AppRouter = Router();

AppRouter.use("/auth", AuthRouter);

const authMiddleware = (req, res, next) => {

    console.log("Auth Middleware wurde aufgerufen");
    next();
};

AppRouter.use("/users", authMiddleWare, UserRouter);

module.exports = { AppRouter };
