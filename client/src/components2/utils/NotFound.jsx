import { Link } from "react-router-dom";

import "./css/not-found.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div>
        <span className="nf-text">404 | Not Found</span>

        <Link className="nf-link" to="/">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
