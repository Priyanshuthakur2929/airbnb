require('dotenv').config();

const express = require('express');
const session = require('express-session');
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const path = require('path');
const errorController = require("./controllers/errors");
const { mongoConnect } = require('./utils/databaseUtil');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));
app.use(express.urlencoded());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(userRouter);
app.use("/host", hostRouter);
app.use(express.static('public'));
app.use(express.static(path.join(rootDir, 'public')));

app.use(errorController.PageNotFound);

const PORT = process.env.PORT || 5001;
mongoConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on address http://localhost:${PORT}`);
    });
});