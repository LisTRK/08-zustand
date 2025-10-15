import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./create.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create new Note | NoteHub",
  description:
    "Quickly create a new note in NoteHub — the efficient app for organizing your thoughts and ideas.",
  openGraph: {
    title: "Create new Note | NoteHub",
    description:
      "Quickly create a new note in NoteHub — the efficient app for organizing your thoughts and ideas.",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: `Create new Note | NoteHub`,
      },
    ],
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create Note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
