const router = require("express").Router();
const { google } = require("googleapis");

const fs = require("fs");

const TOKEN_PATH = "token.json";

// @desc  Get files data from Google Drive
// @route GET /api/drive
router.get("/drive", (request, response) => {
  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(callback) {
    const {
      GOOGLE_CLIENT_SECRET,
      GOOGLE_CLIENT_ID,
      GOOGLE_CALLBACK_URI,
    } = process.env;
    const oAuth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_CALLBACK_URI
    );

    // Get Token from the file. because we stored it when the user logged in
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) console.log(err);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  function listFiles(auth) {
    const drive = google.drive({ version: "v3", auth });

    drive.files.list(
      {
        pageSize: 50,
        q: "mimeType = 'application/vnd.google-analytics.rap.report'",
        fields: "nextPageToken, files( name, webViewLink )",
        // modify "files" above to get more information about each file
      },
      (err, res) => {
        if (err) return console.log("The API returned an error: " + err);
        // TODO: here we get nextPageToken
        // need to send it to FE and use it somehow
        const nextPageToken = res.data.nextPageToken;

        const files = res.data.files;

        if (files.length) {
          return response.send({ 
            items: files
           });
        } else {
          console.log("No files found.");
          response.send(null);
        }
      }
    );
  }

  authorize(listFiles);
});

module.exports = router;
