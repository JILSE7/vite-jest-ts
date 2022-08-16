import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export type TNote = {
    id: string,
    title: string,
    body: string,
    date: number,
    imageUrls: string[],
}

interface IJournalState {
    isSaving: boolean;
    messageSaved: string;
    notes: TNote[],
    activeNote: TNote | null
}

const initialState : IJournalState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  activeNote: null
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
      addNewEntyNote: (state, action:PayloadAction<TNote>) => {
        state.notes.push(action.payload);
        state.isSaving = false;
      },
      isLoadingJournal: (state) => {
        state.isSaving = true;
      },
      setActiveNote: (state, action:PayloadAction<TNote>) => {
        state.activeNote = action.payload;
        state.messageSaved = '';
      },
      setNotes: (state, action) => {
        state.notes = action.payload
      },
      setSaving: (state) => {
        state.isSaving = true;
        state.messageSaved = '';
      },
      updateNote: (state, action:PayloadAction<TNote>) => {
        state.isSaving = false;
        state.notes = state.notes.map(note => {
          if (note.id === action.payload.id) {
            return {
              ...action.payload
            }
          }
          return note;
        });
        state.messageSaved = `${action.payload.title} actualizado correctamente`;
      },

      setPhotosToActiveNote: (state, action:PayloadAction<string[]>) => {
        state.isSaving = false;
        
        if (state.activeNote) state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
      },
      deleteNoteById: (state, action:PayloadAction<string>) => {
        state.notes = state.notes.filter(note => note.id !== action.payload);
        state.activeNote = null;
      },
      journalLogout: (state) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.activeNote = null;
      }
  },
});

export const { 
  addNewEntyNote,
  deleteNoteById,
  isLoadingJournal,
  journalLogout,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;  // -> action creators functions

export default journalSlice;