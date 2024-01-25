// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3_vp3BvuGTqjlL-6JH8Imwpt1t91Jix8",
  authDomain: "tutor-5e697.firebaseapp.com",
  projectId: "tutor-5e697",
  storageBucket: "tutor-5e697.appspot.com",
  messagingSenderId: "218754577147",
  appId: "1:218754577147:web:7cfe5166f21c2e7d25b65e",
  measurementId: "G-ZS29569RES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);