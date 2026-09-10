const express = require('express');
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
const session = require('express-session');

app.use(session({
    secret: 'replace-this-with-a-long-random-string',
    resave: false,
    saveUninitialized: false
}));
app.use(userRouter);
app.use("/host", hostRouter);
app.use(express.static('public'));
app.use(express.static(path.join(rootDir, 'public')));

app.use(errorController.PageNotFound);

const PORT = 5001;
mongoConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on address http://localhost:${PORT}`);
    });
});