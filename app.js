require('dotenv').config();

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
app.use(express.static(path.join(rootDir, 'public')));

app.use(async (req, res, next) => {
    try {
        await mongoConnect();
        next();
    } catch (error) {
        next(error);
    }
});

app.use(userRouter);
app.use("/host", hostRouter);
app.use(errorController.PageNotFound);

if (require.main === module) {
    const port = process.env.PORT || 5001;
    mongoConnect()
        .then(() => {
            app.listen(port, () => {
                console.log(`Server running on address http://localhost:${port}`);
            });
        })
        .catch(error => {
            console.error('Unable to start the server. Check your MONGODB_URI in .env.', error);
            process.exitCode = 1;
        });
}

module.exports = app;
