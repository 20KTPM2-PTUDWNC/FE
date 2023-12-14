import Home from "../pages/app/Home";
import LandingPage from "../pages/app/Welcome";
// import SearchJob from "../pages/SearchJob";
import SignIn from "../pages/app/SignIn";
import SignUp from "../pages/app/SignUp";
import SignInSuccess from "../pages/app/SignInSuccess";
// import JobDetail from "../pages/JobDetail";
// import Approve from "../pages/Approve";
// import CreateJob from "../pages/CreateJob";
// import HotJob from "../pages/HotJob";
import Profile from "../pages/app/Profile";
// import CompanyProfile from "../pages/CompanyProfile";
import ForgetPassword from "../pages/app/ForgetPassword";
// import History from "../pages/History";


// import Notification from "../pages/Notification";
// import Notification_details from "../pages/Noti_details";
import EditProfile from "../pages/app/EditProfile";
// import EditCompanyProfile from "../pages/EditCompanyProfile";
// <<<<<<< HEAD
// import ResetPassword from "../pages/ResetPassword";
// import ClassDetails from "../pages/ClassDetails";
// import AssignmentDetails from "../pages/AssignmentDetails";
// import AcceptInvitation from "../pages/AcceptInvitation";
// import Admin from "../pages/admin";
// =======
import ResetPassword from "../pages/app/ResetPassword";
import ClassDetails from "../pages/app/ClassDetails";
import AssignmentDetails from "../pages/app/AssignmentDetails";
import AcceptInvitation from "../pages/app/AcceptInvitation";
import AdminPage from "../pages/admin/Home.admin";

import ClassAdminPage from "../pages/admin/Class.admin";
import MemberClassAdminPage from "../pages/admin/MemberOfClass";

import AccountsManage from "../pages/admin/AccountsManage";
import MapStudentID from "../pages/admin/MapStudentID";




// Public Routes
const publicRoutes = [
    { path: "/", component: LandingPage },
    { path: "/home", component: Home },
    // { path: "/job/:jobId", component: JobDetail },
    // { path: "/hotjobs", component: HotJob },
    // { path: "/search/:keyword", component: SearchJob },
    { path: "/signin", component: SignIn },
    { path: "/signup", component: SignUp },
    { path: "/loginSuccess/:token", component: SignInSuccess },
    { path: "/forgetPassword", component: ForgetPassword },
    { path: "/resetPassword/:token", component: ResetPassword },
    { path: "/acceptInvitation/:token", component: AcceptInvitation },

    { path: "/user/:id", component: Profile },
    { path: "/user/edit", component: EditProfile },
    { path: "/class/:classId", component: ClassDetails },

    { path: "/class/assingment/:assignmentID", component: AssignmentDetails },
    { path: "/verifyAccount/:token", component: SignInSuccess },

    // { path: "/notification", component: Notification },
    // { path: "/notification/details", component: Notification_details },
    // { path: "/company_profile/:companyId", component: CompanyProfile },
];

const privateRoutes = [
    { path: "/admin", component: AdminPage },

    { path: "/admin/account", component: AdminPage },
    { path: "/admin/class", component: ClassAdminPage },
    { path: "/admin/class/member-details/:classId", component: MemberClassAdminPage },

    { path: "/admin/account/banAccount", component: AccountsManage },
    { path: "/admin/account/mapStudentID", component: MapStudentID },
    { path: "/admin/class", component: AdminPage }


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
