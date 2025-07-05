import { baseApi } from '../redux/api/api';
import type { Book, ApiResponse, IBookInput, IBookUpdate, IBorrow, IBorrowInput, IBorrowSummary } from '../types/index';

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Query to get all books
    getBooks: builder.query<ApiResponse<Book[]>, void>({
      query: () => '/books',
      providesTags: ['Books'],
    }),
    // Query to get a single book by ID
    getBookById: builder.query<ApiResponse<Book>, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Books', id }],
    }),
    // to create a new book
    createBook: builder.mutation<ApiResponse<Book>, IBookInput>({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Books'],
    }),
    // to update an existing book
    updateBook: builder.mutation<ApiResponse<Book>, { id: string; data: IBookUpdate }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Books', id }],
    }),
    // to delete a book
    deleteBook: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error) => [{ type: 'Books'}],
    }),
    // to create a borrow record
    createBorrow: builder.mutation<ApiResponse<IBorrow>, IBorrowInput>({
      query: (borrowData) => ({
        url: '/borrows',
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Books', 'Borrows'],
    }),
    // Query to get borrow summary
    getBorrowSummary: builder.query<ApiResponse<IBorrowSummary[]>, void>({
      query: () => '/borrows/summary',
      providesTags: ['Borrows'],
    }),
  }),
  overrideExisting: false,
});

// Export all created hooks
export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateBorrowMutation,
  useGetBorrowSummaryQuery,
} = bookApi;
