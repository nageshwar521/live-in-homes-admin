import { Link, useLocation } from "react-router-dom";

/**
 * "Not Found" aka "Error 404" view
 */
const NotFound: React.FC<{ redirectTo?: string; label?: string }> = ({
  redirectTo = "/",
  label = "Click Here",
}) => {
  const location = useLocation();
  return (
    <div>
      <p>
        You've called the <b>{location?.pathname}</b> url that doesn't exist
      </p>
      <p>
        Go to <Link to={redirectTo}>{label}</Link>
      </p>
    </div>
  );
};

export default NotFound;
