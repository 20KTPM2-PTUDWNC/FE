import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cover from "../assets/cover.jpg"
export default function LandingPage() {
    return (
        <div name="home" className="w-full h-full text-gray-300 bg-gradient-to-r from-[#000000] to-[#393E46]">
            {/* <div className="pt-[120px] pb-[50px] max-w-[1100px] mx-auto p-4 flex flex-row justify-between w-full h-full">
                <div className="bg-[url(https://placekitten.com/600)] h-[600px] w-[600px] relative">
                    <div className="absolute bottom-0 px-4 py-3 bg-gray-500/50 w-full">
                        <h1 className="text-white font-semibold text-4xl"> Welcome </h1>
                        <p className="text-gray-200">
                            Welcome to our app
                        </p>
                    </div>
                </div>
                <div className="flex flex-col align-center justify-center">
                    <p className="text-4xl font-bold inline text-[#00ADB5]  text-center">
                        Welcome
                    </p>
                    <div className="mt-20 flex flex-row justify-between">
                        <Link to="/home" className="mr-10">
                            <button className="bg-[#1B9C85] text-white font-bold py-2 px-3 rounded hover:opacity-90 w-40 h-16">
                                Home 
                            </button>
                        </Link>
                        <Link to="/signin">
                            <button className="bg-white border-b-2 border-[#1B9C85] text-[#1B9C85] font-bold py-2 px-3 rounded hover:opacity-90 w-40 h-16">
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
            </div> */}
            <div className="text-gray-300 bg-gradient-to-r from-[#000000] to-[#393E46] ">
                <section className="cover bg-gradient-to-r from-[#000000] to-[#393E46] relative bg-blue-600 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-48 flex
      items-center min-h-screen">
                    <div className="h-full absolute top-0 left-0 z-0">
                        <img src={cover} alt="" className="w-screen h-full object-cover opacity-20" />
                    </div>

                    <div className="lg:w-3/4 xl:w-2/4 relative z-10 h-100 lg:mt-16">
                        <div>
                            <h1 className="text-white text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">Welcome</h1>
                            <p className="text-blue-100 text-xl md:text-2xl leading-snug mt-4">Welcome to our App</p>
                            <div className="flex flex-row align-center mt-8">
                                <Link to="/home" className="mr-8">
                                    <button className="bg-[#1B9C85] text-white font-bold py-2 px-3 rounded hover:opacity-90 w-40 h-16">
                                        Home
                                    </button>
                                </Link>
                                <Link to="/signin">
                                    <button className="bg-white border-b-2 border-[#1B9C85] text-[#1B9C85] font-bold py-2 px-3 rounded hover:opacity-90 w-40 h-16">
                                        Sign In
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
            {/* <section class="relative px-4 py-16 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 lg:py-32">
                <div class="flex flex-col lg:flex-row lg:-mx-8">
                    <div class="w-full lg:w-1/2 lg:px-8">
                        <h2 class="text-3xl leading-tight font-bold mt-4">Welcome to the Dentist Office of Dr. Thomas Dooley</h2>
                        <p class="text-lg mt-4 font-semibold">Excellence in Dentistry in the Heart of NY</p>
                        <p class="mt-2 leading-relaxed">Donec convallis sollicitudin facilisis. Integer nisl ligula, accumsan non
                            tincidunt ac, imperdiet in enim.
                            Donec efficitur ullamcorper metus, eu venenatis nunc. Nam eget neque tempus, mollis sem a, faucibus mi.</p>
                    </div>

                    <div class="w-full lg:w-1/2 lg:px-8 mt-12 lg:mt-0">
                        <div class="md:flex">
                            <div>
                                <div class="w-16 h-16 bg-blue-600 rounded-full"></div>
                            </div>
                            <div class="md:ml-8 mt-4 md:mt-0">
                                <h4 class="text-xl font-bold leading-tight">Everything You Need Under One Roof</h4>
                                <p class="mt-2 leading-relaxed">Our comprehensive services allow you to receive all needed dental care
                                    right here in our state-of-art
                                    office – from dental cleanings and fillings to dental implants and extractions.</p>
                            </div>
                        </div>

                        <div class="md:flex mt-8">
                            <div>
                                <div class="w-16 h-16 bg-blue-600 rounded-full"></div>
                            </div>
                            <div class="md:ml-8 mt-4 md:mt-0">
                                <h4 class="text-xl font-bold leading-tight">Our Patient-Focused Approach</h4>
                                <p class="mt-2 leading-relaxed">Your treatment plan will perfectly match your needs, lifestyle, and goals.
                                    Even if it’s been years
                                    since you last visited the dentist, we can help. Our comfortable office, compassionate team, and
                                    minimally-invasive treatments will help you feel completely at ease.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="md:flex md:flex-wrap mt-24 text-center md:-mx-4">
                    <div class="md:w-1/2 md:px-4 lg:w-1/4">
                        <div class="bg-white rounded-lg border border-gray-300 p-8">
                            <img src="images/teeth-whitening.svg" alt="" class="h-20 mx-auto" />

                            <h4 class="text-xl font-bold mt-4">Teeth Whitening</h4>
                            <p class="mt-1">Let us show you how our experience.</p>
                            <a href="#" class="block mt-4">Read More</a>
                        </div>
                    </div>

                    <div class="md:w-1/2 md:px-4 mt-4 md:mt-0 lg:w-1/4">
                        <div class="bg-white rounded-lg border border-gray-300 p-8">
                            <img src="images/oral-surgery.svg" alt="" class="h-20 mx-auto" />

                            <h4 class="text-xl font-bold mt-4">Oral Surgery</h4>
                            <p class="mt-1">Let us show you how our experience.</p>
                            <a href="#" class="block mt-4">Read More</a>
                        </div>
                    </div>

                    <div class="md:w-1/2 md:px-4 mt-4 md:mt-8 lg:mt-0 lg:w-1/4">
                        <div class="bg-white rounded-lg border border-gray-300 p-8">
                            <img src="images/painless-dentistry.svg" alt="" class="h-20 mx-auto" />

                            <h4 class="text-xl font-bold mt-4">Painless Dentistry</h4>
                            <p class="mt-1">Let us show you how our experience.</p>
                            <a href="#" class="block mt-4">Read More</a>
                        </div>
                    </div>

                    <div class="md:w-1/2 md:px-4 mt-4 md:mt-8 lg:mt-0 lg:w-1/4">
                        <div class="bg-white rounded-lg border border-gray-300 p-8">
                            <img src="images/periodontics.svg" alt="" class="h-20 mx-auto" />

                            <h4 class="text-xl font-bold mt-4">Periodontics</h4>
                            <p class="mt-1">Let us show you how our experience.</p>
                            <a href="#" class="block mt-4">Read More</a>
                        </div>
                    </div>
                </div>
            </section> */}
        </div>

    )
}