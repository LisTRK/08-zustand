import css from "./NoteDetailst.module.css";
import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className={css.loader}>
      <FadeLoader />
      <p>Loading, please wait...</p>
    </div>
  );
};

export default Loader;
