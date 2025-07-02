// import { Button } from "@/components/ui/button";
// const AllBookPage = () => {
//   // In my application, you would fetch book data here 


//   return (
//     <div className="p-8 bg-white shadow-md rounded-lg">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">All Books</h1>

//       {/* Placeholder for your Book Table/List/Grid */}
//       <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 text-gray-600 text-center">
//         <p className="mb-4">This is where your **Book Table/List/Grid** will be displayed.</p>
//         <p className="mb-4">You will fetch and render your list of books here, along with actions like:</p>
//         <ul className="list-disc list-inside text-left mx-auto max-w-sm">
//           <li>View Book Details</li>
//           <li>Edit Book</li>
//           <li>Delete Book</li>
//           <li>Mark as Borrowed/Returned</li>
//           {/* Add more core actions as needed */}
//         </ul>
//         <p className="mt-4 text-sm italic">Start building your book display here!</p>
//       </div>
//       <Button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
//         Add New Book
//       </Button>
//     </div>
//   );
// };
// export default AllBookPage;




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button'; // Assuming Shadcn Button is available
import { Input } from '../components/ui/input';   // Assuming Shadcn Input is available


export const AllBookPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy book data for demonstration purposes
  const dummyBooks = [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', borrowed: false },
    { id: '2', title: '1984', author: 'George Orwell', genre: 'Dystopian', borrowed: true },
    { id: '3', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', borrowed: false },
    { id: '4', title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', borrowed: false },
    { id: '5', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', borrowed: true },
    { id: '6', title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', borrowed: false },
    { id: '7', title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', borrowed: true },
  ];

  // Filter books based on search term (case-insensitive, checks title and author)
  const filteredBooks = dummyBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-12"> {/* Overall spacing for sections */}

      {/* Hero Section: Explains the website's purpose */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 sm:p-12 rounded-lg shadow-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
          Your Personal Book Management Hub
        </h1>
        <p className="text-lg sm:text-xl opacity-90 max-w-3xl mx-auto mb-8">
          Organize your literary world with ease. Track your collection, manage borrowed books,
          and discover new reads all in one place.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="#book-collection"> {/* Link to the book collection section below */}
            <Button className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              View My Books
            </Button>
          </Link>
          <Link to="/add-book">
            <Button variant="outline" className="border-2 border-white text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              Add a New Book
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Overview Section (Optional but helpful for understanding) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <svg className="mx-auto mb-4 text-blue-600" width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z"/>
          </svg>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Organize Your Collection</h3>
          <p className="text-gray-600">Keep track of every book you own, with details like author, genre, and status.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <svg className="mx-auto mb-4 text-blue-600" width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z"/>
          </svg>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Track Borrowed Books</h3>
          <p className="text-gray-600">Easily see which books are currently borrowed and by whom.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <svg className="mx-auto mb-4 text-blue-600" width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z"/>
          </svg>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Quick Access & Search</h3>
          <p className="text-gray-600">Find any book in your library instantly with powerful search.</p>
        </div>
      </section>


      {/* Book Collection Section (Your original table, now with a clear heading) */}
      <section id="book-collection" className="p-6 sm:p-8 bg-white shadow-xl rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Browse Your Collection</h2>
          <Link to="/add-book">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md transition-all duration-200">
              Add New Book
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        {/* Book Table/List/Grid Display */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          {filteredBooks.length > 0 ? (
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
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.genre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        book.borrowed ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {book.borrowed ? 'Borrowed' : 'Available'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-900 p-1">View</Button>
                      <Button variant="ghost" className="text-indigo-600 hover:text-indigo-900 ml-2 p-1">Edit</Button>
                      <Button variant="ghost" className="text-red-600 hover:text-red-900 ml-2 p-1">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No books found matching your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
