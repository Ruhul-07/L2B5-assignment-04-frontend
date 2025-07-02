// import { Link } from 'react-router-dom';
// import { Button } from '../components/ui/button'; 
// const HomePage = () => {
//   return (
//     <div className="p-8 bg-white shadow-md rounded-lg text-center max-w-2xl mx-auto mt-10">
//       <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
//         Welcome to Your Book Management App!
//       </h1>
//       <p className="text-lg text-gray-700 mb-6">
//         Organize your personal book collection, track borrowed books, and manage
//         your literary world with ease.
//       </p>
//       <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
//         <Link to="/books">
//           <Button className="w-full sm:w-auto">View All Books</Button>
//         </Link>
//         <Link to="/add-book">
//           <Button variant="outline" className="w-full sm:w-auto">
//             Add a New Book
//           </Button>
//         </Link>
//       </div>
//       <p className="text-sm text-gray-500 mt-8">
//         Your digital library, always at your fingertips.
//       </p>
//     </div>
//   );
// };

// export default HomePage;






import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button'; // Assuming Shadcn Button is available

/**
 * HomePage Component
 *
 * This component serves as the primary landing page for the application.
 * It's designed to be visually appealing and clearly communicate the app's purpose
 * and key functionalities to a new user.
 */
const HomePage: React.FC = () => {
  // Dummy book data for the featured section
  const featuredBooks = [
    {
      id: 'f1',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      copies: 5,
      imageUrl: 'https://placehold.co/150x200/ADD8E6/000000?text=Book+Cover', // Placeholder image
    },
    {
      id: 'f2',
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      copies: 3,
      imageUrl: 'https://placehold.co/150x200/DDA0DD/000000?text=Book+Cover',
    },
    {
      id: 'f3',
      title: 'Atomic Habits',
      author: 'James Clear',
      copies: 7,
      imageUrl: 'https://placehold.co/150x200/90EE90/000000?text=Book+Cover',
    },
    {
      id: 'f4',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      copies: 4,
      imageUrl: 'https://placehold.co/150x200/FFD700/000000?text=Book+Cover',
    },
    {
      id: 'f5',
      title: 'Educated',
      author: 'Tara Westover',
      copies: 2,
      imageUrl: 'https://placehold.co/150x200/F08080/000000?text=Book+Cover',
    },
  ];

  const handleBorrow = (bookTitle: string) => {
    // In a real application, this would trigger a Redux action or API call
    console.log(`Attempting to borrow: ${bookTitle}`);
    // Using a simple alert for demo. For a real app, use a custom modal UI.
    // alert(`You would attempt to borrow "${bookTitle}" here!`);
  };

  return (
    <div className="space-y-20 pb-20"> {/* Increased overall spacing between sections */}

      {/* Hero Section: Engaging visual and clear value proposition */}
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
            <Link to="/add-book" className="group">
              <Button variant="outline" className="border-2 border-white text-blue-950 hover:bg-blue-700 px-10 py-5 text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
                Add a New Book
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books Section: Display books in card format */}
      <section className="px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">Featured Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-center">
          {featuredBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
              <img
                src={book.imageUrl}
                alt={`Cover of ${book.title}`}
                className="w-full h-48 object-cover object-center rounded-t-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null; // Prevents infinite loop
                  (e.target as HTMLImageElement).src = `https://placehold.co/150x200/CCCCCC/333333?text=No+Image`; // Fallback image
                }}
              />
              <div className="p-4 flex-grow flex flex-col items-center justify-between">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 leading-tight">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-3">by {book.author}</p>
                <p className="text-gray-700 text-sm mb-4">Copies Available: <span className="font-bold">{book.copies}</span></p>
                <Button
                  onClick={() => handleBorrow(book.title)}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md transition-colors duration-200"
                >
                  Borrow
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link to="/books">
            <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-200 px-8 py-4 text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              View All Books
            </Button>
          </Link>
        </div>
      </section>

      {/* Final Call to Action Section (kept for strong closing) */}
      <section className="bg-blue-100 p-10 sm:p-12 rounded-lg shadow-inner text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-6">Ready to Organize Your Books?</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          Join countless book lovers who are taking control of their libraries. It's free, fast, and simple!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/add-book" className="group">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-5 text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
              Start Managing My Books
            </Button>
          </Link>
          <Link to="/borrow-summary" className="group"> {/* Added link to borrow summary */}
            <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-200 px-10 py-5 text-xl font-bold rounded-full shadow-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
              View Borrow Summary
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
