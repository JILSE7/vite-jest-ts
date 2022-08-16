import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Grid, Link, Snackbar, TextField, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as Yup from 'yup';

import { useAppSelector, useAppDispatch } from '../../hooks/useRedux'
import { AuthLayout } from '../layout/AuthLayout';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunk';

interface IForm {
  email    :string
  fullName :string
  password :string
}

const initialValues:IForm = {
  email: '',
  fullName: '',
  password: ''
}

export const RegisterPage = () => {

  const dispatch = useAppDispatch();
  const {status, displayName, errorMessage} = useAppSelector(({auth}) => auth);
  const [openSnack, setopenSnack] = useState(false)
  const authenticationStatus = useMemo(() => status === 'checking',[status]);

  const {handleSubmit, errors, touched, getFieldProps, values} = useFormik<IForm>({
    initialValues : { ...initialValues },
    onSubmit : async({email, fullName, password},e) => {     
        await dispatch(startCreatingUserWithEmailPassword({email, password, fullName}))
        setopenSnack(true);
    },

    validationSchema:Yup.object(validationSchema())
  });

  console.log(errors, touched);

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={handleSubmit}>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                id='fullName' 
                fullWidth
                error={ touched.fullName && errors.fullName ? true : false }
                helperText={ touched.fullName && errors.fullName ? errors.fullName : null }
                {...getFieldProps('fullName')} 
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                id="email"
                placeholder='correo@google.com' 
                fullWidth
                error={ touched.email && errors.email ? true : false }
                helperText={ touched.email && errors.email ? errors.email : null }
                {...getFieldProps('email')} 
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                id="password"
                placeholder='Contraseña' 
                fullWidth
                error={ touched.password && errors.password ? true : false }
                helperText={ touched.password && errors.password ? errors.password : null }
                {...getFieldProps('password')} 
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button disabled={authenticationStatus} type='submit' variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>
        </form>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={authenticationStatus}
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
  email: Yup.string().max(50,'Debe tener 30 caracteres o menos').required('Email Obligatorio'),
  password: Yup.string().max(12,'Debe tener 12 caracteres o menos').required('Contraseña Oblogatoria'),
  fullName: Yup.string().max(50, 'El nombre debe de ser de maximo 50 caracteres').required('Nombre Obligatorio')
});