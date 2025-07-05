import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { useGetBookByIdQuery, useUpdateBookMutation } from '@/services/booksApi';
import type { IBookInput, ApiResponse, Book, IBookUpdate } from '../types/index';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';

export const EditBookPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get book ID from URL parameters

  // Fetch existing book data
  const { data: apiResponse, isLoading, isError, error } = useGetBookByIdQuery(id!, {
    skip: !id, // Skip query if ID is not available
  });
  const existingBook: Book | undefined = apiResponse?.data;

  // Mutation hook for updating the book
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  // State for form data, initialized with default values
  const [formData, setFormData] = useState<IBookInput>({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
    imgUrl: '',
    available: true,
  });
  const [available, setAvailable] = useState<boolean>(true);

  // Effect to populate form when existingBook data is loaded
  useEffect(() => {
    if (existingBook) {
      setFormData({
        title: existingBook.title,
        author: existingBook.author,
        genre: existingBook.genre,
        isbn: existingBook.isbn,
        description: existingBook.description,
        copies: existingBook.copies,
        imgUrl: existingBook.imgUrl,
        available: existingBook.available,
      });
      setAvailable(existingBook.available);
    }
  }, [existingBook]);

  // Handle loading state for fetching existing book
  if (isLoading) {
    return <div className="p-4 text-center text-lg font-medium">Loading book details...</div>;
  }

  // Handle error state for fetching existing book
  if (isError) {
    let errorMessage = 'An unknown error occurred while loading book details.';
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

  // If ID is missing from URL or book not found on backend
  if (!id || !existingBook) {
    return <div className="p-4 text-center text-gray-500">Book not found or invalid ID.</div>;
  }

  // Handle form input changes for text and textarea fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Handle changes specifically for the 'copies' number input
  const handleCopiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setFormData(prev => ({ ...prev, copies: value }));
      setAvailable(value > 0); // Business logic: Update availability based on copies
    }
  };

  // Handle form submission for updating the book
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.dismiss(); // Dismiss any existing toasts

    // Business logic: if copies are 0, set available to false regardless of checkbox
    const finalAvailable = formData.copies > 0 ? available : false;

    // Prepare data to send to the backend for update
    const bookDataToUpdate: IBookUpdate = { // Use IBookUpdate for flexibility
      ...formData,
      imgUrl: formData.imgUrl || 'https://placehold.co/150x200/cccccc/333333?text=No+Image', // Ensure imgUrl is always sent
      available: finalAvailable,
    };

    try {
      const result = await updateBook({ id: id, data: bookDataToUpdate }).unwrap();
      toast.success(result.message || 'Book updated successfully!');
      
      setTimeout(() => {
        navigate('/books');
      }, 1500);

    } catch (err) {
      // Handle API errors and display a toast notification
      let errorMessage = 'Failed to update book. Please try again.';
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
      toast.error(`Error: ${errorMessage}`); // Show error toast
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-2xl mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Book: {existingBook.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">Title</Label>
          <Input type="text" id="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="author" className="mb-1 block text-sm font-medium text-gray-700">Author</Label>
          <Input type="text" id="author" value={formData.author} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="genre" className="mb-1 block text-sm font-medium text-gray-700">Genre</Label>
          <Input type="text" id="genre" value={formData.genre} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="isbn" className="mb-1 block text-sm font-medium text-gray-700">ISBN</Label>
          <Input type="text" id="isbn" value={formData.isbn} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">Description</Label>
          <Textarea id="description" value={formData.description} onChange={handleChange} rows={4} />
        </div>
        <div>
          <Label htmlFor="imgUrl" className="mb-1 block text-sm font-medium text-gray-700">Image URL</Label>
          <Input type="url" id="imgUrl" value={formData.imgUrl} onChange={handleChange} placeholder="e.g., https://example.com/book.jpg" />
        </div>
        <div>
          <Label htmlFor="copies" className="mb-1 block text-sm font-medium text-gray-700">Copies</Label>
          <Input type="number" id="copies" value={formData.copies} onChange={handleCopiesChange} min="0" required />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="available" checked={available} onCheckedChange={(checked) => setAvailable(Boolean(checked))} disabled={formData.copies === 0} />
          <Label htmlFor="available">Available</Label>
          {formData.copies === 0 && <span className="text-sm text-red-500">(Automatically set to Unavailable if copies are 0)</span>}
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2" disabled={isUpdating}>
          {isUpdating ? 'Updating Book...' : 'Update Book'}
        </Button>
      </form>
    </div>
  );
};
