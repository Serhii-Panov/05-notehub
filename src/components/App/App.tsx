import { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchNotes } from "../../services/noteService";
function App() {
  console.log(fetchNotes({
    page: 1,
    perPage: 10,
  }))
  return <></>
}

export default App;
