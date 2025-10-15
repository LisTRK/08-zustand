"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote } from "../../lib/api";
import type { CreateNoteProps, Tag } from "../../types/note";

import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";

const NoteForm = () => {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const data: CreateNoteProps = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as Tag,
    };

    mutate(data);
  };

  console.log("draft", draft);

  const handleClose = () => router.back();

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={draft.title}
          onChange={handleChange}
          className={css.input}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows={8}
          name="content"
          value={draft.content}
          onChange={handleChange}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleClose}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
