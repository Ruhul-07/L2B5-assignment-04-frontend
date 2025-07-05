import { baseApi } from '../redux/api/api';
import type { Book, ApiResponse, IBookInput, IBorrow, IBorrowInput, IBorrowSummary } from '../types/index';

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
      providesTags: (result, error, id) => [{ type: 'Books', id }],
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
    // Update a book
    updateBook: builder.mutation<ApiResponse<Book>, { id: string; data: Partial<IBookInput> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_, _error, { id }) => [{ type: 'Books', id }],
    }),
    // Delete sa book
    deleteBook: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, _error, id) => [{ type: 'Books'}],
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
    // to get borrow summary
    getBorrowSummary: builder.query<ApiResponse<IBorrowSummary[]>, void>({
      query: () => '/borrows/summary',
      providesTags: ['Borrows'],
    }),
  }),
  overrideExisting: false,
});

// Export all my create hooks, including the new borrow hooks
export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateBorrowMutation,
  useGetBorrowSummaryQuery,
} = bookApi;
