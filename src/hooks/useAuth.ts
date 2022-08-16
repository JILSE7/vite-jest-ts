import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { FirebaseAuth } from '../firebase/config';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { login, logout } from '../store/auth';
import { startLoadingNotes } from '../store/journal';

export const useAuth = () => {
    const {status} = useAppSelector(({auth}) => auth);
    const disptach = useAppDispatch();
    
    useEffect(() => {
      console.log("me eje");
      onAuthStateChanged(FirebaseAuth, (user) => {
        
        if(!user) return disptach(logout(''));
        const {displayName, email, photoURL, uid } = user;
        disptach(login({displayName, email, photoURL, uid, errorMessage: null,status: 'authenticated'}));
        // start notes
        disptach(startLoadingNotes());
      })
    }, []);


    return{
        status
    }
}