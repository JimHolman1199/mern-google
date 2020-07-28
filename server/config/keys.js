module.exports = {
   google:{
     //here you can find goole key and secret
     "client_id": "605756485136-cdmeerk3ksrn3j1bmch7kepnh6h2kco7.apps.googleusercontent.com",
     "project_id": "datastudio-1594893017678",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_secret": "U8leDH0uNkFzjeQw7MVV5exz",
     "redirect_uris": [
         "http://localhost:5000/auth/google/callback",
         "http://localhost:3000/auth/google/callback",
         "http://localhost:3000/oauth2callback"
     ],
     "javascript_origins": [
         "http://localhost:3000"
     ]
   },
   session:{
     cookieKey:"pizda"
   },
   mongodb:{
     dbURI:'mongodb+srv://jim-holman:sofIIa123@cluster0.bv1j6.gcp.mongodb.net/dataStudio?retryWrites=true&w=majority'
   }
 };