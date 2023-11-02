import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../api/user/user.api";
import { selectUser } from "../features/userSlice";

function Profile() {
    const u = useSelector(selectUser);
    const params = useParams();
    const id = params.id;
    const [user, setUser] = useState(null);

    useEffect(() => {
        getProfile(id, u?.token).then((res) => {
            setUser(res.data);
            console.log(res.data);
        });
    }, []);

    return (
        <section className="pt-20 bg-blueGray-50 text-black bg-[#393E46] font-sans">
            {user && (
                <div className="w-full lg:w-4/12 px-4 mx-auto ">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="relative pt-5">
                                        <img alt="avatar" src={user.avatar} className="rounded-full border h-48 w-48" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                    {user.name}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                    {user.email}
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                    <span className="font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        Address:
                                    </span>{" "}
                                    {user.address}
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                    <span className="font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        Phone number:
                                    </span>{" "}
                                    {user.phone}
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                    <span className="font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        Education:{" "}
                                    </span>
                                    {user && user.academicLevel.map((data, index) => <p key={index}>{data}</p>)}
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                    <span className="font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        Experience:{" "}
                                    </span>
                                    {user && user.experience.map((data, index) => <p key={index}>{data}</p>)}
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                    <span className="font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        Skill:
                                    </span>
                                </div>
                                <div className="mb-2 text-blueGray-600 grid md:grid-cols-4 gap-2">
                                    {user &&
                                        user.skills.map((skill, index) => (
                                            <button
                                                key={index}
                                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow ml-1 mr-1"
                                            >
                                                {skill}
                                            </button>
                                        ))}
                                </div>
                            </div>
                            <div className="py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                            <span className="font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                                Description:{" "}
                                            </span>
                                            {user.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {u._id === id && (
                                <div className="py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4 mb-2">
                                            <Link
                                                to="/profile/edit"
                                                className="w-full text-white bg-[#222831] hover:bg-[#00ADB5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            >
                                                Edit Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
export default Profile;
