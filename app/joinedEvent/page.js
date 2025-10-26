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
                const data = await fetch('/api/getJoined')
                const res = await data.json()
                console.log(res)
                setevent(res?.cityEvent)
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
                    <img src="https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg" alt="" className='absolute inset-0 w-full h-[280px] object-cover blur-xs' />
                </div>
                <div className='relative z-10 md:px-40 flex justify-center items-center py-10'>
                    <h1 className='text-center md:text-4xl font-mono '>Events You’re <span className='text-blue-300'>Joining</span></h1>
                    <p className='md:text-lg font-mono text-center mt-5 text-white'>This section provides a complete overview of all the events you’ve joined so far. Easily revisit event details, check schedules, and stay updated on any changes. With all your attended events gathered in one place, keeping track of your networking and experiences has never been simpler. Managing or revisiting event information is effortless whenever you need it..</p>
                </div>
                <p className='relative z-10 text-blue-300 text-center font-bold md:text-4xl text-xl'>Take a look at everything you’ve visited so far.</p>

            </motion.div>
            <div className='py-10'>
                {loading ? <Spinner /> : (<div className='py-10 md:px-40 md:grid md:grid-cols-2 grid grid-cols-1 gap-10 px-10'>
                    {Array.isArray(event) && event?.map(item => {
                        return (
                            <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" key={item._id}>
                                <img
                                    className="w-full h-52 object-cover"
                                    src={item.image}
                                    alt="Tech Startup Networking Night"
                                />

                                <div className="p-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-indigo-600">
                                            {item.date} • {item.time}
                                        </span>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                            {item.publisher}
                                        </span>
                                    </div>

                                    <h2 className="mt-3 text-xl font-bold text-gray-900">
                                        {item.name}
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                        {item.details}
                                    </p>

                                    <div className="mt-4 flex items-center text-gray-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-2 text-indigo-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a8 8 0 1011.314-11.314l-4.243 4.243z" />
                                        </svg>
                                        <span className="text-sm">{item.location}</span>
                                    </div>

                                </div>
                            </div>

                        )
                    })}
                </div>)}
            </div>
            <Footer />

        </>
    )
}

export default MyEvent
