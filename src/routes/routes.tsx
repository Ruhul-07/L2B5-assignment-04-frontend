import {AllBookPage} from "@/pages/AllBookPage";
import App from "../App";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";
import AddBookPage from "@/pages/AddBookPage";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";
import { NotFoundPage } from "@/components/shared/NotFoundPage";
import { EditBookPage } from "@/pages/EditBookPage";

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
        path: "create-book",
        element: <AddBookPage />,
      },
      {
        path: "edit-book/:id",
        element: <EditBookPage></EditBookPage>
      },
      {
        path: "borrow-summary",
        element: <BorrowSummaryPage />,
      },
    ],
  },
]);

export default router;
