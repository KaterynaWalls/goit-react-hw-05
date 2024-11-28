
import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404 - Page Not Found</h1>
      <p className={s.message}>
        Oops! We couldn't find the page you're looking for. It might have been removed or is temporarily unavailable.
      </p>
      <Link to="/" className={s.backHome}>
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
