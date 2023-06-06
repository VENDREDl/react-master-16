import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import NotFound from "./Error/NotFound";
import TravelList from "./components/TravelList";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <TravelList />
            },
        ],
        errorElement: <NotFound />
    }
])

export default router;