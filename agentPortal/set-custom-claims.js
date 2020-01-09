var admin = require("firebase-admin");
var uid = process.argv[2];
var serviceAccount = require('./sykes-mexico-portal-firebase-adminsdk-khu1m-95ad0c7ad7.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sykes-mexico-portal.firebaseio.com"
});

admin.auth().setCustomUserClaims( uid, { admin: true})
.then(() => {
    console.log('custom claims set for user', uid);
    process.emit;
})
.catch( error => {
    console.log('error', error);
    process.exit(1);
});
