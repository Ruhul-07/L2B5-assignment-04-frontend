📚 Library Management Frontend Application
A modern, responsive web application for managing a library's book collection, featuring browsing, CRUD operations, and borrowing functionalities.

✨ Features
Book Management:

➕ Add Books: Form for new book entries.

👀 View Books: Homepage (Card View) for browsing, dedicated page (Table View) for detailed lists. Both include search.

✏️ Edit Books: Update book details and availability.

🗑️ Delete Books: Remove books with confirmation.

Borrowing System:

🤝 Borrow Books: Modal form for borrowing from book lists.

🔢 Quantity & Due Date: Input for borrow details.

🔄 Real-time Updates: Book availability updates instantly.

📊 Borrow Summary: Dedicated page for aggregated borrowed book data.

📱 Responsive Design: Optimized for all devices using Tailwind CSS.

🔔 User Notifications: Sonner toasts for feedback.

🚨 Error Handling: Clear display of API errors.

🚀 Technologies Used
React.js: UI library.

TypeScript: Type safety.

Vite: Fast build tool.

Redux Toolkit (RTK Query): State management and data fetching.

React Router DOM: Client-side routing.

Tailwind CSS: Utility-first styling.

Shadcn UI: Reusable UI components.

Sonner: Toast notifications.

date-fns: Date utilities.

Lucide React: Icons.

📂 Project Structure
Library-Management-Frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/          # Shadcn UI components
│   │   ├── shared/      # Shared components (e.g., BorrowBookForm, NotFoundPage)
│   │   └── BookCardView.tsx # Book card display component
│   ├── pages/
│   │   ├── HomePage.tsx       # Landing page (card view)
│   │   ├── AllBookPage.tsx    # Tabular view of all books
│   │   ├── AddBookPage.tsx    # Add book form
│   │   ├── EditBookPage.tsx   # Edit book form
│   │   └── BorrowSummaryPage.tsx # Borrow summary page
│   ├── redux/
│   │   ├── api/
│   │   │   └── api.ts   # Base RTK Query API
│   │   └── store.ts     # Redux store
│   ├── routes/
│   │   └── routes.tsx   # React Router configuration
│   ├── services/
│   │   └── booksApi.ts  # RTK Query endpoints
│   ├── types/
│   │   └── index.ts     # TypeScript type definitions
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── .env                 # Environment variables
├── index.css            # Global CSS
├── package.json
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite config
└── README.md

🏁 Installation & Setup
🛠️ Prerequisites
Node.js (LTS)

npm or Yarn

Backend API running and accessible.

⚙️ Installation Steps
Clone Repository:

git clone <your-frontend-repo-url>
cd Library-Management-Frontend

Install Dependencies:

npm install
# or yarn install

Create .env File:
In the project root, create .env (or .env.local for Vite):

VITE_REACT_APP_API_BASE_URL="http://localhost:5000/api"

Adjust VITE_REACT_APP_API_BASE_URL to your backend's URL.

Run Application:

npm run dev
# or yarn dev

Opens in browser, typically http://localhost:5173.

💡 Usage
Homepage (/): Card view of books with search, edit, delete, and borrow actions.

Add New Book (/add-book): Form to add books.

Edit Book (/edit-book/:id): Edit form for specific books.

Delete Book: Confirmation dialog for deletion.

Borrow Book: Modal form for borrowing; updates availability.

View All Books (/books): Tabular list of books.

Borrow Summary (/borrow-summary): Aggregated borrow data.

🚀 Production Deployment
Deploy to platforms like Vercel, Netlify, or Render.

🤝 Contributing
Fork the repository.

Create a new branch.

Make changes.

Commit (git commit -m 'feat: description').

Push.

Open a Pull Request.

📄 License
MIT License. See LICENSE file.

🙏 Acknowledgments
React, Redux Toolkit, Tailwind CSS, Shadcn UI

And all open-source contributors!
