'use strict';

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

const googleMaps = require("./server/routes/google-maps");

const PORT = process.env.PORT || 8080;

app.set("trust proxy", true);

app.use(cors());
app.use('/api/maps', googleMaps);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
