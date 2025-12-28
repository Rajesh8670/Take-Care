import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Signup from '../components/Authcomponents/Signup.jsx'
import Login from '../components/Authcomponents/login.jsx'
import OtpVerification from '../components/Authcomponents/otpInputPage.jsx'
import CreateAccount from '../components/Authcomponents/createAccount.jsx'
import PasswordResetEmail from '../components/Authcomponents/resetPasswordOtp.jsx'
import ResetPassword from '../components/Authcomponents/reset-password.jsx'
import AIDoctor from "../pages/AIDoctor.jsx";
import HealthReports from "../pages/HealthReports.jsx";
import ConsultDoctor from "../pages/ConsultDoctor.jsx";
import PharmacyHome from "../pages/pharmacyHome.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ProfileCard from "../pages/ProfileCard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {path:'signup',element:<Signup/>},
      {path:'login',element:<Login/>},
      {path:'verify-otp',element:<OtpVerification/>},
      {path:'create-account',element:<CreateAccount/>},
      {path:'forgot-password',element:<PasswordResetEmail/>},
      {path:'reset-Password',element:<ResetPassword/>},
      { 
        element: <ProtectedRoute />,
        children: [
          {path:'ai-doctor',element:<AIDoctor/>},
          {path:'health-reports',element:<HealthReports/>},
          {path:'consult-doctor',element:<ConsultDoctor/>},
          {path:'pharmacy-home',element:<PharmacyHome/>},
          {path:'profile-card',element:<ProfileCard/>},
        ]
      }
    ],
  },
]);

export default router;

//fix the code in home and pharmasy home such that in user icon shows the first letter of user name and when click on icon it navigate to profile-card page where shows same user icon and use name,email//