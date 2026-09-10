const express = require('express');
const hostRouter = express.Router();
const {
    getAddHome,
    postAddHome,
    getHostHomeList,
    postAddToFavourite,
    getEditHome,
    postEditHome,
    postDeleteHome
} = require('../controllers/home');

hostRouter.get("/add-home", getAddHome);
hostRouter.post("/add-home", postAddHome);
hostRouter.get("/hosthomelist", getHostHomeList);
hostRouter.post('/favourite-list', postAddToFavourite);

hostRouter.get('/edit-home/:homeId', getEditHome);
hostRouter.post('/edit-home/:homeId', postEditHome);
hostRouter.post('/delete-home/:homeId', postDeleteHome);

module.exports = { hostRouter };