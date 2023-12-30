import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";

import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../../api/user/user.api";
import { getCookies, getUser } from "../../features/user";

import Cookies from "universal-cookie";
function Profile() {
    const user = getUser()
    const cookie = new Cookies()
    const navigate = useNavigate()
    const params = useParams();
    const id = params.id;
    // const [a,setA] = useState("")
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
        else {
            // document.cookie = `token=getCookies(); expires=Thu, 01 Jan 2030 00:00:00 GMT; path=/v1/user/${id};`;
            cookie.set('token', getCookies(), { path: `/` });
            getUserProfile(id);
        }
        // const file = "D:/Genshin Impact/image.png"
        // const url = URL.createObjectURL(file)
        // console.log(url)
        // // setA("D:/Genshin Impact/image.png")

    }, []);



    async function getUserProfile(userId) {
        try {
            const response = await getProfile(userId);

            if (response.status === 200) {
                console.log(response.data)
                setProfile(response.data)
            }
        } catch (error) {
            console.log("Error123: ", error);

        }
    }
    return (
        <section className="pt-20 text-black mb-20  font-sans">
            {profile && (
                <div className="w-full lg:w-4/12 px-4 mx-auto ">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl border-2 text-[#6F1E51] rounded-lg mt-16">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="relative pt-5">
                                        <img src={Logo} className="rounded-full border h-48 w-48" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-2xl font-semibold leading-normal mb-2 mb-2">
                                    {profile.name !== "undefined undefined" ? profile.name : "No Name"}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2  font-bold">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg "></i>
                                    {profile.email}
                                </div>
                                <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg "></i>
                                    <span className="font-semibold leading-normal mb-2 mb-2">
                                        StudentID: 
                                    </span>{" "}
                                    {profile.studentId?profile.studentId:"None"}
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-briefcase mr-2 text-lg "></i>
                                    <span className="font-semibold leading-normal mb-2 mb-2">
                                        Address:
                                    </span>{" "}
                                    {profile.address}
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-briefcase mr-2 text-lg "></i>
                                    <span className="font-semibold leading-normal mb-2 mb-2">
                                        Phone number:
                                    </span>{" "}
                                    {profile.phone}
                                </div>
                            </div>
                            {/* <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                    <span className="font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        Education:{" "}
                                    </span>
                                    {profile && profile.academicLevel.map((data, index) => <p key={index}>{data}</p>)}
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                    <span className="font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        Experience:{" "}
                                    </span>
                                    {profile && profile.experience.map((data, index) => <p key={index}>{data}</p>)}
                                </div>
                                <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                    <span className="font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        Skill:
                                    </span>
                                </div>
                                <div className="mb-2 text-blueGray-600 grid md:grid-cols-4 gap-2">
                                    {profile &&
                                        profile.skills.map((skill, index) => (
                                            <button
                                                key={index}
                                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow ml-1 mr-1"
                                            >
                                                {skill}
                                            </button>
                                        ))}
                                </div>
                            </div> */}
                            {/* <div className="py-10 border-t border-blueGray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                            <span className="font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                                Description:{" "}
                                            </span>
                                            {profile.description}
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                            {user._id === id && (
                                <div className="py-10 mt-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4 mb-2">
                                            <Link
                                                to="/user/edit"
                                                className="w-full text-white bg-[#ff4757] hover:bg-[#00ADB5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
