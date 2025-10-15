import css from "./Home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "This page does not exist or has been moved.",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description: "This page does not exist or has been moved.",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 - Page not found | NoteHub",
      },
    ],
  },
};

const notFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default notFound;
