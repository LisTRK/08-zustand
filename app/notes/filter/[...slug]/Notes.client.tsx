"use client";

import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./page.module.css";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import { Tag } from "@/types/note";
import Link from "next/link";

interface NotesClientProps {
  tag?: Tag;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const queryDebounced = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 500);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", query, page, tag],
    queryFn: () => fetchNotes(query, page, tag),
    placeholderData: keepPreviousData,
  });

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
        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </header>

      {isSuccess && data?.notes.length > 0 && (
        <NoteList notes={data.notes ?? []} />
      )}
    </div>
  );
};

export default NotesClient;
