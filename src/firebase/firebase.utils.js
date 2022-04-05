import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyC_CZdQzx2UL93ZBbD1OAGn0f9uhuaNclE",
    authDomain: "crwn-db-5e73e.firebaseapp.com",
    projectId: "crwn-db-5e73e",
    storageBucket: "crwn-db-5e73e.appspot.com",
    messagingSenderId: "948730196475",
    appId: "1:948730196475:web:808e37e3bdc8532ece9b5e",
    measurementId: "G-L3GDHW9WZG"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('Error creating user', error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;