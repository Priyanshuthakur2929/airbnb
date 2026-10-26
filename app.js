require('dotenv').config();

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const { MongoStore } = require('connect-mongo');
const userRouter = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtil');
const path = require('path');
const errorController = require('./controllers/errors');
const { mongoConnect } = require('./utils/databaseUtil');

if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is required');
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));
app.set('trust proxy', 1);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use(async (req, res, next) => {
    try {
        await mongoConnect();
        next();
    } catch (error) {
        next(error);
    }
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
        clientPromise: mongoConnect().then(() => mongoose.connection.getClient()),
        dbName: 'airbnb',
        collectionName: 'sessions'
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 14 * 24 * 60 * 60 * 1000
    }
}));

app.use(userRouter);
app.use('/host', hostRouter);
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
            console.error('Unable to start the server. Check MONGODB_URI and database access.', error);
            process.exitCode = 1;
        });
}

module.exports = app;
