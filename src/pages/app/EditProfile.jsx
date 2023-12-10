/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, updateProfile, updateAvatar } from "../../api/user/user.api";
import { getCookies, getUser } from "../../features/user";
import { selectUser } from "../../features/userSlice";

let skill_list = [];

function splitStr(a) {
    let re = "";
    for (let i = 0; i < a.length; i++) {
        re = re + a[i] + "\n";
    }
    return re;
}

function EditProfile() {
    const user = getUser();
    const navigate = useNavigate();
    const id = user._id
    useEffect(() => {
        if (!user)
            navigate("/signin")
        else {
            const cookie = new Cookies()
            cookie.set('token', getCookies(), { path: `/v1/user/${id}` });
        }

    }, [])
    const skillList = ["C++", "C#", "Python", "Java", "JavaScript", "HTML", "CSS", "Ruby"];


    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState("");
    const [experience, setExperience] = useState([]);
    const [academicLevel, setAcademicLevel] = useState([]);
    const [skills, setSkills] = useState([]);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProfile(user?._id);

                setAvatar(response.data.avatar || "");
                setName(response.data.name);
                setAddress(response.data.address);
                setPhone(response.data.phone);

                console.log(response.data);
            } catch (error) {
                console.error(error);
                setError(error.response?.data?.message || "Failed to fetch profile");
            }
        };

        fetchData();
    }, [user?._id]);
    // useEffect(() => {
    //     return () => {
    //         avatar && URL.revokeObjectURL(avatar.previewURL)
    //     }
    // },[avatar])
    // const handleCheckBoxs = (check, value) => {
    //     if ((check === true) & !skill_list.includes(value)) {
    //         skill_list.push(value);
    //     }
    //     if ((check === false) & skill_list.includes(value)) {
    //         skill_list.splice(skill_list.indexOf(value), 1);
    //     }
    // };
    const handleAvatar = async (e) => {
        e.preventDefault();
        const file = e.target.files[0]
        // file.previewURl = URL.createObjectURL(file)
        setAvatar(file)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name,
            address,
            phone,
        };

        const Avatar = new FormData();
        if (avatar) {
            Avatar.append("user-avatar", avatar)
        }
        console.log(avatar)
        // if (typeof experience === "string") {
        //     data.experience = experience.split("\n");
        // }

        // if (typeof academicLevel === "string") {
        //     data.academicLevel = academicLevel.split("\n");
        // }

        // if (
        //     !data.avatar ||
        //     !data.name ||
        //     !data.address ||
        //     !data.phone ||
        //     !data.description ||
        //     data.skills.length === 0 ||
        //     data.experience.length === 0
        // ) {
        //     return setError("Please fill all fields!");
        // }

        setError("");

        try {
            await updateProfile(user?._id, data);
            if (avatar)
                await updateAvatar(user?._id, Avatar)
            alert("Update profile successfully!");
            skill_list = []
            navigate(`/user/${user?._id}`);
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Failed to update profile");
        }
    };

    return (
        <div name="editProfile" className="w-full h-screen">
            <div className="pt-[120px] pb-[50px] max-w-[900px] mx-auto p-4 flex flex-col justify-center w-full h-full">
                <div className="pb-4 mb-5">
                    <p className="text-4xl font-bold inline text-[#5f27cd] border-b-4 border-[#ff4757]">
                        Update Profile
                    </p>
                </div>

                {error && (
                    <p className="bg-[#D14D72] text-sm text-white font-bold py-4 px-4 rounded mb-8 w-4/12">{error}</p>
                )}

                <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex flex-col w-full font-sans">
                            <div className="flex">
                                <div className="w-6/12">
                                    <p className="text-[#5f27cd] font-semibold mb-1">Name</p>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="text-black border-2 border-gray-300 rounded-md p-2 w-11/12"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="w-6/12">
                                    <p className="text-[#5f27cd] font-semibold mb-1">Address</p>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        className="text-black border-2 border-gray-300 rounded-md p-2 w-full"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex mt-4">
                                <div className="w-6/12">
                                    <p className="text-[#5f27cd] font-semibold mb-1">Phone</p>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        className="text-black border-2 border-gray-300 rounded-md p-2 w-11/12"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                {/* <div className="w-6/12">
                                    <p className="font-semibold mb-1">Avatar</p>
                                    <input
                                        type="file"
                                        name="avatar"
                                        id="avatar"
                                        className="text-black border-2 border-gray-300 rounded-md p-2 w-full"

                                        onChange={handleAvatar}
                                    />
                                </div> */}
                            </div>


                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            type="submit"
                            className="bg-[#ff4757] text-white font-bold py-2 px-4 rounded-md mt-4 md:mt-0"
                            onClick={handleSubmit}
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditProfile;
