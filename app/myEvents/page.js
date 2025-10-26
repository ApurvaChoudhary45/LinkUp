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
import ComponentNav from '@/components/ComponentNav';

const MyEvent = () => {
    const { user, isAuthenticated, isLoading } = useKindeAuth()
    const [loading, setloading] = useState(false)
    const [event, setevent] = useState([])
    const [modal, setmodal] = useState(false)
    const [profile, setprofile] = useState(false)
    const router = useRouter()
    const [search, setsearch] = useState('')
    const isDetail = () => {
        setmodal(!modal)
    }

    const isProfile = () => {
        setprofile(!profile)
    }
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.push('/')
        }
    }, [isAuthenticated, isLoading])

    useEffect(() => {
        const seeAll = async () => {
            try {
                setloading(true)
                const data = await fetch('/api/getCreate')
                const res = await data.json()
                console.log(res)
                setevent(res?.seeEvents)
                setloading(false)
            } catch (error) {
                console.log('Unable to fetch')
            }
        }

        seeAll()
    }, [])

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

    return (
        <>
            <div className='bg-gray-50'>
                <div className="">

                   <ComponentNav/>
                </div>

            </div>
            <motion.div className='relative ' variants={container(1.5)} initial='initial' animate='animate'>
                <div>
                    <img src="https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg" alt="" className='absolute inset-0 md:w-full h-[280px] object-cover blur-xs' />
                </div>
                <div className='relative z-10 md:px-40 flex justify-center items-center py-10'>
                    <h1 className='md:text-center md:text-4xl font-mono '>Events You’re <span className='text-blue-300'>Hosting</span></h1>
                    <p className='md:text-lg font-mono text-center mt-5 text-white'>This section gives you a complete overview of every event you’ve created. You can monitor key details, track participant registrations, and manage tickets seamlessly. With all your events visible in one place, staying organized and keeping everything under control has never been simpler. Updating or sharing your events can be done effortlessly whenever needed.</p>
                </div>
                <p className='relative z-10 text-blue-300 text-center font-bold md:text-4xl text-xl'>Take a look at everything you’ve set up so far.</p>
                
            </motion.div>
            <div className='py-10'>
            {loading ? <Spinner/> : (<div className='py-10 md:px-40 md:grid-cols-3 grid grid-cols-1 gap-10 px-10'>
                    {Array.isArray(event) && event?.map(item => {
                        return (
                            <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300" key={item._id}>
                                {/* Event Image */}
                                <img
                                    src={item.image}
                                    alt="Event"
                                    className="w-full h-48 object-cover"
                                />

                                {/* Event Content */}
                                <div className="p-5 flex flex-col gap-2">
                                    {/* Title & Category */}
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-gray-800">{`tech`}</h2>
                                        <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                            {`Near Park Clinic, Park Market, Hirapur`}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm line-clamp-2">{`new event`}</p>

                                    {/* Date & Venue */}
                                    <div className="flex flex-col text-gray-500 text-sm mt-2 gap-1">
                                        <span>
                                            <strong>Start:</strong>{" "}
                                            {new Date("2025-10-03T09:31:00.000Z").toLocaleString()}
                                        </span>
                                        <span>
                                            <strong>End:</strong>{" "}
                                            {new Date("2025-10-01T09:31:00.000Z").toLocaleString()}
                                        </span>
                                        <span>
                                            <strong>Venue:</strong> WEwork kormangla
                                        </span>
                                        <span>
                                            <strong>City:</strong> Dhanbad, Jharkhand ({`826001`})
                                        </span>
                                    </div>

                                    {/* Organizer Info */}
                                    <div className="flex flex-col text-gray-500 text-sm mt-2 gap-1 border-t pt-2">
                                        <span>
                                            <strong>Organizer:</strong> Mannu Bhaiya
                                        </span>
                                        <span>
                                            <strong>Email:</strong> apurvasinghchoudhary@gmail.com
                                        </span>
                                        <span>
                                            <strong>Phone:</strong> +17004377129
                                        </span>
                                    </div>


                                </div>
                            </div>

                        )
                    })}
                </div>)}
                </div>
                <Footer/>

        </>
    )
}

export default MyEvent
