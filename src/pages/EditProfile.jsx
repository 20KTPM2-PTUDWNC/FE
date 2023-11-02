/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../api/user/user.api";
import { selectUser } from "../features/userSlice";

let skill_list = [];

function splitStr(a) {
    let re = "";
    for (let i = 0; i < a.length; i++) {
        re = re + a[i] + "\n";
    }
    return re;
}

function EditProfile() {
    const user = useSelector(selectUser);
    const [userAuth, setUserAuth] = useState(null);

    const skillList = ["C++", "C#", "Python", "Java", "JavaScript", "HTML", "CSS", "Ruby"];

    const navigate = useNavigate();
    const [avatar, setAvatar] = useState("");
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
                setUserAuth(response.data);
                setAvatar(response.data.avatar);
                setName(response.data.name);
                
                setAcademicLevel(splitStr(response.data.academicLevel));
                setExperience(splitStr(response.data.experience));
                setAddress(response.data.address);
                setPhone(response.data.phone);
                setDescription(response.data.description);
                console.log(response.data);
            } catch (error) {
                console.error(error);
                setError(error.response?.data?.message || "Failed to fetch profile");
            }
        };

        fetchData();
    }, [user?._id]);

    const handleCheckBoxs = (check, value) => {
        if ((check === true) & !skill_list.includes(value)) {
            skill_list.push(value);
        }
        if ((check === false) & skill_list.includes(value)) {
            skill_list.splice(skill_list.indexOf(value), 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            avatar,
            name,
            experience,
            academicLevel,
            skills: skill_list,
            address,
            phone,
            description,
        };

        if (typeof experience === "string") {
            data.experience = experience.split("\n");
        }

        if (typeof academicLevel === "string") {
            data.academicLevel = academicLevel.split("\n");
        }
        
        if (
            !data.avatar ||
            !data.name ||
            !data.address ||
            !data.phone ||
            !data.description ||
            data.skills.length === 0 ||
            data.experience.length === 0
        ) {
            return setError("Please fill all fields!");
        }

        setError("");

        try {
            await updateProfile({ id: user?._id, data, authToken: user?.token });
            alert("Update profile successfully!");
            skill_list = []
            navigate(`/profile/${user?._id}`);
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Failed to update profile");
        }
    };

    return (
        <div name="editProfile" className="w-full h-full text-gray-300 bg-[#393E46]">
            <div className="pt-[120px] pb-[50px] max-w-[900px] mx-auto p-4 flex flex-col justify-center w-full h-full">
                <div className="pb-4">
                    <p className="text-4xl font-bold inline text-[#00ADB5] border-b-4 border-pink-600">
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
                                    <p className="font-semibold mb-1">Name</p>
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
                                    <p className="font-semibold mb-1">Address</p>
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
                                    <p className="font-semibold mb-1">Phone</p>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        className="text-black border-2 border-gray-300 rounded-md p-2 w-11/12"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                <div className="w-6/12">
                                    <p className="font-semibold mb-1">Avatar</p>
                                    <input
                                        type="text"
                                        name="avatar"
                                        id="avatar"
                                        className="text-black border-2 border-gray-300 rounded-md p-2 w-full"
                                        value={avatar}
                                        onChange={(e) => setAvatar(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="font-semibold mb-1">Education</p>
                                <textarea
                                    name="education"
                                    id="education"
                                    className="text-black border-2 border-gray-300 rounded-md p-2 w-full"
                                    defaultValue={academicLevel}
                                    rows={5}
                                    onChange={(e) => setAcademicLevel(e.target.value)}
                                />
                            </div>

                            <div className="mt-4">
                                <p className="font-semibold mb-1">Experience</p>
                                <textarea
                                    name="experience"
                                    id="experience"
                                    className="text-black border-2 border-gray-300 rounded-md p-2 w-full"
                                    defaultValue={experience}
                                    rows={5}
                                    onChange={(e) => setExperience(e.target.value)}
                                />
                            </div>

                            <div className="mt-4">
                                <p className="font-semibold mb-1">Description</p>
                                <textarea
                                    name="description"
                                    id="description"
                                    className="text-black border-2 border-gray-300 rounded-md p-2 w-full"
                                    value={description}
                                    rows={5}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mt-4">
                                <p className="font-semibold mb-1">Skills</p>
                                <div class="grid md:grid-cols-4 gap-2 text-justify">
                                    {skillList &&
                                        skillList.map((skill, index) => (
                                            <div key={index}>
                                                <input
                                                    id="default-checkbox"
                                                    type="checkbox"
                                                    value={skill}
                                                    onChange={(e) => handleCheckBoxs(e.target.checked, e.target.value)}
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label
                                                    htmlFor="default-checkbox"
                                                    class="ml-2 text-sm font-medium text-white"
                                                >
                                                    {skill}
                                                </label>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            type="submit"
                            className="bg-[#00ADB5] text-white font-bold py-2 px-4 rounded-md mt-4 md:mt-0"
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
