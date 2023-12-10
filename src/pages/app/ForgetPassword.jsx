import React, { useState } from "react";
import { forgetPassword } from "../../api/auth/auth.api";
import { storeEmail } from "../../features/user";

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            return alert("Please fill all fields!");
        }

        const userAuth = {
            email,
        };

        try {
            const response = await forgetPassword(userAuth);
            storeEmail(email)
            setSuccess(response.data.message)
            console.log(response)

        } catch (error) {
            setError(error.response.data.message);
            console.log(error);
        }
    };

    return (
        <section className="bg-white text-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full h-full ">
                <div className="w-full bg-[#5f27cd] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
                            Forget Password
                        </h1>
                        {error && (
                            <p className="bg-[#D14D72] text-sm text-white font-bold py-3 px-4 rounded">{error}</p>
                        )}
                        {success && (
                            <p className="bg-[#1B9C85] text-sm text-white font-bold py-3 px-4 rounded">{success}</p>
                        )}
                        <form className="space-y-4 md:space-y-6" method="post">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium  dark:text-white"
                                >
                                    Your email
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
                            <button
                                type="submit"
                                className="w-full text-white bg-[#1B9C85] hover:bg-[#1dbfaf] focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={handleSubmit}
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ForgetPassword;
