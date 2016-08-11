"use strict";
var express = require("express"),
route = require("./app/routes/route.js"),
passport = require("passport"),
session = require("express-session"),
mongoose = require("mongoose");

var app = express();
require("dotenv").load();
require("./app/config/passport")(passport);
mongoose.connect(process.env.MONGOO_URI);
app.use(session({
		secret:"secret",
		resave:false,
		saveUninitialized:true
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	route(app,passport);
	app.use('/controllers',express.static(process.cwd() +'/app/controllers/'));
	app.use('/common',express.static(process.cwd() +'/app/common/'));
	var port = process.env.PORT || 8080;
	app.listen(port,function(){
		console.log("Node.js listening on port"+port);
	});