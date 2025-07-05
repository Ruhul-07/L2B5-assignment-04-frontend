import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

import { toast } from 'sonner';
import { useCreateBorrowMutation } from '@/services/booksApi';
import type { Book, IBorrowInput } from '@/types';
import { getErrorMessage } from '@/utils/typeGuards';

interface BorrowBookFormProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

export const BorrowBookForm: React.FC<BorrowBookFormProps> = ({ book, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [createBorrow, { isLoading }] = useCreateBorrowMutation();

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      const defaultDueDate = new Date();
      defaultDueDate.setDate(defaultDueDate.getDate() + 7); // Default to 7 days from now
      setDueDate(defaultDueDate);
    }
  }, [isOpen, book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.dismiss();

    if (quantity <= 0) {
      toast.error('Quantity must be at least 1.');
      return;
    }

    if (quantity > book.copies) {
      toast.error(`Cannot borrow ${quantity} copies. Only ${book.copies} available.`);
      return;
    }

    if (!dueDate) {
      toast.error('Please select a due date.');
      return;
    }

    // Ensure due date is in the future (or at least today if picking today is allowed)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day for comparison
    if (dueDate < today) {
      toast.error('Due date cannot be in the past.');
      return;
    }

    const borrowData: IBorrowInput = {
      bookId: book._id,
      quantity: quantity,
      dueDate: dueDate.toISOString(),
    };

    try {
      const result = await createBorrow(borrowData).unwrap();
      toast.success(result.message || 'Book borrowed successfully!');
      onClose();

    } catch (err) {
      const errorMessage = getErrorMessage(err);
      toast.error(`Error: ${errorMessage}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Borrow "{book.title}"</DialogTitle>
          <DialogDescription>
            Available copies: {book.copies}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={book.copies}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`col-span-3 w-full justify-start text-left font-normal ${!dueDate && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  disabled={(date) => date < new Date() && date.toDateString() !== new Date().toDateString()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Borrowing...' : 'Confirm Borrow'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
