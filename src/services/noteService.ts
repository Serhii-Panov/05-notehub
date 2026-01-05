import axios from "axios";
import type {Note} from "../types/note"

interface FetchNotesParams {
    query?: string,
    tag?: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo",
    page : number,
    perPage: number,
    sortBy?: "created" | "updated"
}
interface NoteApiResponse {
    results:Note[],
    totalPages: number
}
const API_URL = "https://notehub-public.goit.study/api/notes"


export async function fetchNotes(params:FetchNotesParams) {
      try {
    const response = await axios.get<NoteApiResponse>(API_URL, {
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

    return response.data.results;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw new Error("Failed to fetch notes");
  }
    
    
    
    // має виконувати запит для отримання колекції нотаток із сервера. 
    // Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук);
}
export async function createNote(params:type) {
    // має виконувати запит для створення нової нотатки на сервері. 
    // Приймає вміст нової нотатки та повертає створену нотатку у відповіді;
}
export async function deleteNote(params:type) {
    // має виконувати запит для видалення нотатки за заданим ідентифікатором. 
    // Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.
}