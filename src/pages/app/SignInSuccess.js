import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams, use } from "react-router-dom";
import { activateAcc } from "../../api/auth/auth.api";
import { getProfile } from "../../api/user/user.api";
import { signin } from "../../features/user";
import Cookies from 'universal-cookie/es6';
import { FaFacebook, FaGoogle } from "react-icons/fa";

function SignInSuccess() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const param = useParams();
    const token = param.token;
    useEffect(() => {
        handelLoginSuccess();
    }, [])
    const handelLoginSuccess = async () => {
        try {
            const response = await activateAcc(token);
            if (response.status === 200) {
                signin(token);
                cookies.set('token', token);
            }
        }
        catch (err) {
            console.log(err.response)
            setError(err.response.data);
        }

    }
    return (
        <section className="bg-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full h-full ">
                <div className="w-full bg-[#5f27cd] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-2xl text-white font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in
                        </h1>
                        {!error ? <div className="space-y-4 md:space-y-6">
                            <p className="text-white text-xl">
                                Sign in successfully. Go to {" "}
                                <Link
                                    to="/home"
                                    className="font-bold  hover:underline hover:text-primary-500"
                                >
                                    Home page
                                </Link>
                            </p>
                        </div>
                            :
                            <p className="text-white text-xl">{error}</p>}





                    </div>

                </div>

            </div>
        </section>
    );
}

export default SignInSuccess;
