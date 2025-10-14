"use client";
import React, { useState } from "react";

import css from "./TagsMenu.module.css";
import Link from "next/dist/client/link";
import { Tag } from "@/types/note";
const tags: Tag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={handleClick}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {/* список тегів */}
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/All`}
              className={css.menuLink}
              onClick={handleClick}
            >
              All
            </Link>
          </li>
          {tags.map((tag, i) => {
            return (
              <li className={css.menuItem} key={i}>
                <Link
                  href={`/notes/filter/${tag}`}
                  className={css.menuLink}
                  onClick={handleClick}
                >
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
