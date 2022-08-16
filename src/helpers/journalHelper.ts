import { collection, getDocs } from "firebase/firestore"
import { FirebaseDB } from '../firebase/config';
import { TNote } from '../store/journal/journalSlice';

export const loadNotes = async(uid:string = ''):Promise<TNote[]> => {
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const auxDocs: TNote[] = [];
  docs.docs.forEach( item => {
    auxDocs.push({...item.data(), id: item.id } as TNote);
  })
  
  return auxDocs;
}