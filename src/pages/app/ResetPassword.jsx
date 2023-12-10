import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api/auth/auth.api";
import { getEmail, removeEmail } from "../../features/user";

function ResetPassword() {
    const params = useParams();
    const userId = params.id;
    const authToken = params.token;

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            return setError("Please fill all fields!");
        }

        if (password !== confirmPassword) {
            return setError("Password and confirm password must be the same!");
        }

        const userAuth = {
            token: authToken,
            email: getEmail(),
            newPassword: password
        };

        try {
            const response = await resetPassword(userAuth);
            if (response.status === 200) {
                alert("Reset password successfully. Please login again!");
                removeEmail();
                navigate("/signin");
            }
        }
        catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    };

    return (
        <section className="bg-white text-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full h-full ">
                <div className="w-full bg-[#5f27cd] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Reset Password
                        </h1>
                        {error && (
                            <p className="bg-[#D14D72] text-sm text-white font-bold py-3 px-4 rounded">{error}</p>
                        )}
                        <form className="space-y-6" action="#">
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    New Password
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
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    className="font-sans bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    autoComplete="off"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-[#1B9C85] hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={handleSubmit}
                            >
                                Reset
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ResetPassword;
