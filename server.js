const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

app.set("trust proxy", true);

app.use(cors());

app.use(express.static(path.join(__dirname, "build")));

app.get("/", cors(), (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("App running on port", PORT);
});
