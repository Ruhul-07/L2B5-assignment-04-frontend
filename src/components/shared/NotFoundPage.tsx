import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center bg-white shadow-md rounded-lg p-8 mx-auto mt-10 max-w-lg border border-gray-200">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-6">Page Not Found</p>
      <p className="text-lg text-gray-500 mb-8">
        Oops! The page you're looking for does not exist or has been moved.
      </p>
      <Link to="/">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md transition-all duration-200">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
};
