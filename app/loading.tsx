import css from "./Home.module.css";
import { FadeLoader } from "react-spinners";

const Loader = () => {
    return <div className={css.loader}>
        <FadeLoader />
    </div>
}

export default Loader;