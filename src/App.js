import { useEffect, useLayoutEffect, useState } from "react";

import { Navigate, Route, HashRouter as Router, Routes, useLocation } from "react-router-dom";
import { publicRoutes, privateRoutes, adminRoutes } from "./routes";
import Navbar from "./components/app/Navbar";
import Footer from "./components/app/Footer";
import { getUser } from "./features/user";
import NavbarAdmin from "./components/admin/Navbar.admin";
import ChatComponent from "./components/app/ChatForm";

const ScrollToTop = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
};

function App() {
    const user = getUser();


    // function RenderLandingPage() {
    //     return (

    //     )
    // }
    useEffect(() => {
        document.title = "Class Room";
    }, [])
    return (
        <Router>
            <ScrollToTop>
                <div
                    className="App font-sans"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100vh",
                        justifyContent: "space-between",
                    }}
                >


                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            if (route.path !== "/" && route.path !== "/verifyAccount/:token" && route.path !== "/loginSuccess/:token") return <Route key={index} path={route.path} element={
                                <>
                                    <Navbar />
                                    <Page />
                                    <ChatComponent />
                                    {/* <Footer /> */}
                                </>} />
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            if (route.path !== "/") return <Route key={index} path={route.path} element={
                                <div className="bg-white w-full h-full text-black">

                                    <div className="relative overflow-hidden max-h-screen">
                                        <div className="fixed z-20">
                                            <NavbarAdmin />
                                        </div>
                                        <div className=" relative z-10">
                                            <Page />
                                        </div>

                                    </div>
                                </div>
                            } />
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                        {/* {user &&
                            privateRoutes.map((route, index) => {
                                const Page = route.component;

                                return <Route key={index} path={route.path} element={<>
                                    <Navbar />
                                    <Page />
                                </>} />;
                            })} */}

                        {/* {user &&
                            user?.userType === 3 &&
                            employerRoutes.map((route, index) => {
                                const Page = route.component;

                                return <Route key={index} path={route.path} element={<Page />} />;
                            })} */}

                        {/* {user &&
                            user?.userType === 1 &&
                            adminRoutes.map((route, index) => {
                                const Page = route.component;

                                return <Route key={index} path={route.path} element={<Page />} />;
                            })} */}

                        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                    </Routes>

                </div>
            </ScrollToTop>
        </Router>
    );
}

export default App;
