import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../api/auth/auth.api";
import { signup } from "../features/userSlice";

function SignUp() {
    const [userType, setUserType] = useState(2);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [field, setField] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassWord] = useState("");
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name || !phone || !address || !email || !password || !confirmPassword) {
            return setError("Please fill all fields!");
        }

        if (password !== confirmPassword) {
            return setError("Confirm password does not match!");
        }

        if (userType === 3 && !field) {
            return setError("Please fill all fields!");
        }

        // If userType === 3 name is companyName, have field of company
        // If userType === 2 name is name, no field of company
        let userAuth;
        if (userType === 2) {
            userAuth = {
                name,
                email,
                password,
                userType,
                phone,
                address,
                avatar: "https://i.stack.imgur.com/34AD2.jpg",
                description: "I'm a member of Jobee!",
            };
        } else {
            userAuth = {
                companyName: name,
                email,
                password,
                userType,
                phone,
                address,
                avatar: "https://i.stack.imgur.com/34AD2.jpg",
                description: "I'm a member of Jobee!",
                field,
            };
        }

        try {
            const response = await signUp(userAuth);
            if (response.status === 201) {
                alert("Sign up successfully!");
                console.log(response.data);
                dispatch(signup(response.data));
                navigate("/");
            }
        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="text-gray-300 bg-[#393E46] flex flex-col items-center justify-center px-6 mx-auto h-full py-10 mt-20">
                <div className="w-full bg-white rounded-lg shadow dark:border md:m-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign Up
                        </h1>
                        {error && (
                            <p className="bg-[#D14D72] text-sm text-white font-bold py-3 px-4 rounded">{error}</p>
                        )}
                        <form method="post" className="space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="font-sans bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        className="font-sans bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        className="font-sans bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="font-sans bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="font-sans bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    className="font-sans bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    onChange={(e) => setConfirmPassWord(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Role
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) => setUserType(parseInt(e.target.value))}
                                >
                                    <option value="2">Job Seeker</option>
                                    <option value="3">Recruiter</option>
                                </select>
                            </div>
                            {userType === 3 && (
                                <div>
                                    <label
                                        htmlFor="field"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Field
                                    </label>
                                    <input
                                        type="text"
                                        name="field"
                                        id="field"
                                        className="font-sans bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        onChange={(e) => setField(e.target.value)}
                                    />
                                </div>
                            )}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required
                                        onChange={(e) => setAgree(e.target.checked)}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                        I accept the{" "}
                                        <a
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            href="/"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={`w-full text-white font-semibold rounded-lg text-sm px-5 py-2.5 text-center  ${
                                    !agree
                                        ? "bg-gray-400"
                                        : "bg-[#1B9C85] hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                }`}
                                onClick={handleSignUp}
                                disabled={!agree}
                            >
                                Sign Up
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    to="/signin"
                                    className="font-semibold  text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
