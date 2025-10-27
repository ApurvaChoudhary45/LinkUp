'use client'
import React from 'react'
import { useState } from 'react';
import { animate, motion } from 'framer-motion';
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
const Welcome = () => {
    const container = (delay) => ({
        initial: { y: 0, opacity: 0 },
        animate: {
            y: 10, opacity: 1,
            transition: {
                duration: 0.5,
                delay: delay
            }
        }
    })
    const stories = [
        {
            id: 1,
            title: "I Found My Hiking Crew on LinkUp",
            description:
                "Riya, a college student, joined a weekend hiking group and discovered her new adventure family. LinkUp turned strangers into friends.",
            image:
                "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0", // replace with your own
            link: "#",
        },
        {
            id: 2,
            title: "How Coffee Chats Became Lifelong Bonds",
            description:
                "Arjun attended a casual coffee meetup through LinkUp, which eventually grew into a circle of close friends who meet every month.",
            image:
                "https://images.unsplash.com/photo-1529070538774-1843cb3265df", // replace with your own
            link: "#",
        },
        {
            id: 3,
            title: "Networking That Feels Natural",
            description:
                "Priya used LinkUp to attend startup mixers. What began as casual chats turned into professional collaborations and friendships.",
            image:
                "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmV0d29ya2luZ3xlbnwwfHwwfHx8MA%3D%3D", // replace with your own
            link: "#",
        },
    ];
    return (
        <div>
            <div className='relative min-h-screen bg-white'>
                {/* <img src="/Logo.png" alt="" className='absolute inset-0 blur-2xl object-cover' /> */}
                <nav className='flex justify-between items-center md:px-20 text-sm'>
                    <motion.img src="/Logo.png" alt="logo" className='md:w-[200px] w-1/3' variants={container(1)} initial='initial' animate='animate' />
                    <motion.div className='flex justify-end items-center gap-5 z-10' variants={container(1.2)} initial='initial' animate='animate'>
                        <LoginLink postLoginRedirectURL="/Userpage" className='bg-gray-700 text-white p-2 rounded-2xl cursor-pointer hover:scale-105 transition-all ease-in-out delay-75 font-mono'>Log In</LoginLink>
                        <LoginLink postLoginRedirectURL="/Userpage" className='cursor-pointer hover:scale-105 transition-all ease-in-out delay-75'>Sign Up</LoginLink>
                        <LoginLink postLoginRedirectURL="/admin/Dashboard" className='cursor-pointer hover:scale-105 transition-all ease-in-out delay-75'>Admin Portal</LoginLink>
                    </motion.div>
                </nav>
                <div className='mt-10 relative z-10'>
                    <div>
                        {/* <img src="" alt="" /> */}
                    </div>
                    <div className='flex justify-center items-center flex-col gap-10'>
                        <motion.h1 className='md:text-4xl font-mono font-extrabold text-xl text-center' variants={container(1.5)} initial='initial' animate='animate'>The community you’ve been looking for📢</motion.h1>
                        <motion.p
                            className='md:w-1/2 text-center text-2xl'
                            variants={container(2)}
                            initial='initial'
                            animate='animate'
                        >
                            Where shared interests spark new friendships.{" "}
                            {`Whether it’s photography, startups, or weekend adventures, you’ll always find people who get you.`}
                            <span className='text-pink-400 font-bold'> Join in. LinkUp.</span>
                        </motion.p>
                        <LoginLink postLoginRedirectURL="/Userpage" className='bg-gray-600 p-3 rounded-3xl text-white md:text-2xl cursor-pointer hover:bg-gray-500' variants={container(2.2)} initial='initial' animate='animate'>Let's Link Up</LoginLink>
                    </div>
                    <section className="bg-gray-50 py-12 px-6 mt-10">
                        <div className="max-w-6xl mx-auto">
                            {/* Heading */}
                            <div className="text-center mb-10">
                                <motion.h2 className="text-3xl font-bold text-gray-900" variants={container(2.5)} initial='initial' animate='animate'>
                                    Friendships are made on <span className="text-indigo-600">LinkUp</span>
                                </motion.h2>
                                <motion.p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto" variants={container(2.8)} initial='initial' animate='animate'>
                                    Since 2025, members have been using LinkUp to find their people, explore
                                    shared passions, and build lasting friendships. Discover their stories.
                                </motion.p>
                            </div>

                            {/* Cards */}
                            <motion.div className="grid md:grid-cols-3 gap-8" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -100 }} transition={{ duration: 1.5 }}>
                                {stories.map((story) => (
                                    <div
                                        key={story.id}
                                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                                    >
                                        <img
                                            src={story.image}
                                            alt={story.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {story.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4">{story.description}</p>

                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </section>
                    <motion.section className="bg-white py-16 px-6" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -100 }} transition={{ duration: 1.5 }}>
                        <div className="max-w-6xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                How <span className="text-indigo-600">LinkUp</span> Works
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                                Joining LinkUp is simple. In just three steps, you can find events,
                                meet new people, and build lasting friendships.
                            </p>

                            <div className="grid md:grid-cols-3 gap-10">
                                <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-md transition">
                                    <div className="text-indigo-600 text-4xl mb-4">1️⃣</div>
                                    <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
                                    <p className="text-gray-600">
                                        Create your free LinkUp account and set up your interests.
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-md transition">
                                    <div className="text-indigo-600 text-4xl mb-4">2️⃣</div>
                                    <h3 className="text-xl font-semibold mb-2">Find Events</h3>
                                    <p className="text-gray-600">
                                        Explore events happening near you based on your passions.
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-md transition">
                                    <div className="text-indigo-600 text-4xl mb-4">3️⃣</div>
                                    <h3 className="text-xl font-semibold mb-2">Meet & Connect</h3>
                                    <p className="text-gray-600">
                                        Attend meetups, make friends, and grow your network effortlessly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                    <motion.footer className="bg-gray-900 text-gray-300 py-12 px-6" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 100 }} transition={{ duration: 1.5 }}>
                        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
                            {/* Brand */}
                            <div>
                                <h3 className="text-xl font-bold text-white">LinkUp</h3>
                                <p className="text-gray-400 mt-2">
                                    Bringing people together through shared passions and events.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3">
                                    Quick Links
                                </h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="hover:text-indigo-400">Home</a></li>
                                    <li><a href="#" className="hover:text-indigo-400">Events</a></li>
                                    <li><a href="#" className="hover:text-indigo-400">How It Works</a></li>
                                    <li><a href="#" className="hover:text-indigo-400">Stories</a></li>
                                </ul>
                            </div>

                            {/* Support */}
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3">Support</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="hover:text-indigo-400">Help Center</a></li>
                                    <li><a href="#" className="hover:text-indigo-400">Contact Us</a></li>
                                    <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
                                    <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
                                </ul>
                            </div>

                            {/* Socials */}
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
                                <div className="flex space-x-4">
                                    <a href="#" className="hover:text-indigo-400">🐦 Twitter</a>
                                    <a href="#" className="hover:text-indigo-400">📘 Facebook</a>
                                    <a href="#" className="hover:text-indigo-400">📸 Instagram</a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
                            © {new Date().getFullYear()} LinkUp. All rights reserved.
                        </div>
                    </motion.footer>
                </div>
            </div>
        </div>
    )
}

export default Welcome
