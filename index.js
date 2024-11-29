require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.json())

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  }, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => 
    done(null, user)
);
passport.deserializeUser((user, done) => 
    done(null, user)
);


//home
app.get("/", (req, res) => {
    res.send(`
        <a href='/auth/google'>Login with Google</a>
        <br>
        <a href='/auth/register'>Register</a>
        <br>
        <a href='/login'>Login</a>
    `);
});

//google auth
app.get("/auth/google", passport.authenticate('google', { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: "/" }), (req, res) => {
    res.redirect('/profile');
});


//register
app.get("/auth/register", (req, res) => {
    res.send(`
        <form method="post" action="/auth/register">
            <input type="text" name="name" placeholder="Name">
            <input type="email" name="email" placeholder="Email">
            <input type="password" name="password" placeholder="Password">
            <input type="password" name="confirmPassword" placeholder="Confirm Password">
            <button type="submit">Register</button>
        </form>
    `);
    });

    let userIdCounter = 1;

    app.post('/auth/register', (req, res) => {
        const { name, email, password, confirmPassword } = req.body;
    
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }
    
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
    
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
    
        const newUser = {   
            userId: userIdCounter++,
            name,
            email,
            password: hashedPassword
        };
    
        users.push(newUser);
    
        res.status(201).json({
            userId: newUser.userId,
            name: newUser.name
        });
    });

//login
app.get("/login", (req, res) => {
    res.send(`
        <form method="post" action="/auth/login">
            <input type="email" name="email" placeholder="Email">
            <input type="password" name="password" placeholder="Password">
            <button type="submit">Login</button>
        </form>
    `);
});


//profile
app.get("/profile", (req, res) => {
    res.send(`Welcome ${req.user.displayName}`);
});

//logout
app.get("/auth/logout", (req, res) => {  
    req.logout(() => {sa
        res.redirect("/");
    });
});

//tambahan dikosongkan dlu

app.listen(5000, () => {
    console.log("Server is running on port 3000");
});

