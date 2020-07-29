const router = require('express').Router();
const passport = require('passport');

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
router.get('/user', (req, res) => {
  try {
    res.send(req.user)
  } catch (error) {
    console.error(error)  
  }
})

// @desc  Return user data
// @route GET /auth/logout
// TODO: it does not work due to a express session
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if(err) console.log(err)
    res.send({fuck:'bin laden'})
    res.redirect('/')
  });
});

module.exports = router;
