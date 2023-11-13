import React from "react";
import ChiHien from "../assets/ChiHien.jpg";
import Khai from "../assets/Khai.jpg";
import MinhTri from "../assets/MinhTri.jpg";
import Tin from "../assets/Tin.jpg";

function AboutUs() {
    return (
        <div name="home" className="w-full h-full text-gray-300 bg-gradient-to-r from-[#000000] to-[#393E46]">
            <div className="pt-[120px] pb-[50px] max-w-[1100px] mx-auto p-4 flex flex-col justify-center w-full h-full">
                <div className="pb-4">
                    <p className="text-4xl font-bold inline text-[#00ADB5] border-b-4 border-pink-600">About Us</p>
                    <p className="py-4">The members of our App</p>
                </div>

                {/* <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-5">
                    <div className="flex flex-col justify-center items-center text-center">
                        <div className="hover:scale-110 duration-500">
                            <img alt="avatar" src={MinhTri} className="rounded-full border h-48 w-48" />
                        </div>
                        <p className="text-4xl font-bold inline text-pink-600 pt-5">Đỗ Minh Trí</p>
                        <p className="text-2xl mt-1 font-bold inline text-white">
                            <span className="text-[#F9ED69]">Project Manager</span>{" "}
                            <span className="text-pink-600">|</span> Frontend Developer
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center text-center">
                        <div className="hover:scale-110 duration-500">
                            <img alt="avatar" src={ChiHien} className="rounded-full border h-48 w-48" />
                        </div>
                        <p className="text-4xl font-bold inline text-pink-600 pt-5">Trương Chí Hiển</p>
                        <p className="text-2xl mt-1 font-bold inline text-white">Backend Developer</p>
                    </div>
                    <div className="mt-10 flex flex-col justify-center items-center text-center">
                        <div className="hover:scale-110 duration-500">
                            <img alt="avatar" src={Tin} className="rounded-full border h-48 w-48" />
                        </div>
                        <p className="text-4xl font-bold inline text-pink-600 pt-5">Trần Trọng Tín</p>
                        <p className="text-2xl mt-1 font-bold inline text-white">Frontend Developer</p>
                    </div>
                    <div className="mt-10 flex flex-col justify-center items-center text-center">
                        <div className="hover:scale-110 duration-500">
                            <img alt="avatar" src={Khai} className="rounded-full border h-48 w-48" />
                        </div>
                        <p className="text-4xl font-bold inline text-pink-600 pt-5">Hồ Quang Khải</p>
                        <p className="text-2xl mt-1 font-bold inline text-white">Backend Developer</p>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
export default AboutUs;
