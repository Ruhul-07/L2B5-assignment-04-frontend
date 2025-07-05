
// --- Book Interfaces ---

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  imgUrl: string; 
  copies: number;
  available: boolean;
  createdAt: string; 
  updatedAt: string; 
}

// Represents the input payload for creating a new book (POST /books).

export interface IBookInput {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  imgUrl: string; 
  available?: boolean;
}

// Represents the input payload for updating an existing book (PATCH /books/:id).

export interface IBookUpdate extends Partial<IBookInput> {
  available?: boolean;
}

// --- Borrow Interfaces ---

export interface IBorrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  isbn: string;
  quantity: number;
  dueDate: string;
  borrowDate: string;
  createdAt: string;
  updatedAt: string;
}

// Represents the input payload for borrowing a book (POST /borrows).
export interface IBorrowInput {
  bookId: string;
  quantity: number;
  dueDate: string;
}

// Represents the structure for the borrow summary aggregation.
export interface IBorrowSummary {
  _id: string;
  bookTitle: string;
  isbn: string;
  totalQuantityBorrowed: number;
  borrowCount: number;
}

// --- API Response Structures ---

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Specific error response structure for client-side handling.
// 'error' can be a string or undefined based on NODE_ENV.
export interface ErrorResponse {
  message: string;
  error?: string | undefined;
  statusCode?: number;
}

// Specific response structure for the borrow book operation.
export interface BorrowResponse {
  message: string;
  borrow: IBorrow;
  updatedBook: Book;
}
