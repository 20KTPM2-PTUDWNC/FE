import Home from "../pages/Home";
import LandingPage from "../pages/Welcome";
// import SearchJob from "../pages/SearchJob";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
// import JobDetail from "../pages/JobDetail";
// import Approve from "../pages/Approve";
// import CreateJob from "../pages/CreateJob";
// import HotJob from "../pages/HotJob";
import Profile from "../pages/Profile";
// import CompanyProfile from "../pages/CompanyProfile";
import ForgetPassword from "../pages/ForgetPassword";
// import History from "../pages/History";
import AboutUs from "../pages/AboutUs";
// import MyJobs from "../pages/MyJobs";
// import Notification from "../pages/Notification";
// import Notification_details from "../pages/Noti_details";
import EditProfile from "../pages/EditProfile";
// import EditCompanyProfile from "../pages/EditCompanyProfile";
import ResetPassword from "../pages/ResetPassword";

// Public Routes
const publicRoutes = [
    { path: "/", component: LandingPage },
    { path: "/home", component: Home },
    // { path: "/job/:jobId", component: JobDetail },
    // { path: "/hotjobs", component: HotJob },
    // { path: "/search/:keyword", component: SearchJob },
    { path: "/signin", component: SignIn },
    { path: "/signup", component: SignUp },
    { path: "/forgetPassword", component: ForgetPassword },
    { path: "/resetPassword/:id/:token", component: ResetPassword },
    { path: "/about", component: AboutUs },
    { path: "/user/:id", component: Profile },
    { path: "/user/edit", component: EditProfile },
    // { path: "/notification", component: Notification },
    // { path: "/notification/details", component: Notification_details },
    // { path: "/company_profile/:companyId", component: CompanyProfile },
];

const privateRoutes = [
    { path: "/user/edit", component: EditProfile },
    
    // { path: "/home", component: Home },
    // { path: "/history", component: History },
];

// const employerRoutes = [
//     { path: "/createjob", component: CreateJob },
//     { path: "/myjobs", component: MyJobs },
//     { path: "/company_profile/edit", component: EditCompanyProfile },
// ];

// const adminRoutes = [{ path: "/approve", component: Approve }];

export { publicRoutes, privateRoutes };
