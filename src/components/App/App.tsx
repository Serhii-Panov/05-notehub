import css from "./App.module.css";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import type { FetchNotesParams } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState<FetchNotesParams>({
    search: searchQuery,
    page: currentPage,
    perPage: 10,
  });
  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
      setCurrentQuery((prev) => ({ ...prev, search: e.target.value, page: 1 }));
    },
    300
  );
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentQuery],
    queryFn: () => fetchNotes(currentQuery),
    placeholderData: keepPreviousData,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={updateSearchQuery} searchQuery={searchQuery} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={({ selected }) => {
              setCurrentPage(selected + 1);
              setCurrentQuery((prev) => ({ ...prev, page: selected + 1 }));
            }}
          />
        )}
        {
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        }
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data?.notes && data.notes.length === 0 && (
        <p>No notes found. Try creating one!</p>
      )}
      {modalOpen && (
        <Modal
          onClose={closeModal}
          children={<NoteForm onClose={closeModal} />}
        />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
