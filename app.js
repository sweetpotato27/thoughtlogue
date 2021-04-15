const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello Dylan"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/users", users);
app.use("/api/tweets", tweets);

app.listen(port, () => console.log(`Server is running on port ${port}`));