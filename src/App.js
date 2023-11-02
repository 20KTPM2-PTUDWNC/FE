import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { Navigate, Route, HashRouter as Router, Routes, useLocation } from "react-router-dom";
import { publicRoutes, employeeRoutes,  adminRoutes } from "./routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const ScrollToTop = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
};

function App() {
    const user = useSelector(selectUser);

    return (
        <Router>
            <ScrollToTop>
                <div
                    className="App"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100vh",
                        justifyContent: "space-between",
                    }}
                >
                    <Navbar />
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;

                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}

                        {user &&
                            user?.userType === 2 &&
                            employeeRoutes.map((route, index) => {
                                const Page = route.component;

                                return <Route key={index} path={route.path} element={<Page />} />;
                            })}

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

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    <Footer />
                </div>
            </ScrollToTop>
        </Router>
    );
}

export default App;
