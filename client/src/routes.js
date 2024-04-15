import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

const routes = [

    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage/>

    }
]

export default routes