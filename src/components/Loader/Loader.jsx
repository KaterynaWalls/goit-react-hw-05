import { ThreeCircles } from "react-loader-spinner";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loaderContainer}>
      <div className={s.loader}>
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#61dafb"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default Loader;
