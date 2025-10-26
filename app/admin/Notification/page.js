'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { Bell, MessageSquare, Calendar, Clock, User } from "lucide-react"; // or use react-icons
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import Footer from '@/components/Footer';
import Detailed from '@/components/Detailed';
import { usePathname } from 'next/navigation';
import AdminNotify from '@/components/AdminNotify';



const Reported = () => {
    const { user, isAuthenticated, isLoading } = useKindeAuth()
    const [loading, setloading] = useState(false)

    const [event, setevent] = useState([])
    const [modal, setmodal] = useState(false)
    const [dash, setdash] = useState([])
    const leftBar = ['Dashboard', 'Events', 'Tickets', 'Reports', 'Notification']

    const router = useRouter()
    const [profile, setprofile] = useState(false)
    const pathname = usePathname()

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
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.push('/')
        }
    }, [isAuthenticated, isLoading])

    useEffect(() => {
        const fetcher = async () => {
            setloading(true)
            const data = await fetch('/api/stayNotified')
            const res = await data.json()
            setdash(res?.seeEvents)
            setloading(false)

        }
        fetcher()
    }, [])

    // const deleteEvent = async (_id) => {
    //     const delData = await fetch('/api/reportIssue', {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json' // Specify the content type
    //         },
    //         body: JSON.stringify({ _id }) // Convert data to JSON string
    //     })

    //     setdash(prev => prev.filter(i => i?._id !== _id))

    // }

    const updateResolved = async (_id) => {
        const data = await fetch('/api/resolvedIt', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify({ _id }) // Convert data to JSON string

        })
    }

    return (
        <div>
            <nav className="flex justify-between items-center md:px-20 sticky top-0 z-50 bg-gray-200">

                {/* Logo */}
                <motion.img
                    src="/Logo.png"
                    alt="logo"
                    className="w-[150px] md:w-[200px]"
                    variants={container(1)}
                    initial="initial"
                    animate="animate"
                />


                {/* Center Search Bar */}
                <motion.div
                    className="hidden md:flex flex-1 mx-10 gap-5"
                    variants={container(1.1)}
                    initial="initial"
                    animate="animate"
                >
                </motion.div>



                {/* Right Side: Icons + Logout */}
                <motion.div
                    className="flex items-center gap-5 z-10"
                    variants={container(1.2)}
                    initial="initial"
                    animate="animate"
                >
                    {/* Notification Icon */}
                    <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                        <Bell className="w-6 h-6 text-gray-600" />
                        {/* Notification dot */}
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Message Icon */}
                    <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                        <MessageSquare className="w-6 h-6 text-gray-600" />
                    </button>

                    {/* Logout */}
                    <div className="relative inline-block">
                        {/* Profile Icon */}
                        <div
                            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shadow-md cursor-pointer"
                        // onClick={isProfile}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-1/2 w-1/2 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5.121 17.804A12.056 12.056 0 0112 15c2.21 0 4.266.574 6.121 1.568M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </div>

                        {/* Box below icon */}
                        {profile && (
                            <div className="absolute top-full mt-2 w-48 bg-white shadow-xl rounded-lg z-50 overflow-hidden animate-fadeIn">
                                <div className="flex flex-col py-2">
                                    <Link
                                        href="/myEvents"
                                        className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        Created Events
                                    </Link>
                                    <Link
                                        href="/joinedEvent"
                                        className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        Join Events
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <span className="text-gray-700 font-medium">
                        Hi, {user?.given_name.replace(/"/g, "&quot;")}
                    </span>
                    <LogoutLink
                        postLogoutRedirectURL="/"
                        className="bg-gray-700 text-white px-4 py-2 rounded-2xl cursor-pointer hover:scale-105 transition-all ease-in-out delay-75 font-mono"
                    >
                        Log Out
                    </LogoutLink>
                </motion.div>
            </nav>

            <div className='flex '>
                <section className='w-1/6 bg-blue-50 min-h-screen'>
                    <div className='flex justify-start items-center gap-10 flex-col py-10'>
                        {leftBar?.map((item, index) => {
                            const path = `/admin/${item}`
                            const active = path === pathname
                            return (


                                <Link href={path} key={index}>
                                    <button className="relative text-lg px-8 font-mono cursor-pointer hover:font-semibold hover:text-red-500"  >
                                        {active && (<motion.div
                                            layoutId="active"
                                            className="absolute inset-0 bg-gray-300 rounded-2xl z-0  w-full"
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        />)}

                                        <span className="relative z-10">{item}</span>


                                    </button>
                                </Link>

                            )
                        })}
                    </div>

                </section>

                <section className="flex flex-col flex-1 items-center">
                    <h1 className="text-2xl py-10 font-mono font-bold">Notification Section</h1>
                    {modal && <AdminNotify onClose={() => setmodal(false)} />}
                    <button onClick={() => setmodal(!modal)} className='bg-gray-500 p-3 rounded-xl text-white'>Add a Notification</button>

                    {loading ? (
                        <Spinner />
                    ) : (dash.length === 0 ? <p>No new updates yet</p> : <div className="overflow-x-auto w-full max-w-6xl mx-auto mt-10">
                            <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="text-left py-3 px-5 font-semibold text-gray-700">Title</th>
                                        <th className="text-left py-3 px-5 font-semibold text-gray-700">Type</th>
                                        <th className="text-left py-3 px-5 font-semibold text-gray-700">Date</th>
                                        <th className="text-left py-3 px-5 font-semibold text-gray-700">Time</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {dash.map((item, index) => (
                                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition">
                                            <td className="py-3 px-5 text-gray-800">{item.title}</td>
                                            <td className="py-3 px-5 text-gray-600">{item.description}</td>
                                            <td className="py-3 px-5 text-gray-500">{item.date}-{item.month}-{item.year}</td>
                                            <td className="py-3 px-5 text-gray-500">{item.time}</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                    )}
                </section>
                <section>

                </section>


            </div>
        </div>
    )
}

export default Reported
