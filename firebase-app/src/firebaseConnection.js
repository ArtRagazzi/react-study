import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCO0Ng_qXx0QJW0OLFu0B1v8HybMP3kmvI",
    authDomain: "csujprog.firebaseapp.com",
    projectId: "csujprog",
    storageBucket: "csujprog.firebasestorage.app",
    messagingSenderId: "981816376484",
    appId: "1:981816376484:web:e6d9f212332cc60eecfa31"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app)
  const auth = getAuth(app)

  export {db, auth};

