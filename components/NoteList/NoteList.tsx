

import { deleteNote } from "@/lib/api";
import css from "./NoteList.module.css";
import { Note } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface NoteListProps{
  notes: Note[],
}

const NoteList = ({ notes }: NoteListProps) => {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess:()=>queryClient.invalidateQueries({ queryKey: ["notes"] }),
  })

  
  
  return <ul className={css.list}>
    {/* Набір елементів списку нотаток */}
    {notes?.map(note => 
      // <NoteItem note={note} key={note.id} />
      <li className={css.listItem} key={note.id}>
                <h2 className={css.title}>{note.title}</h2>
                <p className={css.content}>{note.content}</p>
                {/* <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p> */}
        <div className={css.footer}>
               <span className={css.tag}>{note.tag}</span>
        </div>
        <Link href={`/notes/${note.id}`}>
             View details
        </Link>
        <button className={css.button} onClick={() =>
          mutation.mutate(note.id)
        } >Delete</button>
    </li>
    )}
  
</ul>
}

export default NoteList;