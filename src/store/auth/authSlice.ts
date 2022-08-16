import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state

type TAuntenticated = 'chekingAuthentication' | 'not-authenticated' | 'authenticated' | 'checking';

export interface IAuthState {
  status        : TAuntenticated
  uid           : string | null
  email         : string | null
  displayName   : string | null
  photoURL      : string | null
  errorMessage  : string | null
}

// Define the initial state using this type
const initialState: IAuthState = {
  status        : 'chekingAuthentication',
  uid           : null,
  email         : null,
  displayName   : null,
  photoURL      : null,
  errorMessage  : null,
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login : (state, {payload}: PayloadAction<IAuthState>) => {
      state.status       = payload.status;
      state.uid          = payload.uid;
      state.email        = payload.email;
      state.displayName  = payload.displayName;
      state.photoURL     = payload.photoURL;
      state.errorMessage = payload.errorMessage;
        
    },
    logout: (state, action:PayloadAction<string> ) => {
        state.errorMessage = action.payload;
        state.status       = 'not-authenticated';
        state.uid          = null;
        state.email        = null;
        state.displayName  = null;
        state.photoURL     = null;
    },
    checkingCredentials : (state) => {
        state.status = 'checking'
        
    }
  },
})

export const { login, logout, checkingCredentials } = authSlice.actions  // -> action creators functions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state

export default authSlice