const path = require('path');
const express = require('express');
const userRouter = express.Router();
const Favourite = require('../models/favourite');
const Booking = require('../models/booking');
const rootDir = require('../utils/pathUtil');
const Home = require('../models/home');
const homeController = require('../controllers/home');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/isAuth');

userRouter.get('/', homeController.getWelcomePage);

userRouter.get('/homelist', async (req, res) => {
  const homeRegistered = await Home.find();
  res.render('store/homelist', { homeRegistered });
});

userRouter.post('/add-to-favourite', isAuth, async (req, res) => {
  try {
    const homeId = req.body.id;
    const userId = req.session.user.id;

    const exists = await Favourite.findOne({ userId, homeId });
    if (!exists) {
      await Favourite.create({ userId, homeId });
    }
    res.redirect('/favourite-list');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error adding to favourites');
  }
});

userRouter.get('/favourite-list', isAuth, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const favourites = await Favourite.find({ userId }).populate('homeId');
    const homeRegistered = favourites.map(fav => fav.homeId).filter(Boolean);
    res.render('store/favourite-list', { homeRegistered });
  } catch (err) {
    console.error('FAVOURITE LIST ERROR:', err);
    res.status(500).send('Error fetching favourites');
  }
});

userRouter.post('/favourite-list/remove', isAuth, async (req, res) => {
  try {
    const homeId = req.body.id;
    const userId = req.session.user.id;
    await Favourite.findOneAndDelete({ userId, homeId });
    res.redirect('/favourite-list');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error removing favourite');
  }
});

userRouter.get('/login', authController.getLogin);
userRouter.post('/login', authController.postLogin);

userRouter.get('/sign-up', authController.getSignup);
userRouter.post('/sign-up', authController.postSignup);

userRouter.post('/logout', authController.postLogout);

userRouter.post('/bookings', isAuth, async (req, res) => {
  try {
    const { homeId, checkIn, checkOut } = req.body;
    const userId = req.session.user.id;

    if (new Date(checkOut) <= new Date(checkIn)) {
      return res.status(400).send('Check-out date must be after check-in date');
    }

    await Booking.create({ userId, homeId, checkIn, checkOut });
    res.redirect('/bookings');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error booking home');
  }
});

userRouter.get('/bookings', isAuth, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const bookings = await Booking.find({ userId }).populate('homeId');
    res.render('store/Bookings', { bookings });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching bookings');
  }
});

userRouter.get('/home/:homeId', async (req, res) => {
  const homeId = req.params.homeId;
  const home = await Home.findById(homeId);
  if (home) {
    res.render('store/home-detail', { home });
  } else {
    res.status(404).send('Home not found');
  }
});

module.exports = userRouter;