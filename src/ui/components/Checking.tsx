import { Backdrop, CircularProgress, Grid } from '@mui/material'
import React from 'react'

const Checking = () => {
  return (
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', padding: 4 }}
    >

    
       <Backdrop
        sx={{ color: '#fff',backgroundColor: '#000000e0', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      
    </Grid>
  )
}

export default Checking