'use client'
import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { Bell, MessageSquare, Calendar, Clock, User } from "lucide-react"; // or use react-icons
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import Footer from '@/components/Footer';
import { useParams } from "next/navigation";


const EventCard = () => {
    const { user, isAuthenticated, isLoading } = useKindeAuth()
    const [joined, setjoined] = useState(false)
    const [Notification, setNotification] = useState([])
    const [notifPanel, setnotifPanel] = useState(false)
    const params = useParams()

    const router = useRouter()

    const popUp = (message) => {
        let id = Date.now()
        setNotification(prev => [...prev, { id, message }])
        setTimeout(() => {
            setNotification(prev => prev.filter(i => i.id !== id))
        }, 4000);
    }

    const [card, setcard] = useState({
        name: '',
        image: '',
        date: '',
        time: '',
        publisher: '',
        joined: false
    })


    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.push('/')
        }
    }, [isAuthenticated, isLoading])


    useEffect(() => {
        const fetching = async () => {
            const data = await fetch(`/api/getOne/${params?._id}`)
            console.log(params)
            const res = await data.json()
            console.log(res?.oneEvent)
            setcard(res?.oneEvent)
        }
        fetching()
    }, [params?._id])

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

    const isJoined = async () => {
        const newStatus = !card.joined;
        setjoined(newStatus);
        setcard(prev => ({ ...prev, joined: newStatus }));
        console.log(newStatus)

        let obj = {
            _id: params?._id,
            joined: newStatus
        }
        const isJoining = await fetch('/api/notify', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify(obj) // Convert data to JSON string
        })
        setjoined(!card.joined)
        popUp('Event joined. See you')
    }




    return (
        <>
            <div className="">

                <nav className="flex justify-between items-center md:px-20 py-3 sticky top-0 z-50">

                    {/* Logo */}

                    <motion.img
                        src="/Logo.png"
                        alt="logo"
                        className="w-[150px] md:w-[200px]"
                        variants={container(1)}
                        initial="initial"
                        animate="animate"
                    />
                    <Link href='/Userpage'><motion.h1 variants={container(1.1)}
                        initial="initial"
                        animate="animate">Home</motion.h1></Link>


                    {/* Return to Home Page */}

                    <motion.div
                        className="hidden md:flex flex-1 mx-10"
                        variants={container(1.1)}
                        initial="initial"
                        animate="animate"
                    >
                        <input
                            type="text"
                            placeholder="Search events, people or groups..."
                            className="w-full px-4 py-2 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                        />
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
            </div>
            <div className="max-w-6xl mx-auto my-10 p-6 bg-gray-50 rounded-lg shadow-lg grid md:grid-cols-2 gap-8">
                {/* Left Section */}
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-bold">{card.name}</h1>

                    {/* Host */}
                    <div className="flex items-center gap-2 text-gray-700">
                        <span className="text-sm">Hosted by</span>
                        <span className="font-semibold">{card.publisher}</span>
                    </div>

                    {/* Group Info */}
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">

                        <div className="flex flex-col">
                            <span className="font-semibold">{card.publisher}</span>
                            <div className="flex items-center gap-1 text-yellow-500 text-sm">

                                <span>★</span>

                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="bg-white p-4 rounded-lg shadow space-y-3">
                        <h2 className="font-semibold text-lg">Details</h2>
                        <p>{card.details}</p>
                    </div>

                    {/* Date / Time / Location */}
                    <div className="bg-white p-4 rounded-lg shadow space-y-2">
                        <div className="flex items-center gap-2 text-gray-700">
                            <span className="text-orange-500">✔️</span>
                            <span>{card.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <span className="text-pink-500">📅</span>
                            <span>{card.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <span className="text-red-500">📍</span>
                            <span>{card.location}</span>
                        </div>
                    </div>
                </div>

                {/* Right Section - Image */}

                <div className="flex items-center justify-center flex-col gap-10">
                    <img src={card.image || null} alt="event" className="rounded-lg shadow-lg w-full max-w-md" />
                    <div>
                        <span className="text-lg font-mono"> Price: {card.price} {card.currency}</span>
                    </div>
                    {card.eventType === 'Paid' ? (<Link href={`/checkout/${card?._id}`}><button className="bg-blue-400 text-lg rounded-2xl p-2 font-mono">Proceed to Checkout!</button></Link>) : (card.joined ? (<p className="text-xl font-mono text-blue-500">✅Yeah! See you at the Event</p>) : (<button className="text-lg bg-black text-white font-bold rounded-3xl px-10 py-3 hover:shadow-2xl hover:bg-gray-800 cursor-pointer" onClick={isJoined}>Join Event</button>))}
                    
                </div>
                <div className="fixed top-4 right-4 flex flex-col z-50 space-y-4 mt-20">
                    <AnimatePresence>
                        {Array.isArray(Notification) &&
                            Notification.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-gray-600 text-white px-6 py-4 rounded-xl shadow-lg border border-white/20 flex items-center justify-between space-x-4 hover:scale-105 hover:shadow-2xl transition-transform"
                                >
                                    <div>
                                        <h1 className="font-semibold text-md">{item.message}</h1>
                                        {item.subMessage && (
                                            <p className="text-sm text-white/80 mt-1">{item.subMessage}</p>
                                        )}
                                    </div>
                                    
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default EventCard;
