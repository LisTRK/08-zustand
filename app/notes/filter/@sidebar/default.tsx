import { Tag } from "@/types/note";
import css from "./sidebarNotes.module.css";
import Link from "next/link";

const defaultSidebarNotes = () => {
  const tags: Tag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/All`} className={css.menuLink}>
          All
        </Link>
      </li>
      {tags.map((tag, i) => {
        return (
          <li className={css.menuItem} key={i}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default defaultSidebarNotes;
