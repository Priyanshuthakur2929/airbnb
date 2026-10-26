const Home = require('../models/home');
const Favourite = require('../models/favourite');

exports.getWelcomePage = (req, res, next) => {
    res.render('store/welcome');
};

exports.getAddHome = (req, res, next) => {
    res.render('host/AddHome');
};

exports.postAddHome = async (req, res, next) => {
    const { name, location, price, image, rating } = req.body;
    const newHome = new Home({
        houseName: name,
        description: "Beautiful home available for rent",
        imageURL: image,
        price,
        location,
        rating
    });
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
        const homeRegistered = await Home.find();
        res.render('host/hosthomelist', { homeRegistered });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching homes');
    }
};

exports.postAddToFavourite = async (req, res, next) => {
    try {
        const homeId = req.body.id;

        const exists = await Favourite.findOne({ homeId });
        if (exists) {
            console.log("Home is already marked in favourites");
            return res.redirect("/favourite-list");
        }

        await Favourite.create({ homeId });
        res.redirect("/favourite-list");
    } catch (err) {
        console.log(err);
        res.status(500).send('Error adding to favourites');
    }
};

exports.postRemoveFromFavourite = async (req, res, next) => {
    try {
        const homeId = req.body.id;
        await Favourite.findOneAndDelete({ homeId });
        res.redirect("/favourite-list");
    } catch (err) {
        console.log(err);
        res.status(500).send('Error removing favourite');
    }
};

exports.getFavouriteList = async (req, res, next) => {
    try {
        const favourites = await Favourite.find().populate('homeId');
        res.render('favourite-list', { favourites });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching favourites');
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
        await Home.findByIdAndUpdate(homeId, {
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
        await Home.findByIdAndDelete(homeId);
        res.redirect('/host/hosthomelist');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting home');
    }
};