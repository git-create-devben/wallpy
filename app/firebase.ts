// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAka9jZ14MJwqJLG7FsJ4Vgcb8h774XTkU",
  authDomain: "wallpy5.firebaseapp.com",
  databaseURL: "https://wallpy5-default-rtdb.firebaseio.com",
  projectId: "wallpy5",
  storageBucket: "wallpy5.appspot.com",
  messagingSenderId: "434810454717",
  appId: "1:434810454717:web:024e77770cc3f6515bedd4",
  measurementId: "G-NTLXHXNES4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore();

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LeLNF4pAAAAAMyT8PzZW-JziVL8X_N85xq3y53T'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

export { storage, db};