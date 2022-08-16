import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateCurrentUser, updateProfile } from "firebase/auth";
import { FirebaseAuth } from './config';
import { TFirebaseResponse } from '../store/auth/thunk';

const googleProvider = new GoogleAuthProvider();
const ghProvider     = new GithubAuthProvider();



export const signInGoogle = async(): Promise<TFirebaseResponse> => {
    try {
        googleProvider.setCustomParameters({
            prompt: 'select_account'
        })
        const {user} = await signInWithPopup(FirebaseAuth, googleProvider)
            
        const {email, displayName, photoURL, uid} = user;

        return {
            ok : true,
            email, 
            displayName, 
            photoURL, 
            uid,
            err: null
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            email:null, 
            displayName: null, 
            photoURL: null, 
            uid : null,
            err: error.message
        }
    }
}


export const signInGitHub = async(): Promise<TFirebaseResponse> => {
    try {

        ghProvider.setCustomParameters({prompt: 'select_account'})
        const res = await signInWithPopup(FirebaseAuth, ghProvider)
        console.log(res);
        const credentials = GithubAuthProvider.credentialFromResult(res);
        console.log("this is gh");
        console.log({credentials});

        return {
            ok: false,
            email:null, 
            displayName: null, 
            photoURL: null, 
            uid : null,
            err: null
        }

    } catch (error) {
        return {
            ok: false,
            email:null, 
            displayName: null, 
            photoURL: null, 
            uid : null,
            err: error.message
        }
    }
}


export const registerWithEmailPass = async(email: string, password:string, displayName: string):Promise<TFirebaseResponse> => {

    try {
        const {user} = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

        const {uid, photoURL, email:emailLoggeed, displayName: firstDisplayName} = user;

        await updateProfile(FirebaseAuth.currentUser!, {displayName})

        return {
            ok: true,
            email: emailLoggeed, 
            displayName, 
            photoURL, 
            uid,
            err: null
        }


    } catch (error) {
        return {
            ok: false,
            email:null, 
            displayName: null, 
            photoURL: null, 
            uid : null,
            err: error.message
        }
    }

}

export const LoginEmailPass = async(email:string, password:string):Promise<TFirebaseResponse> => { 
    try {
        const { user } = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const {uid, photoURL, email:emailLoggeed, displayName} = user;

        return {
            ok: true,
            email: emailLoggeed, 
            displayName, 
            photoURL, 
            uid,
            err: null
        }

    } catch (error) {
        return {
            ok: false,
            email:null, 
            displayName: null, 
            photoURL: null, 
            uid : null,
            err: error.message
        }
    }
}


export const logoutFirebase = async() => {

    return await FirebaseAuth.signOut()

}