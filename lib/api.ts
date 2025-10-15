import axios from "axios";
import type { CreateNoteProps, Note, Tag } from "../types/note";

interface NotesDataType {
  notes: Note[],
  totalPages: number,
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;


export const fetchNotes = async (search?: string, page?: number, tag?: Tag): Promise<NotesDataType> => { 
  
  

  const options = {
    params: {
        ...(search  && { search}),
        ...(page && { page}),
        ...(tag && { tag }),
        perPage: 10,
    }
};

    const response = await axios.get<NotesDataType>("notes", options);

  return response.data;


};






export const createNote =async (newNote: CreateNoteProps):Promise<Note> => {
    const response = await axios.post<Note>('/notes', newNote);
    return response.data;
 };


export const deleteNote =async (noteID: string):Promise<Note> => { 
  const response = await axios.delete<Note>(`/notes/${noteID}`);
   return response.data;
};


export const getNoteById =async (noteID: string):Promise<Note> => { 
    const response = await axios.get<Note>(`/notes/${noteID}`);
   return response.data;
  };