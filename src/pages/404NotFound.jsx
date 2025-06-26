import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-linen text-center px-4 pt-20">
      <h1 className="text-6xl font-bold text-deepPlum mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/home"
        className="bg-deepPlum text-white px-6 py-2 rounded hover:bg-deepPlum/90"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
