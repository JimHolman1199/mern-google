const GoogleStrategy = require('passport-google-oauth20').Strategy;
const fs = require('fs');

const keys = require('./keys');
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
        clientID: keys.google.client_id,
        clientSecret: keys.google.client_secret,
        callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            // TODO: we need to save the accessToken to use it later.. in DB ?, 
            // accessToken will be provided only once the first time a user logs in
            fs.readFile(TOKEN_PATH, (err, token) => {
                if(!token){
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
                } 
            });
            
            User.findOne({ googleId: profile.id })
                .then(currentUser =>{
                    if(currentUser){
                        console.log('currentUser',currentUser)
                        done(null, currentUser)
                    }else{
                        new User({
                            userName : profile.displayName,
                            googleId : profile.id,
                            photoUrl : profile._json.picture,
                            userEmail: profile._json.email
                        }).save().then(newUser=>{
                            console.log('newUser',newUser);
                            done(null, newUser)
                        })
                    }
                })
        }
    ));    
}
