const todoSequelize = require("./src/database/setup/database");
const app = require("./src/server");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { AppRouter } = require("./src/routes");

// Zugriff auf Umgebungsvariablen
// const { PORT } = process.env;
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use(cors());

todoSequelize
  .sync()
  .then(() => {
    console.log("DB has been successfully initialized");
  })
  .catch((e) => {
    console.log(e);
  });
  app.use("/v1", AppRouter);
// App hört im folgenden auf den Port, welcher über die Umgebungsvariable definiert ist
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

