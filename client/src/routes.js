import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorPage from "./pages/ErrorPage";


const routes = [

    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage/>

    },
    {
        path: "/doctors",
        element: <Doctors />,
        errorElement: <ErrorPage/>

    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage/>

    },
    {
        path: "/signup",
        element: <Signup />,
        errorElement: <ErrorPage/>

    },
]

export default routes