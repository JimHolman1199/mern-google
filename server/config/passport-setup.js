const GoogleStrategy = require('passport-google-oauth20').Strategy;
const fs = require('fs');

const User = require('../models/user.models');

const TOKEN_PATH = 'token.json';
const SCOPE = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive';

module.exports = function(passport){

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user)
            }).catch(err=>{
                console.log(err)
                done(err, null)
            })
    });
    
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URI
        },
        async (accessToken, refreshToken, profile, done) => {
            // TODO: we need to save the accessToken to use it later.. in DB ?, 
            // accessToken will be provided only once the first time a user logs in
            User.findOne({ googleId: profile.id })
                .then(currentUser =>{

                    //Store token to file
                    fs.readFile(TOKEN_PATH, (err, token) => {
                        const data = {
                            "access_token": accessToken,
                            "refresh_token": refreshToken,
                            "scope": SCOPE,
                            "token_type": "Bearer",
                            "expiry_date": Date.now()+ 86400000
                        }
                        fs.writeFile(TOKEN_PATH, JSON.stringify(data), (err)=>{
                            if(err)console.log('error storing token', err)
                            console.log('Token stored to token.json')
                        })
                    });

                    if(currentUser){
                        console.log('currentUser',currentUser)
                        done(null, currentUser)
                    }else{
                        //create new User in DB
                        new User({
                            userName : profile.displayName,
                            googleId : profile.id,
                            photoUrl : profile._json.picture,
                            userEmail: profile._json.email,
                            refreshToken:refreshToken
                        }).save().then(newUser=>{
                            console.log('newUser', newUser);
                            done(null, newUser)
                        })
                    }
                })
        }
    ));    
}
