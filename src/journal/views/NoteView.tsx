import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components'
import { useFormik } from 'formik';
import { TNote } from '../../store/journal';
import * as Yup from 'yup';
import { ChangeEvent, ChangeEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import useRedux, { useAppDispatch } from '../../hooks/useRedux';
import { startDeleteNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks';
import Swal from 'sweetalert2';

import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {
  const {useAppSelector, dispatch} = useRedux();
  const {activeNote, messageSaved, isSaving} = useAppSelector(state => state.journal);
  const inputRef = useRef<HTMLInputElement|null>(null);
  
  if (!activeNote) return;

  const {handleSubmit, errors, touched, getFieldProps, values, setValues} = useFormik<TNote>({
    initialValues :  activeNote,
    onSubmit : () => {
      dispatch(startSaveNote(values));
    },
    validationSchema:Yup.object(validationSchema())
  });

  console.log(errors);
  
  const dateNote = useMemo(() =>{
    if (!activeNote?.date) return;
    return new Date(activeNote?.date).toUTCString()
  }, [activeNote?.date]);

  function onFileInputChange({ target }: ChangeEvent<HTMLInputElement>) {
    if (!target.files || target.files?.length === 0) return;

    dispatch(startUploadingFiles(target.files));
  }

  useEffect(() => {
    setValues({...activeNote});
  }, [activeNote]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved]);
  
  function onDelete() {
    dispatch(startDeleteNote());
  }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }} >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{dateNote}</Typography>
        </Grid>
        <Grid item>
            <Button disabled={isSaving} color="primary" sx={{ padding: 2 }} onClick={() => handleSubmit()}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>
        <input type="file" multiple  onChange={onFileInputChange} style={{display:'none'}} ref={inputRef}/>
        <IconButton color='primary' disabled={isSaving} onClick={() => inputRef.current?.click()}>
          <UploadOutlined/>
        </IconButton>
        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                {...getFieldProps('title')}
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                {...getFieldProps('body')}
            />
        </Grid>
        <Grid justifyContent={'end'}>
          <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
            <DeleteOutline />
            Borrar
          </Button>
        </Grid>
        {/* Image gallery */}
        <ImageGallery imagesUrls={activeNote.imageUrls} />

    </Grid>
  )
}

const validationSchema = () => ({
    title: Yup.string().max(30,'Debe tener 30 caracteres o menos').required('Required'),
    body: Yup.string().max(30,'Debe tener 10 caracteres o menos').required('Required'),
});