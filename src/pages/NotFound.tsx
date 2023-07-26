import { Link, useLocation } from "react-router-dom";

/**
 * "Not Found" aka "Error 404" view
 */
const NotFound = () => {
  const location = useLocation();
  return (
    <div>
      <p>
        You've called the <b>{location?.pathname}</b> url that doesn't exist
      </p>
      <p>
        Go to <Link to="/cafes">cafes</Link>
      </p>
    </div>
  );
};

export default NotFound;
