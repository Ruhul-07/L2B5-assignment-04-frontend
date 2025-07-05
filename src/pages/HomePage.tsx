import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useGetBooksQuery, useDeleteBookMutation } from '@/services/booksApi';

// Import types
import type { Book, ApiResponse } from '../types/index';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

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
import BookCardView  from '../components/shared/BookCardView';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [bookToDeleteId, setBookToDeleteId] = useState<string | null>(null);

  // State for Borrow Form Dialog
  const [showBorrowDialog, setShowBorrowDialog] = useState(false);
  const [selectedBookForBorrow, setSelectedBookForBorrow] = useState<Book | null>(null);

  // Fetch real book data using RTK Query hook
  const { data: apiResponse, isLoading, isError, error } = useGetBooksQuery();
  // Get the delete mutation hook
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  // Extract the actual array of books from the API response object
  const allBooks: Book[] | undefined = apiResponse?.data;

  // Handle loading state for fetching books
  if (isLoading) {
    return <div className="p-4 text-center text-lg font-medium">Loading books...</div>;
  }

  // Handle error state for fetching books
  if (isError) {
    let errorMessage = 'An unknown error occurred while loading books.';
    if (error && 'status' in error) {
      const apiError = error as FetchBaseQueryError;
      if (apiError.data && typeof apiError.data === 'object' && apiError.data !== null) {
        const backendError = apiError.data as ApiResponse;
        errorMessage = backendError.message || backendError.error || errorMessage;
      } else if (typeof apiError.error === 'string') {
        errorMessage = apiError.error;
      }
    } else if (error && 'message' in error) {
      errorMessage = error.message;
    }
    return <div className="p-4 text-center text-red-600 font-semibold">Error: {errorMessage}</div>;
  }

  // Handle case where no book data is available or invalid format
  if (!allBooks || !Array.isArray(allBooks)) {
    return <div className="p-4 text-center text-gray-500">No book data available or invalid data format received.</div>;
  }

  // Filter books based on search term (case-insensitive, checks title, author, genre, isbn)
  const filteredBooks = allBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle delete button click
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
      let errorMessage = 'Failed to delete book.';
      if (err && 'status' in err) {
        const apiError = err as FetchBaseQueryError;
        if (apiError.data && typeof apiError.data === 'object' && apiError.data !== null) {
          const backendError = apiError.data as ApiResponse;
          errorMessage = backendError.message || backendError.error || errorMessage;
        } else if (typeof apiError.error === 'string') {
          errorMessage = apiError.error;
        }
      } else if (err && 'message' in err) {
        errorMessage = err.message;
      }
      toast.error(`Error: ${errorMessage}`);
      setShowConfirmDeleteDialog(false);
    }
  };

  // Function to handle borrow button click
  const handleBorrowClick = (book: Book) => {
    setSelectedBookForBorrow(book);
    setShowBorrowDialog(true);
  };

  const handleCloseBorrowDialog = () => {
    setShowBorrowDialog(false);
    setSelectedBookForBorrow(null);
  };

  return (
    <div className="space-y-20 pb-20">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-10 sm:p-16 rounded-xl shadow-2xl text-center overflow-hidden">
        {/* Subtle background pattern for visual interest */}
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zm0 30V28h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 30V58h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zm0 30V28h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 30V58h-2v4h-4v2h4v4h2v-4h4v-2h-4z\' fill=\'%23fff\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        <div className="relative z-10"> {/* Ensure content is above the pattern */}
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg animate-fade-in-down">
            Your Ultimate Book Management Companion
          </h1>
          <p className="text-lg sm:text-2xl opacity-90 max-w-4xl mx-auto mb-10 animate-fade-in-up">
            Effortlessly organize your personal library, track borrowed books, and discover your next great read.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in">
            <Link to="/books" className="group">
              <Button className="bg-white text-blue-700 hover:bg-gray-100 px-10 py-5 text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
                Explore My Library
              </Button>
            </Link>
            <Link to="/create-book" className="group">
              <Button variant="outline" className="border-2 border-white text-blue-950 hover:bg-blue-700 px-10 py-5 text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
                Add a New Book
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Book List Section */}
      <section className="px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">Our Book Collection</h2>
        <div className="flex justify-center mb-6">
          <Input
            type="text"
            placeholder="Search by title, author, genre, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md w-full"
          />
        </div>
        {filteredBooks.length > 0 ? (
          <BookCardView
            books={filteredBooks}
            handleDeleteClick={handleDeleteClick}
            handleBorrowClick={handleBorrowClick}
            isDeleting={isDeleting}
            bookToDeleteId={bookToDeleteId}
          />
        ) : (
          <p className="p-6 text-center text-gray-500">No books found matching your search.</p>
        )}
      </section>

      {/* Final Call to Action Section (kept for strong closing) */}
      <section className="bg-blue-100 p-10 sm:p-12 rounded-lg shadow-inner text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-6">Ready to Organize Your Books?</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          Join countless book lovers who are taking control of their libraries. It's free, fast, and simple!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/create-book" className="group">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-5 text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
              Start Managing My Books
            </Button>
          </Link>
          <Link to="/borrow-summary" className="group">
            <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-200 px-10 py-5 text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
              View Borrow Summary
            </Button>
          </Link>
        </div>
      </section>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showConfirmDeleteDialog} onOpenChange={setShowConfirmDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deialog</DialogTitle>
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
export  default HomePage;
