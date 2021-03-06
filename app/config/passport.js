"use strict";
var LocalStrategy = require("passport-local").Strategy;
var configAuth = require("./auth");
var User = require("../models/user");
module.exports=function(passport){
	passport.serializeUser(function(json,done){
			return done(null,json.user.email);
	});
	passport.deserializeUser(function(email,done){
		    return done(null,email);
	});

	passport.use(new LocalStrategy({
		usernameField:"name",
		passwordField:"password"
	
	},function(username,password,done){
						process.nextTick(function(){
							User.findOne({"user.name":username},function(err,user){
								if(err){ throw err;}
								 if(!user){
									return done(null,false,{message:"user is error"});
								 }
								 if(!(user.user.password === password.toString())){
								    return done(null,false,{message:"password is error"});
								 }
									return done(null,user);
							});
						
						});
		
				}
	));
	
};