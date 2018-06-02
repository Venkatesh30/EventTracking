// config/passport.js

// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User       = require("../app/models/modalDefination").USERS;

var groups = require("../app/modules/groups");

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.ID);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            done('', user);
        })
        .catch(function(err){
            done(err,[]);
        });
    });

    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields   : configAuth.facebookAuth.profileFields

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            User.findOne({
                where:{
                    id:profile.id
                }
            })
            .then(function(user){
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    createUser({
                        ID:profile.id,
                        TOKEN:token,
                        NAME:profile.name.givenName + ' ' + profile.name.familyName,
                        EMAIL:profile.emails?profile.emails[0].value:'',
                        LOGIN_TYPE:'FACEBOOK'
                    },done);
                }
            })
            .catch(function(err){
                if (err)
                    return done(err);
            })
        });

    }));


    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({
                where:{
                    id:profile.id
                }
            })
            .then(function(user){
                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    createUser({
                        ID:profile.id,
                        TOKEN:token,
                        NAME:profile.displayName,
                        EMAIL:profile.emails?profile.emails[0].value:'',
                        LOGIN_TYPE:'GOOGLE'
                    },done);
                }
            })
            .catch(function(err){
                return done(err);
            })
        });

    }));

};

let createUser = async function(options,done){
    let userData = await User.create(options);
    let groupData = await groups.createGroup({});
    let groupAssociation = await groups.createGroupAssociation(
        {   
            userId:userData.ID,
            groupId:groupData.ID
        }
    )
    return done(null, userData);
    /* User.create(options)
    .then(function(data){
        return done(null, data);
    })
    .catch(function(err){
        throw err;
    }) */
}