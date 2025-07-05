import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useGetBooksQuery, useDeleteBookMutation } from '@/services/booksApi';

// Import types
import type { Book } from '../types/index';
import { getErrorMessage } from '@/utils/typeGuards';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '../components/ui/dialog';

import { toast } from 'sonner';

import { BorrowBookForm } from '@/components/shared/BorrowBookForm';

export const AllBookPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [bookToDeleteId, setBookToDeleteId] = useState<string | null>(null);

  // State for Borrow Form Dialog
  const [showBorrowDialog, setShowBorrowDialog] = useState(false);
  const [selectedBookForBorrow, setSelectedBookForBorrow] = useState<Book | null>(null);

  // Fetch books using RTK Query hook
  const { data: apiResponse, isLoading, isError, error } = useGetBooksQuery();
  // Get the delete mutation hook
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  // Extract the actual array of books from the API response object
  const allBooks: Book[] | undefined = apiResponse?.data;

  // Handle loading state
  if (isLoading) {
    return <div className="p-4 text-center text-lg font-medium">Loading books...</div>;
  }

  // Handle error state for fetching books
  if (isError) {
    const errorMessage = getErrorMessage(error); // Use the utility function
    return <div className="p-4 text-center text-red-600 font-semibold">Error: {errorMessage}</div>;
  }

  // Handle case where no book data is available or invalid format
  if (!allBooks || !Array.isArray(allBooks)) {
    return <div className="p-4 text-center text-gray-500">No book data available or invalid data format received.</div>;
  }

  // Filter books based on search term
  const filteredBooks = allBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle delete button click (opens confirmation dialog)
  const handleDeleteClick = (bookId: string) => {
    setBookToDeleteId(bookId);
    setShowConfirmDeleteDialog(true);
  };

  // Function to confirm and execute deletion
  const confirmDelete = async () => {
    if (!bookToDeleteId) return;

    try {
      await deleteBook(bookToDeleteId).unwrap();
      toast.success('Book deleted successfully!');
      setShowConfirmDeleteDialog(false);
      setBookToDeleteId(null);
    } catch (err) {
      const errorMessage = getErrorMessage(err); // Use the utility function
      toast.error(`Error: ${errorMessage}`);
      setShowConfirmDeleteDialog(false);
    }
  };

  // Function to handle borrow button click (opens borrow form dialog)
  const handleBorrowClick = (book: Book) => {
    setSelectedBookForBorrow(book);
    setShowBorrowDialog(true);
  };

  const handleCloseBorrowDialog = () => {
    setShowBorrowDialog(false);
    setSelectedBookForBorrow(null);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Books (Table View)</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Input
          type="text"
          placeholder="Search by title, author, genre, or ISBN..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md w-full"
        />
        <div className="flex gap-2">
          <Link to="/create-book">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200">
              Add New Book
            </Button>
          </Link>
          <Link to="/borrow-summary">
            <Button variant="outline" className="px-6 py-2 rounded-md transition-colors duration-200">
              View Borrow Summary
            </Button>
          </Link>
        </div>
      </div>

      {/* Render the table view */}
      {filteredBooks.length > 0 ? (
        <div className="overflow-x-auto border border-gray-200 rounded-md shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Genre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ISBN
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Copies
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.genre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.isbn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.copies}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {book.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Edit Button */}
                    <Link to={`/edit-book/${book._id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                      >
                        Edit
                      </Button>
                    </Link>
                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-900 ml-2 p-1"
                      onClick={() => handleDeleteClick(book._id)}
                      disabled={isDeleting}
                    >
                      {isDeleting && bookToDeleteId === book._id ? 'Deleting...' : 'Delete'}
                    </Button>
                    {/* Borrow Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-900 ml-2 p-1"
                      onClick={() => handleBorrowClick(book)}
                      disabled={!book.available || book.copies === 0}
                    >
                      Borrow
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="p-6 text-center text-gray-500">No books found matching your search criteria.</p>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showConfirmDeleteDialog} onOpenChange={setShowConfirmDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this book? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Borrow Book Form Dialog */}
      {selectedBookForBorrow && (
        <BorrowBookForm
          book={selectedBookForBorrow}
          isOpen={showBorrowDialog}
          onClose={handleCloseBorrowDialog}
        />
      )}
    </div>
  );
};
