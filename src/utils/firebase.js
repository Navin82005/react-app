import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCAyhbjC1p7CeKV3GrHI15fCB-hoZKFxRc",
    authDomain: "hgywell-internship.firebaseapp.com",
    projectId: "hgywell-internship",
    storageBucket: "hgywell-internship.appspot.com",
    messagingSenderId: "700628633089",
    appId: "1:700628633089:web:5c7582d5213e47f6602200"
};

const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);
export const imageDb = getStorage(app);