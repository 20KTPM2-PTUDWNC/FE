import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, redirect } from "react-router-dom";
import { signIn, signInFB, signInGG } from "../../api/auth/auth.api";
import { getProfile } from "../../api/user/user.api";
import { signin } from "../../features/user";
import Cookies from 'universal-cookie/es6';
import { FaFacebook, FaGoogle } from "react-icons/fa";

function SignIn() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // const handleLoginFacebook = async () => {
    //     console.log("login facebook");
    //     try {
    //         window.open("http://localhost:8080/v1/auth/facebook","_self")
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }

    // };
    // const handleLoginGoogle = async () => {
    //     console.log("login facebook");
    //     alert("login facebook")
    //     try {
    //         const response = await signInGG();
    //         console.log("login: ", response)
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }

    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return alert("Please fill all fields!");
        }

        const userAuth = {
            email,
            password,
        };

        try {
            const response = await signIn(userAuth);
            // const res = await getProfile("6550abc2c99e30c698187add");

            if (response.status === 200) {
                console.log(response.data.token);
                signin(response.data.token);
                navigate("/home");

            }
        } catch (error) {
            console.log("Error123: ", error.response.data.message);
            setError(error.response.data.message);
        }
    };

    return (
        <section className="bg-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full h-full ">
                <div className="w-full bg-[#5f27cd] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-2xl text-white font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in
                        </h1>
                        {error && (
                            <p className="bg-[#D14D72] text-sm text-white font-bold py-3 px-4 rounded">{error}</p>
                        )}
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="font-sans bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="font-sans bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    autoComplete="off"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-white dark:text-gray-300">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <Link
                                    to="/forgetPassword"
                                    className="text-sm font-medium text-white hover:underline dark:text-primary-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-[#ff4757] hover:bg-[#ff9f43] focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={handleSubmit}
                            >
                                Sign In
                            </button>
                            <p className="text-sm font-light text-white dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <Link
                                    to="/signup"
                                    className="font-semibold text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </Link>
                            </p>
                            <div className="flex items-center">
                                <p className="text-white text-2xl mr-5 font-bold">Sign in with:</p>
                                <div className="flex">
                                    <a href="http://localhost:8080/v1/auth/facebook">
                                        <FaFacebook className="mr-3 text-white hover:text-[#00ADB5]" size={24} />
                                    </a>
                                    <a href="http://localhost:8080/v1/auth/google">
                                        <FaGoogle className="text-white hover:text-[#00ADB5]"  size={24} />
                                    </a>
                                </div>
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default SignIn;
