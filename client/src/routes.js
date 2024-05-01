import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Appointment from "./pages/Appointment";
import ErrorPage from "./pages/ErrorPage";
import Account from "./pages/Account"
import App from "./components/App";


const routes = [

    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home />,
    
            },
            {
                path: "/doctors",
                element: <Doctors />,
    
            },
            {
                path: "/login",
                element: <Login  />,

            },
            {
                path: "/signup",
                element: <Signup />,
            
            },
            {
                path: "/appt",
                element: <Appointment />,
        
            },
            {
                path: "/account",
                element: <Account />,
            
            },
        ]

    },
]

export default routes