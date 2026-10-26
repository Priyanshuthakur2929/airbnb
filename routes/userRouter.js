const express = require('express');
const userRouter = express.Router();
const Favourite = require('../models/favourite');
const Booking = require('../models/booking');
const Home = require('../models/home');

userRouter.get('/', async (req, res) => {
  const homeRegistered = await Home.fetchAll();
  res.render('store/homelist', { homeRegistered });
});

userRouter.get('/homelist', async (req, res) => {
  const homeRegistered = await Home.fetchAll();
  res.render('store/homelist', { homeRegistered });
});

userRouter.get('/favourite-list', async (req, res, next) => {
  try {
    const favouriteNames = await Favourite.getFavourite();
    const allHomes = await Home.fetchAll();
    const favouriteHomes = allHomes.filter(home => favouriteNames.includes(home.houseName));
    res.render('store/favourite-list', { homeRegistered: favouriteHomes });
  } catch (error) {
    next(error);
  }
});

userRouter.post('/favourite-list/remove', async (req, res, next) => {
  try {
    await Favourite.removeFromFavourite(req.body.name);
    res.redirect('/favourite-list');
  } catch (error) {
    next(error);
  }
});

userRouter.get('/login', (req, res) => {
  res.render('store/login');
});

userRouter.get('/sign-up', (req, res) => {
  res.render('store/sign-up');
});

userRouter.post('/sign-up', (req, res) => {
  console.log(req.body);
  res.redirect('/login');
});

userRouter.get('/bookings', async (req, res, next) => {
  try {
    const bookingIds = await Booking.getBookings();
    const allHomes = await Home.fetchAll();
    const bookedHomes = allHomes.filter(home => bookingIds.includes(String(home._id)));
    res.render('store/Bookings', { homeRegistered: bookedHomes });
  } catch (error) {
    next(error);
  }
});

userRouter.post('/bookings', async (req, res, next) => {
  try {
    await Booking.addBooking(req.body.homeId);
    res.redirect('/bookings');
  } catch (error) {
    next(error);
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