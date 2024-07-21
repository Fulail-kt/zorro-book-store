import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDFYhA41X5rkJyZ6uT-2DMxGdnKbUDJ-w4",
    authDomain: "zorro-6f846.firebaseapp.com",
    projectId: "zorro-6f846",
    storageBucket: "zorro-6f846.appspot.com",
    messagingSenderId: "1003431666301",
    appId: "1:1003431666301:web:58c27cd69867ff18228714",
    measurementId: "G-9VBEZ7HFH5"
  };

  
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);