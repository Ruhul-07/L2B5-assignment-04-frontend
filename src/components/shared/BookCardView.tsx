// src/components/BookCardView.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

// Import types
import type { Book } from '../../types/index';

interface BookCardViewProps {
  books: Book[];
  handleDeleteClick: (bookId: string) => void;
  handleBorrowClick: (book: Book) => void;
  isDeleting: boolean;
  bookToDeleteId: string | null;
}

const BookCardView: React.FC<BookCardViewProps> = ({
  books,
  handleDeleteClick,
  handleBorrowClick,
  isDeleting,
  bookToDeleteId,
}) => {
  if (!books || books.length === 0) {
    return <p className="p-6 text-center text-gray-500">No books found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {books.map((book) => (
        <div
          key={book._id}
          className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02]"
        >
          {/* Book Image */}
          <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={book.imgUrl || 'https://placehold.co/150x200/cccccc/333333?text=No+Image'}
              alt={book.title}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.onerror = null; // prevents looping
                e.currentTarget.src = 'https://placehold.co/150x200/cccccc/333333?text=No+Image';
              }}
            />
            {/* Availability Badge */}
            <span className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full
              ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`
            }>
              {book.available ? 'Available' : 'Unavailable'}
            </span>
          </div>

          {/* Book Details */}
          <div className="p-4 flex-grow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate" title={book.title}>
              {book.title}
            </h3>
            <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
            <p className="text-gray-500 text-xs mb-1">Genre: {book.genre}</p>
            <p className="text-gray-500 text-xs mb-1">ISBN: {book.isbn}</p>
            <p className="text-gray-700 text-sm mt-2">Copies: {book.copies}</p>
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-gray-100 flex justify-around items-center space-x-2">
            <Link to={`/edit-book/${book._id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-indigo-600 hover:text-indigo-900">
                Edit
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              className="flex-1"
              onClick={() => handleDeleteClick(book._id)}
              disabled={isDeleting && bookToDeleteId === book._id}
            >
              {isDeleting && bookToDeleteId === book._id ? 'Deleting...' : 'Delete'}
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => handleBorrowClick(book)}
              disabled={!book.available || book.copies === 0}
            >
              Borrow
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default BookCardView;