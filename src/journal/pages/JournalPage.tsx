import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {

  const dispatch = useAppDispatch();
  const {isSaving, activeNote} = useAppSelector(({ journal }) => journal)
  const onClickNewNote = () => {
    console.log('di click');
    dispatch(startNewNote())
  }
  return (
    <JournalLayout>
      
      {/* <Typography>Sint id officia amet velit do aliqua aliqua est ea velit minim voluptate duis laboris. Esse esse consectetur ullamco excepteur ullamco amet. Mollit est nostrud nisi irure magna dolor eiusmod aliquip aliqua nostrud incididunt enim. Velit ipsum laborum Lorem anim laboris aute ullamco ipsum do adipisicing irure.</Typography> */}

      {
        activeNote     ? 
        (<NoteView />) :
        (<NothingSelectedView />)
      }
      
      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        disabled={isSaving}
        onClick={onClickNewNote}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}