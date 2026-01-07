import axios from "axios";
import type {Note} from "../types/note"

export interface FetchNotesParams {
    query?: string,
    tag?: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo",
    page : number,
    perPage: number,
    sortBy?: "created" | "updated"
}
interface createNoteParams {
    title: string,
    content: string,
    tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo"
}
interface NoteApiResponse {
    notes:Note[],
    totalPages: number
}
const API_URL = "https://notehub-public.goit.study/api/notes"


export async function fetchNotes(params:FetchNotesParams):Promise<NoteApiResponse> {
      try {
    const {data} = await axios.get<NoteApiResponse>(API_URL, {
      params: {
        query: params.query,
        tag: params.tag,
        page: params.page,
        perPage: params.perPage,
        sortBy: params.sortBy
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
        Accept: "application/json",
      },
    });
    console.log('Raw API response:', data);  // ADD THIS LINE
    return data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw new Error("Failed to fetch notes");
  }
}
export async function createNote(newNote:createNoteParams): Promise<Note> {
  try {
    const {data} = await axios.post<Note>(API_URL, newNote, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
        Accept: "application/json",
      }
    });

    return data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw new Error("Failed to create note");
  }
    // має виконувати запит для створення нової нотатки на сервері. 
    // Приймає вміст нової нотатки та повертає створену нотатку у відповіді;
}
export async function deleteNote(id:string): Promise<Note> {
      try {
    const {data} = await axios.delete<Note>(`${API_URL}/${id}`, {
        headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
        Accept: "application/json",
      }
    });

    return data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw new Error("Failed to create note");
  }
    // має виконувати запит для видалення нотатки за заданим ідентифікатором. 
    // Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.
}