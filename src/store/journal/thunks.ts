import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { doc, collection, setDoc, deleteDoc } from "firebase/firestore";
import { Dispatch } from "react"
import { RootState } from '../store';
import { FirebaseDB } from '../../firebase/config';
import { addNewEntyNote, deleteNoteById, isLoadingJournal, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, TNote, updateNote } from "./journalSlice";
import { journalHelper, fileUpload } from "../../helpers";
import { CloudinaryResponse } from '../../interface/Cloudinary';

export const startNewNote = ():ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
      try {
        dispatch(isLoadingJournal());
        //uuid
        const { uid } = getState().auth;
        
        const newNote = {
        id: '',
        title: '',
        body: '',
        date: new Date().getTime(),
        imageUrls: []
        };

        const newDoc = doc(collection( FirebaseDB, `${uid}/journal/notes` ))
        await setDoc(newDoc, newNote);
        console.log(newDoc.id);
        newNote.id = newDoc.id;
        dispatch(addNewEntyNote(newNote))
        dispatch(setActiveNote(newNote))
        
      } catch (error) {
        if( error instanceof Error) {
            console.log(error.message);
        }
      }
    }
}


export const startLoadingNotes = ():ThunkAction<void, RootState, unknown, AnyAction> => {
  return async(dispatch, getState) => {
    try {
        const { uid } = getState().auth;
        
        if (!uid) throw new Error(`Id invalido`)
        
        const notes = await journalHelper.loadNotes(uid);
        dispatch(setNotes(notes))
        
    } catch (error) {
      if(error instanceof Error){
        console.log(error.message);
      }
    }
  }
}


export const activeNote = (note:TNote):ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    if (!note) return;

    dispatch(setActiveNote(note));
  };
};


export const startSaveNote = ({id, ...restNote}:TNote):ThunkAction<void, RootState, unknown, AnyAction> => {
  return async(dispath, getState) => {
    try {
      dispath(setSaving());
      const { uid } = getState().auth;
      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`);
      await setDoc(docRef, restNote, { merge: true });

      dispath(updateNote({id, ...restNote}));
      
    } catch (error) {
      if(error instanceof Error){
        console.log(error.message);
      };
    }
  }
};

export const startUploadingFiles = (files: FileList):ThunkAction<void, RootState, unknown, AnyAction> => {
  return async(dispatch, getState) => {
    try {
      dispatch(isLoadingJournal());
      const arrFilesPromise = [];

      for (const file of files) {
        arrFilesPromise.push(fileUpload(file));
      }

      const photosURL = await Promise.all(arrFilesPromise);
      const urls = photosURL.map(photo => {
        return photo!.url
      });

      dispatch(setPhotosToActiveNote(urls));
      
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } 
  }
};


export const startDeleteNote = ():ThunkAction<void, RootState, unknown, AnyAction> => {
  return async(dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      const { activeNote } = getState().journal;
      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote!.id}`);
      await deleteDoc(docRef);
      dispatch(deleteNoteById(activeNote!.id))
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
};