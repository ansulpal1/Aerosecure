import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Demo from "../pages/demo.jsx";
import Login from "../pages/Login.jsx";
import ForgotPassword from "../pages/ForGotPassWord.jsx";
import AlertDetails from "../pages/DetailAlert.jsx";
import UserDashboard from "../pages/UserDashbord.jsx";
import SuperAdminLogin from "../pages/SuperAdminLogin.jsx";
import SuperAdminDashboard from "../dasboard/SuperAdmin.jsx";
import FireOfficersPage from "../pages/FireOfficersPage.jsx";
import DevicesPage from "../pages/DevicesPage.jsx";
import AddOfficerPage from "../pages/AddOfficerPage.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import Profile from "../pages/EditProfile.jsx";
import ChangePassword from "../pages/ChangePassword.jsx";
import UserEdit from "../pages/UserEdit.jsx";

const router = createBrowserRouter([

   {
     path:"/",
    element:<App/>,
    children: [
{
    path: "",
    element: <Home/>
},
{
    path: "userProfile",
    element: <UserProfile/>,
    children:[
        {
            path: "profile",
            element: <Profile />,
        },
        {
            path: "changePassword",
            element: <ChangePassword />,
        },
        {
            path: "edit",
            element: <UserEdit />,
        },
    ]
},
{
    path: "dashboard",
    element: <Demo/>,
    
},
{
    path: "login",
    element: <Login/>
},
{
path:"superadmin",
element:<SuperAdminLogin/>      
},
{
path:"superadmin/dashboard",
element:<SuperAdminDashboard/>,

},
{
    
        
            path: "superadmin/officers",
            element: <FireOfficersPage/>
        
    
},
{
path:"superadmin/devices",
element:<DevicesPage/>

},
{
path:"superadmin/add-officer",
element:<AddOfficerPage/>
},
{
    path: "forgot-password",
    element: <ForgotPassword/>
},
{
    path: "dashboard/alert/:id",
    element: <AlertDetails/>
},
{
    path: "userDashboard",
    element: <UserDashboard/>
}

    ]
}
]);
export default router