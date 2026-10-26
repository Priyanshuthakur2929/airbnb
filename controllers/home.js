const Home = require('../models/home');  //const Home = require('../models/home');
const Favourite = require('../models/favourite');  //Favourite → model for marking homes as favourites

exports.getAddHome = (req, res, next) => {
    res.render('host/AddHome');
};

exports.postAddHome = async (req, res, next) => {
    const { name, location, price, image, rating } = req.body;
    const newHome = new Home(name, '', image, price, location, rating);
    try {
        await newHome.save();
        res.render('host/homeRegistered', { home: newHome });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error saving home');
    }
};

exports.getHostHomeList = async (req, res, next) => {
    try {
        const homeRegistered = await Home.fetchAll();
        res.render('host/hosthomelist', { homeRegistered });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching homes');
    }
};

exports.postAddToFavourite = async (req, res, next) => {
    try {
        await Favourite.addToFavourite(req.body.id);
        res.redirect("/favourite-list");
    } catch (error) {
        next(error);
    }
};

exports.getEditHome = async (req, res, next) => {
    const homeId = req.params.homeId;
    try {
        const home = await Home.findById(homeId);
        if (!home) return res.status(404).send('Home not found');
        res.render('host/EditHome', { home });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching home');
    }
};

exports.postEditHome = async (req, res, next) => {
    const homeId = req.params.homeId;
    const { name, location, price, image, rating } = req.body;
    try {
        await Home.updateById(homeId, {
            houseName: name,
            location,
            price,
            imageURL: image,
            rating
        });
        res.redirect('/host/hosthomelist');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating home');
    }
};

exports.postDeleteHome = async (req, res, next) => {
    const homeId = req.params.homeId;
    try {
        await Home.deleteById(homeId);
        res.redirect('/host/hosthomelist');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting home');
    }
};