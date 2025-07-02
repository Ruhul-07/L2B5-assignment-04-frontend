import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-blue-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand/Logo Link */}
        <Link to="/" className="text-white text-2xl font-bold rounded-md hover:text-blue-100 transition-colors">
          Book App
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/books"
              className="text-white text-lg font-medium hover:text-blue-200 transition-colors p-2 rounded-md hover:bg-blue-600"
            >
              All Books
            </Link>
          </li>
          <li>
            <Link
              to="/add-book"
              className="text-white text-lg font-medium hover:text-blue-200 transition-colors p-2 rounded-md hover:bg-blue-600"
            >
              Add Book
            </Link>
          </li>
          <li>
            <Link
              to="/borrow-summary"
              className="text-white text-lg font-medium hover:text-blue-200 transition-colors p-2 rounded-md hover:bg-blue-600"
            >
              Borrow Summary
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
