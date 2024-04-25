import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Appointment from "./pages/Appointment";
import ErrorPage from "./pages/ErrorPage";
import Account from "./pages/Account"


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
    {
        path: "/appt",
        element: <Appointment />,
        errorElement: <ErrorPage/>

    },
    {
        path: "/account",
        element: <Account />,
        errorElement: <ErrorPage/>

    },
]

export default routes