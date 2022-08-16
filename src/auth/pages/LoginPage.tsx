import { useCallback, useMemo, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, Snackbar, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth';
import { startGithubSignIn, startLogIn } from '../../store/auth/thunk';
import { useFormik } from 'formik';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as Yup from 'yup';


interface IForm {
    email    :string
    password :string
}

const initialState:IForm = {
    email    : '',
    password : '',
}

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const {status, displayName, errorMessage} = useAppSelector(({auth}) => auth)

    const [openSnack, setopenSnack] = useState(false)
    
    const onGoogleSingIn = useCallback(async() => {
      await dispatch(startGoogleSignIn())
      setopenSnack(() => true)
    },[]);
    const onGighugSingIn = useCallback(() => dispatch(startGithubSignIn()),[]);
    const {handleSubmit, errors, touched, getFieldProps} = useFormik<IForm>({
        initialValues : { ...initialState },
        onSubmit : async(credentials) => {
          await dispatch(startLogIn(credentials.email, credentials.password))
          setopenSnack(true);
          
        },

        validationSchema:Yup.object(validationSchema())
    });


    const authenticationStatus = useMemo(() => {
      if(status === 'checking'){
        return true
      }
      return false
    },[status])
    
    
  return (
    <AuthLayout title="Login">
    <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label='Correo' 
              type='email'
              id='email' 
              placeholder='correo@google.com' 
              fullWidth
             {...getFieldProps('email')} 
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label='Contraseña' 
              type='password'
              id='password' 
              placeholder='Contraseña' 
              fullWidth
              {...getFieldProps('password')} 
            />
          </Grid>
          
          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={ 12 } sm={ 4 }>
              <Button type='submit' disabled={authenticationStatus} variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 4 }>
              <Button  variant='contained' disabled={authenticationStatus} onClick={onGoogleSingIn} fullWidth>
                <GoogleIcon />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 4 }>
              <Button  variant='contained' disabled={authenticationStatus} onClick={onGighugSingIn} fullWidth>
                <GitHubIcon />
                <Typography sx={{ ml: 1 }}>Github</Typography>
              </Button>
            </Grid>
          </Grid>


          <Grid container direction='row' justifyContent='end'>
            <Link component={ RouterLink } color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={authenticationStatus}
        onClick={() => false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setopenSnack(false)}
        message={displayName ? 'Registro completado correctamente' : errorMessage}
      />
  </AuthLayout>
  )
}

const validationSchema = () => ({
    email: Yup.string().max(30,'Debe tener 15 caracteres o menos').required('Required'),
    password: Yup.string().max(30,'Debe tener 10 caracteres o menos').required('Required'),
});