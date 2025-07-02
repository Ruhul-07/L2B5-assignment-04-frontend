import {AllBookPage} from "@/pages/AllBookPage";
import App from "../App";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";
import AddBookPage from "@/pages/AddBookPage";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";
import { NotFoundPage } from "@/components/shared/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "books",
        element: <AllBookPage></AllBookPage>,
      },
      {
        path: "add-book",
        element: <AddBookPage />,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummaryPage />,
      },
    ],
  },
]);

export default router;
