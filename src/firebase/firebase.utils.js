import firebase from 'firebase/compat/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore";


const config = {
    apiKey: "AIzaSyCUxCnr8-tFnrZhCwWKl1M4Ob6CwM8fpH4",
    authDomain: "crwn-db-aa45e.firebaseapp.com",
    projectId: "crwn-db-aa45e",
    storageBucket: "crwn-db-aa45e.appspot.com",
    messagingSenderId: "835644159224",
    appId: "1:835644159224:web:ae2932d85524991bf1f70d"
  };

const app = firebase.initializeApp(config);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export const auth = getAuth();


export const signInWithPopupCustom = async () => {
    try{
        // This gives you a Google Access Token. You can use it to access the Google API.
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
    }catch(error){
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    }
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userDocSnap = await getDoc(userDocRef);
   
    if(!userDocSnap.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(doc(db, "users", userAuth.uid), {
                displayName,
                email,
                createdAt,
                ...additionalData
              });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userDocRef;

}
