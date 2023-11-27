import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams, use } from "react-router-dom";
import { signIn, signInFB, signInGG } from "../api/auth/auth.api";
import { getProfile } from "../api/user/user.api";
import { signin } from "../features/user";
import Cookies from 'universal-cookie/es6';
import { FaFacebook, FaGoogle } from "react-icons/fa";
import FacebookLogin from 'react-facebook-login';
function SignInSuccess() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const param = useParams();
    const token = param.token;
    useEffect(() => {
        signin(token);
        cookies.set('token', token);
    })
    return (
        <section className="bg-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full h-full ">
                <div className="w-full bg-[#5f27cd] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-2xl text-white font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <p className="text-xl text-white">Login Successfully</p>
                            <div className="flex text-white text-xl mr-5">
                                <p>Go to {" "}
                                    <Link to="/home" className="font-bold text-white hover:underline dark:text-primary-500">

                                        Home page

                                    </Link>
                                </p>
                            </div>


                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default SignInSuccess;
