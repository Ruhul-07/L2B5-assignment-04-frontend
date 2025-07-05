import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { useCreateBookMutation } from '@/services/booksApi';
import type { IBookInput } from '../types/index';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/typeGuards';

export const AddBookPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IBookInput>({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
    imgUrl: '',
  });
  const [available, setAvailable] = useState<boolean>(true);
  const [createBook, { isLoading }] = useCreateBookMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCopiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setFormData(prev => ({ ...prev, copies: value }));
      setAvailable(value > 0); // Update availability based on copies
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.dismiss();

    const finalAvailable = formData.copies > 0 ? available : false;

    const bookDataToSend: IBookInput = {
      ...formData,
      imgUrl: formData.imgUrl || 'https://placehold.co/150x200/cccccc/333333?text=No+Image',
      available: finalAvailable,
    };

    try {
      const result = await createBook(bookDataToSend).unwrap();
      toast.success(result.message || 'Book added successfully!');

      setFormData({
        title: '', author: '', genre: '', isbn: '', description: '', copies: 1, imgUrl: '',
      });
      setAvailable(true);

      setTimeout(() => {
        navigate('/books');
      }, 1500);

    } catch (err) {
      const errorMessage = getErrorMessage(err);
      toast.error(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-2xl mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Book</h1>

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

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2" disabled={isLoading}>
          {isLoading ? 'Adding Book...' : 'Add Book'}
        </Button>
      </form>
    </div>
  );
};

export default AddBookPage;
