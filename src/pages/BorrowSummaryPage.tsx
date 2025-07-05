import React from 'react';
import { useGetBorrowSummaryQuery } from '@/services/booksApi';
import type { IBorrowSummary } from '@/types';
import { getErrorMessage } from '@/utils/typeGuards';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const BorrowSummaryPage: React.FC = () => {
  const { data: apiResponse, isLoading, isError, error } = useGetBorrowSummaryQuery();

  const borrowSummaries: IBorrowSummary[] | undefined = apiResponse?.data;

  if (isLoading) {
    return <div className="p-4 text-center text-lg font-medium">Loading borrow summary...</div>;
  }

  if (isError) {
    const errorMessage = getErrorMessage(error);
    return <div className="p-4 text-center text-red-600 font-semibold">Error: {errorMessage}</div>;
  }

  if (!borrowSummaries || !Array.isArray(borrowSummaries)) {
    return <div className="p-4 text-center text-gray-500">No borrow summary data available or invalid data format received.</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Borrow Summary</h1>

      <div className="flex justify-end mb-4">
        <Link to="/books">
          <Button variant="outline">Back to Book List</Button>
        </Link>
      </div>

      {borrowSummaries.length > 0 ? (
        <div className="overflow-x-auto border border-gray-200 rounded-md shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ISBN
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Quantity Borrowed
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {borrowSummaries.map((summary) => (
                <tr key={summary._id.toString()} className="hover:bg-gray-50 transition-colors duration-150"> {/* Convert ObjectId to string */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{summary.bookTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{summary.isbn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{summary.totalQuantityBorrowed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="p-6 text-center text-gray-500">No books have been borrowed yet.</p>
      )}
    </div>
  );
};

export default BorrowSummaryPage;
