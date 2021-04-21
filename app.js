const mongoose = require('mongoose');
const express = require("express");
const passport = require('passport');
const app = express();
const db = require('./config/keys').mongoURI;


const port = process.env.PORT || 5000;

const users = require("./routes/api/users");
const thoughts = require("./routes/api/thoughts");

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/users", users);
app.use("/api/thoughts", thoughts);

app.listen(port, () => console.log(`Server is running on port ${port}`));