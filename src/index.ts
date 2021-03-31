import firebase from "firebase";
import admin from "firebase-admin";
require('dotenv').config()
const prompt = require('prompt-sync')();

const serviceAccount = require('../serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://auth-development-a292f.firebaseio.com"
})

const main = () => {
  const uid = prompt('Enter a uid: ')
  admin
    .auth()
    .setCustomUserClaims(uid, { admin: true })
    .then(() => {
      console.log(`admin roll added to ${uid}`)
      logUserData(uid)
    })
    .catch(({ message }) => {
      console.log(message)
    })
}

const logUserData = (uid: string) => {
  admin
    .auth()
    .getUser(uid)
    .then((user) => {
      console.log(user)
    })
}

main()