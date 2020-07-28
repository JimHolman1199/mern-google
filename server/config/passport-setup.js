const GoogleStrategy = require('passport-google-oauth20').Strategy;
const fs = require('fs');

const keys = require('./keys');
const User = require('../models/user.models');
const TOKEN_PATH = 'token.json';

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
    
    //Google strategy
    passport.use(new GoogleStrategy({
        clientID: keys.google.client_id,
        clientSecret: keys.google.client_secret,
        callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {

            fs.readFile(TOKEN_PATH, (err, token) => {
                if(!token){
                    const data = {
                        "access_token": accessToken,
                        "refresh_token": refreshToken,
                        "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive",
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


// {
//     "access_token": "ya29.a0AfH6SMAL4LH5QDz83RItyMXp_VVr-xnDpdEt8s4YEBtP2kSpvSycxdM1YvMOU1e-H9Sf8vEsvwzSHeWJx4VutCfW_IHpq7U76-wExm0C0UfJ-EwoCSP8L_F7brO7lnSbcgaqnTxobp87EpvGJu8sB6Bzc1Z86M9R608",
//     "refresh_token": "1//0cxX3LuQ90q5oCgYIARAAGAwSNwF-L9IrkkOCUGiQF2g318dgIDvh_SJSRIBXjzvdRn3k4J2GlwgohYdcUZLT9ZmLeooMJYjJsas",
//     "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/drive.metadata.readonly",
//     "token_type": "Bearer",
//    "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2M2VlMGJlMDkzZDliYzMxMmQ5NThjOTk2NmQyMWYwYzhmNmJiYmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MDU3NTY0ODUxMzYtZ2lzYXMyaGQwZTl2dW5vbDJ1cWRrYm00cHJuMGJjNzAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MDU3NTY0ODUxMzYtZ2lzYXMyaGQwZTl2dW5vbDJ1cWRrYm00cHJuMGJjNzAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDY3NzIzOTY5MDI4MTgyODg2OTMiLCJlbWFpbCI6ImppbWhvbG1hbjExOTlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJFWEdOd1NqUnBjT0oyRkhBZWpncVpRIiwibmFtZSI6ItCU0LbQuNC8INCT0L7Qu9GM0LzQsNC9IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqeUFQN29rQ1VaUXo0RTFuZkptd29SSjhDMjhXMUw5R29RQklDND1zOTYtYyIsImdpdmVuX25hbWUiOiLQlNC20LjQvCIsImZhbWlseV9uYW1lIjoi0JPQvtC70YzQvNCw0L0iLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU5NTMzNzA2MSwiZXhwIjoxNTk1MzQwNjYxfQ.oMZwJR2pgn44JCaOT6a3r5WurQJ3pRLMjuIvdDACq0zYGXvO7Uw1jdEvirMIZyq1X_s6IJIFdjKj--wuKhIAArfY9TKtEJfclDjIWk3760OlQWbs6eDSrO4SmH8pvJJinCampf9cQbbbQjUHRdhX1gCXXBBATaaBnUQWIKgykEE7OLyztSzOUu35cd-TKkGVNNYCrrxLgE0mEzOHwwW5OvpqiNf68IFeP7DTqNQWQZ-FqZnSLoBbbLroMJhB2l047U2EOfnMn3c-XB1-OD0XJqksIAS-JeoISVhAqK8Mo3RrYNv7_Wby5NGKCCQ-SVNrOivJbZ-d0_lTzYPzuMX6Ew",
//     "expiry_date": 1595340660783
// }