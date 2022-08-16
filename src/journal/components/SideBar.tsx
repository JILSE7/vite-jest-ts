import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { useAppSelector } from '../../hooks/useRedux';
import SideBarItem from './SideBarItem';
import useId from '@mui/material/utils/useId';

export const SideBar = ({ drawerWidth = 240 }) => {
    const reactId = useId()
    const {displayName} = useAppSelector((state) => state.auth );
    const {notes} = useAppSelector((state) => state.journal );
    

  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='permanent' // temporary
            open
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    {displayName}
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    notes.map( note => (<SideBarItem note={note} key={ reactId + note.id}/> ))
                }
            </List>

        </Drawer>

    </Box>
  )
}