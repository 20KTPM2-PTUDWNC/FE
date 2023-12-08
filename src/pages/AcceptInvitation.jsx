import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { acceptInvitation } from "../api/class/class.api.js";
import { getEmail, removeEmail } from "../features/user";
import { getCookies, getUser } from "../features/user";
import { signIn } from "../api/auth/auth.api";
import { signin } from "../features/user";
import Cookies from "universal-cookie";

function AcceptInvitation() {
    const user = getUser();
    const params = useParams();
    const cookie = new Cookies();
    const token = params.token;

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const accept = async (e) => {
        e.preventDefault();

        try {
            if (!email || !password) {
                throw new Error("Please fill all fields!");
            }

            const userAuth = {
                email,
                password,
            };

            const signInResponse = await signIn(userAuth);

            if (signInResponse.status === 200) {
                console.log(signInResponse.data);
                signin(signInResponse.data.token);

                const userId = signin(signInResponse.data.token)._id;

                const dataAccept = {
                    token,
                    userId,
                };

                const acceptResponse = await acceptInvitation(dataAccept);

                if (acceptResponse.status === 200) {
                    alert("Join new class successfully!!");
                    navigate("/home");
                }
            }
        } catch (error) {
            console.error("Error: ", error.message);
            setError(error.message);
        }
    };


    const cancel = async (e) => {
        navigate("/signin")
    };
    
    return (
        <section className="bg-white text-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full h-full ">
                <div className="w-full bg-[#5f27cd] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white text-center">
                        Do you agree to join the class?</h1>
                        <h4 className="text-xl font-bold leading-tight tracking-tight text-white md:text-l dark:text-white text-center">
                        If you agree, enter your email and password to join the class
                        </h4>
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

                            <button
                                type="submit"
                                className="w-full text-white bg-[#1B9C85] hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={accept}
                            >
                                Accept
                            </button>

                            <button
                                type="submit"
                                className="w-full text-white bg-[#ff4757] hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={cancel}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AcceptInvitation;
