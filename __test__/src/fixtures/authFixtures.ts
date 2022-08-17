import { IAuthState } from '../../../src/store/auth/authSlice';

export const initialState: IAuthState = {
    status        : 'chekingAuthentication',
    uid           : null,
    email         : null,
    displayName   : null,
    photoURL      : null,
    errorMessage  : null,
}

export const authenticatedState: IAuthState = {
    status        : 'checking',
    uid           : '123abc',
    email         : 'demo@google.com',
    displayName   : 'Demo user',
    photoURL      : 'http://demon.jpg',
    errorMessage  : null,
}

export const notAuthenticatedState: IAuthState = {
    status        : 'not-authenticated',
    uid           : null,
    email         : null,
    displayName   : null,
    photoURL      : null,
    errorMessage  : "no se puedo iniciar sesion",
}


export const demoUser = {
    uid           : 'abc123',
    email         : 'demo@gmail.com',
    displayName   : 'Demo User',
    photoURL      : 'http://demo.jpg',
}
