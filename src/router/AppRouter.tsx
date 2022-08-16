import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import Checking from '../ui/components/Checking';
import { useAuth } from '../hooks/useAuth';


export const AppRouter = () => {

  const {status} = useAuth();

  if(status === 'chekingAuthentication'){
    return <Checking/>
  }



  return (
    <Routes>

      {
        (status === 'authenticated' )
        ? 
        (<Route path="/*" element={ <JournalRoutes /> } />) 
        :
        (<Route path="/auth/*" element={ <AuthRoutes /> } />) 
        
      }

        <Route path="*" element={ <Navigate to={'/auth/login'} replace /> } />

      
        {/* Login y Registro */}
        {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}

        {/* JournalApp */}
        {/* <Route path="/*" element={ <JournalRoutes /> } /> */}
      

    </Routes>
  )
}