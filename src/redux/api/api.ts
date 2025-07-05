
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://library-management-backend-tawny.vercel.app/api',
  }),

  tagTypes: ['Books', 'Borrows'],

  endpoints: (_builder) => ({}),
  refetchOnMountOrArgChange: true,
});
