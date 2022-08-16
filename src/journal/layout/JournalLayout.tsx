import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { FC, ReactNode } from 'react';
import { NavBar, SideBar } from '../components';


const drawerWidth = 280;

export const JournalLayout:FC<{children:ReactNode}>= ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

        <NavBar drawerWidth={ drawerWidth } />

        <SideBar drawerWidth={ drawerWidth } />

        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
            <Toolbar />

            { children }
            
        </Box>
    </Box>
  )
}