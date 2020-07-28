const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/drive'],
    access_type: 'offline',
  })
);

router.get('/google/callback', 
  passport.authenticate("google"),
  (req,res)=>{
    res.redirect('/')
  }
);

router.get('/user', async (req, res)=>{
  try {
    console.log('get user', req.user)
    res.send(req.user)
  } catch (error) {
    console.error(error)  
  }
  
})

router.get("/logout", (req, res) => {
  req.logout();
  res.send({status:'logout'})
});

module.exports = router;
