import React from "react";
import css from "./layout.module.css";

interface LayoutNotesProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const LayoutNotes = ({ sidebar, children }: LayoutNotesProps) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default LayoutNotes;
