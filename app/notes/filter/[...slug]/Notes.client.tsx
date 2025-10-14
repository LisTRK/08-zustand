"use client";

import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./page.module.css";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Tag } from "@/types/note";

interface NotesClientProps {
  tag?: Tag;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const queryDebounced = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 500);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", query, page, tag],
    queryFn: () => fetchNotes(query, page, tag),
    placeholderData: keepPreviousData,
  });

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        <SearchBox value={query} onSearch={queryDebounced} />

        {/* Пагінація */}
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data?.totalPages ?? 1}
            setPage={setPage}
          />
        )}

        {/* Кнопка створення нотатки */}
        <button onClick={handleOpenModal} className={css.button}>
          Create note +
        </button>
      </header>

      {isSuccess && <NoteList notes={data?.notes ?? []} />}
      {isOpenModal && (
        <Modal onClose={handleOpenModal}>
          <NoteForm onClose={handleOpenModal} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
