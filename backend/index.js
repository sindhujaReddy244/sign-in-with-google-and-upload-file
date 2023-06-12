require('dotenv').config()

const express = require("express");
const cors = require('cors')
const cookieSession = require("cookie-session");
const passport = require("passport");

const fileRoute = require('./routes/fileRoute')
const authRoute = require('./routes/authRoute')
const passportStrategy = require("./passport");

const app = express();

// cookieSession
app.use(
	cookieSession({
		name: "session",
		keys: [process.env.SECRET_KEY],
		maxAge: 24 * 60 * 60 * 100,
	})
);

// passport js
app.use(passport.initialize());
app.use(passport.session());

// cors
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

// routes
app.use("/auth", authRoute);
app.use('/api', fileRoute)


const port = process.env.PORT || 8080


app.listen(port, () => {
	console.log(`Server started at port : ${port}`);
});