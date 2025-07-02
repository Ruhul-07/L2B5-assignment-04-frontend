import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage></HomePage>,
        children: [
            {
                path:"about",
                element: <div>this is about page</div>
            }
        ]
    }
])

export default router;