import { Dispatch } from "react"
import { checkingCredentials, login, logout } from "./authSlice"
import { signInGoogle, signInGitHub, registerWithEmailPass, LoginEmailPass, logoutFirebase } from '../../firebase/provider';
import { string } from "yup";
import { journalLogout } from "../journal";


//* TYPES

type TSignIn = {
    email          :string,
    password       :string,
    fullName       :string
}


export type TFirebaseResponse = {
    email       : string | null
    displayName : string | null
    ok          : boolean| boolean
    photoURL    : string | null
    uid         : string | null
    err         : string | null
}

export const checkingAuthentication = () => ( dispath: Dispatch<any> ) => dispath(checkingCredentials())



export const startGoogleSignIn = () => {
    return async ( dispath: Dispatch<any> ) => {
        dispath(checkingCredentials());


        const response  = await signInGoogle() as TFirebaseResponse;

        if(!response.ok){
            dispath(logout(JSON.stringify(response.err)));
            return;
        }

        const {displayName, email, photoURL, uid } = response;
        dispath(login({status: 'authenticated',displayName, email, photoURL, uid, errorMessage: null}));
        
    }

}


export const startGithubSignIn = () => { 
    return async ( dispath: Dispatch<any> ) => {
        dispath(checkingCredentials());


        const response  = await signInGitHub() as TFirebaseResponse;
        console.log(response);
        if(!response.ok){
            dispath(logout(JSON.stringify(response.err)));
            return;
        }

        const {displayName, email, photoURL, uid } = response;
        dispath(login({status: 'authenticated',displayName, email, photoURL, uid, errorMessage: null}));
        
    }
}


export const startCreatingUserWithEmailPassword = ({email, password, fullName: displayName}: TSignIn) => {
    return async(dispatch: Dispatch<any>) => {
        try {
            dispatch(checkingAuthentication());
            const {ok,err, ...rest} =  await registerWithEmailPass(email, password, displayName);
            if(ok){
                dispatch(login({...rest, errorMessage: null, status: 'authenticated'}))
                return
            }
            //! If have an error into the login process
            dispatch(logout(err!))
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const startLogIn = (email:string, password:string) => {
    return async(dispatch: Dispatch<any>) => {
        try {
            dispatch(checkingAuthentication());

            const {ok,err, ...rest} =  await LoginEmailPass(email, password);

            if(ok){
                dispatch(login({...rest, errorMessage: null, status: 'authenticated'}))
                return
            }
            //! If have an error into the login process
            dispatch(logout(err!))
        } catch (error) {
            console.log(error);
        }
    }
}


export const startLogout = () => {
    return async( dispatch:Dispatch<any> ) => {
            await logoutFirebase();
            dispatch(journalLogout());
            dispatch(logout(''));
    }
}