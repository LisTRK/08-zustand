"use client";
import { getNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
// import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, error, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch the list of notes. {error.message}</p>;

  return (
    <>
      <Modal onClose={() => router.back()}>
        {data && (
          <div className={css.container}>
            <button onClick={() => router.back()} className={css.button}>
              ← Back
            </button>

            <div className={css.item}>
              <div className={css.header}>
                <h2>{data.title}</h2>
              </div>
              <p className={css.content}>{data.content}</p>
              <p className={css.date}>Created date: {data.createdAt}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default NotePreviewClient;
