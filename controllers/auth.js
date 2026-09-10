const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('store/login');
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    console.log('Login attempt:', email, password);
    try {
        const user = await User.findOne({ email });
        console.log('User found:', user);

        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', passwordMatch);

        if (!passwordMatch) {
            return res.status(401).send('Invalid email or password');
        }

        req.session.isLoggedIn = true;
        req.session.user = { id: user._id, email: user.email };
        res.redirect('/homelist');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error logging in');
    }
};

exports.getSignup = (req, res, next) => {
    res.render('store/sign-up');
};

exports.postSignup = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('An account with that email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({ email, password: hashedPassword });

        res.redirect('/login');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error creating account');
    }
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};