import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4 text-center">
      <FaLock className="text-red-500 text-6xl mb-4" />
      <h1 className="text-5xl font-bold text-red-500 mb-2">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Forbidden Access</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Sorry, you don&apos;t have permission to access this page. If you think
        this is a mistake, please contact the administrator.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
