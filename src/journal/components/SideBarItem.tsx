import { FC, useId } from 'react'
import { ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { activeNote, TNote } from '../../store/journal';
import { useAppDispatch } from '../../hooks/useRedux';

interface IProps {
    note: TNote
}

const SideBarItem:FC<IProps> = ({note}) => {
  const dispatch = useAppDispatch()
  const onActiveNote = () => {
    dispatch(activeNote(note));
  }

  return (
    <ListItem onClick={onActiveNote} disablePadding>
      <ListItemButton>
          <ListItemIcon>
              <TurnedInNot />
          </ListItemIcon>
          <Grid container>
              <ListItemText primary={ note.title } />
              <ListItemText secondary={ note.body } />
          </Grid>
      </ListItemButton>
    </ListItem>
  )
}

export default SideBarItem