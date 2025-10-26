'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { Bell, MessageSquare, Calendar, Clock, User, HomeIcon } from "lucide-react"; // or use react-icons
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import Footer from '@/components/Footer';
import { useParams } from 'next/navigation';
import ComponentNav from '@/components/ComponentNav';

const CategoryPage = () => {
    const { user, isAuthenticated, isLoading } = useKindeAuth()
    const [loading, setloading] = useState(false)
    const [event, setevent] = useState([])
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.push('/')
        }
    }, [isAuthenticated, isLoading])

    useEffect(() => {

        const seeAll = async () => {
            try {
                setloading(true)
                const data = await fetch(`/api/categoryEvent/${params.query}`)
                console.log(params.query)
                const res = await data.json()
                console.log(res)
                setevent(res?.categoryEvent)
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
            <div className="">

                <ComponentNav/>
            </div>
            <section className="flex flex-col items-center gap-10 mt-10 px-4 md:px-0">
                <h1 className="text-3xl font-mono font-bold text-center">Popular Events - Lock them on</h1>

                {loading ? (
                    <Spinner size={12} color="blue-500" />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-7xl">
                        {Array.isArray(event) && event.map(item => (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 w-full " key={item._id}>
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover"
                  />

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3">
                    <div className='flex justify-between items-center'>
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                        {item.name}
                      </h3>

                      <span className={`text-sm  ${item?.eventType === 'Free' ? 'bg-green-100 text-green-400' : 'bg-blue-100 text-blue-800 '} px-3 py-1 rounded-full`}>
                        {item?.eventType}
                      </span>
                    </div>


                    {/* Publisher */}
                    <div className="flex items-center text-gray-600 text-sm">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{item?.publisher}</span>
                    </div>

                    {/* Date & Time */}
                    <div className="flex justify-between items-center text-gray-600 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-indigo-600" />
                        <span>{item.time}</span>
                      </div>
                    </div>

                    {/* Button */}

                    <Link href={`/event/${item?._id}`}><button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition-all duration-300" >
                      View Details
                    </button></Link>
                  </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />


        </>
    )
}

export default CategoryPage
