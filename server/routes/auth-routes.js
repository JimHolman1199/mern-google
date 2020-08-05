const router = require('express').Router();
const passport = require('passport');
const { ensureAuth } = require('../middleware/auth');

const SCOPE = [
  'https://www.googleapis.com/auth/userinfo.profile', 
  'https://www.googleapis.com/auth/userinfo.email', 
  'https://www.googleapis.com/auth/drive'
]

// @desc  Auth with Google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', {
    scope: SCOPE,
    access_type: 'offline',
  })
);

// @desc  Google auth callback
// @route GET /auth/google/callback
router.get('/google/callback', 
  passport.authenticate("google"),
  (req,res)=>{
    res.redirect('/')
  }
);

// @desc  Get user Data
// @route GET /auth/user
// @returns {obj}
router.get('/user', ensureAuth, (req, res) => {
  try {
    console.log( 'Get user', req.user)
    res.send(req.user)
  } catch (error) {
    console.error(error)  
  }
})

// @desc  Log out and delete the session
// @route GET /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy((err)=>{
    if(err) console.log(err)

    res.redirect('/');
  })
});

module.exports = router;
