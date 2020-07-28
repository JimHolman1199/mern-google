const router = require('express').Router();
const { google } = require('googleapis');

const fs = require('fs');

const TOKEN_PATH = 'token.json';
// const TOKEN_PATH = path.join(__dirname, '../token.json');

router.get("/drive", (request, response) => {    
    
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.
      authorize(JSON.parse(content), listFiles);
    });
    
    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
      const {client_secret, client_id, redirect_uris} = credentials.web;
      const oAuth2Client = new google.auth.OAuth2(
          client_id, client_secret, redirect_uris[0]);
    
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
      });
    }
    
    function listFiles(auth) {
    
      const drive = google.drive({version: 'v3', auth});
      
    //   drive.files.get({
    //     fileId:'0B1Pzjx-lZIhbS2FjM19Hdl8xLXc',
    //     fields:'*'
    //   }).then(response=>console.log(response))

        drive.files.list({
        pageSize: 20,
        'q': "mimeType = 'application/vnd.google-analytics.rap.report'",
        fields: 'nextPageToken, files(id, name)',
      }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        
        if (files.length) {
            response.send({items:files})
        } else {
          console.log('No files found.');
          response.send(null)
        }
      });
    }

});

module.exports = router;
