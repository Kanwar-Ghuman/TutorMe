import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3_vp3BvuGTqjlL-6JH8Imwpt1t91Jix8",
  authDomain: "tutor-5e697.firebaseapp.com",
  projectId: "tutor-5e697",
  storageBucket: "tutor-5e697.appspot.com",
  messagingSenderId: "218754577147",
  appId: "1:218754577147:web:7cfe5166f21c2e7d25b65e",
  measurementId: "G-ZS29569RES"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
