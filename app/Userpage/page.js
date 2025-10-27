'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { Bell, MessageSquare, Calendar, Clock, User } from "lucide-react"; // or use react-icons
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import Footer from '@/components/Footer';
import Detailed from '@/components/Detailed';


const Userpage = () => {
  const { user, isAuthenticated, isLoading, getPermission } = useKindeAuth()
  const [loading, setloading] = useState(false)
  const [cancreateticket, setcancreateticket] = useState(null)
  const [event, setevent] = useState([])
  const [modal, setmodal] = useState(false)

  const router = useRouter()
  const [profile, setprofile] = useState(false)
  const allCategory = [{ title: "Travel ", color: "green", icon: "🌲" },
  { title: "Social", color: "blue", icon: "🍕" },
  { title: "Health", color: "red", icon: "❤️‍🩹" },
  { title: "Sports", color: "gray", icon: "⚽" },
  { title: "Arts", color: "blue", icon: "🎨" },
  { title: "Games", color: "red", icon: "🎮" },
  { title: "Technology", color: "green", icon: "⚙️" },
  { title: "Science", color: "gray", icon: "🔭" },
  { title: "Business", color: "red", icon: "💼" }
  ]
  const [search, setsearch] = useState('')
  const cities = [{ city: 'Chicago', source: 'https://images.pexels.com/photos/1334607/pexels-photo-1334607.jpeg' },
  { city: 'Miami', source: 'https://images.pexels.com/photos/3773651/pexels-photo-3773651.jpeg' },
  { city: 'Mumbai', source: 'https://images.pexels.com/photos/3454027/pexels-photo-3454027.jpeg' },
  { city: 'London', source: 'https://images.pexels.com/photos/77171/pexels-photo-77171.jpeg' },
  { city: 'Sydney', source: 'https://images.pexels.com/photos/1536436/pexels-photo-1536436.jpeg' }]

  const params = useParams()

  const isDetail = () => {
    setmodal(!modal)
  }

  const isProfile = () => {
    setprofile(!profile)
  }
useEffect(() => {
    if (isAuthenticated) {
      const permission = getPermission('create:ticket');
      console.log(permission)
      setcancreateticket(permission?.isGranted || false);
      // setrole(claim?.value?.[0]?.name)
    }
  }, [isAuthenticated, Userpage]);



  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading])

  useEffect(() => {

    const seeAll = async () => {
      try {
        setloading(true)
        const data = await fetch(`/api/getMore?size=6`)
      const res = await data.json()
      console.log(res)
      console.log(res?.seeEvents)
      setevent(res?.seeEvents)
        setloading(false)
      } catch (error) {
        console.log('Unable to fetch')
      }
    }

    seeAll()

  }, [])

  const getSearch = async () => {
    try {

      const data = await fetch(`/api/searchEvent/${search}?size=6`)
      const res = await data.json()
      console.log(res)
      console.log(res?.seeEvents)
      setevent(res?.seeEvents)


    } catch (error) {
      console.log('Unable to fetch')
    }
  }



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
    {isAuthenticated && cancreateticket  && <div className='bg-gray-50 '>
      <div className="">

        <nav className="flex justify-between items-center md:px-20 py-3 sticky top-0 z-50">

          {/* Logo */}
          <motion.img
            src="/Logo.png"
            alt="logo"
            className="w-[120px] md:w-[200px]"
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
            <input
              type="text"
              placeholder="Search events, people or groups..."
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              className="w-full px-4 py-2 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
            <button className='p-2 bg-amber-300 rounded-2xl' onClick={getSearch}>Search</button>
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

            
            {/* Logout */}
            <div className="relative inline-block">
              {/* Profile Icon */}
              <div
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shadow-md cursor-pointer"
                onClick={isProfile}
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
                    <Link
                      href="/Report"
                      className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      Report
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
              className="bg-gray-700 text-white md:px-4 md:py-2 rounded-2xl cursor-pointer hover:scale-105 transition-all ease-in-out delay-75 font-mono text-sm px-5 py-1"
            >
              Log Out
            </LogoutLink>
          </motion.div>
        </nav>
      </div>
      <div>
        <section className='mt-10'>
          <div className='flex justify-center items-center flex-col text-center gap-10'>
            <h1 className="text-2xl md:text-4xl font-bold font-mono ">
              👋 Welcome back, <span className="text-green-300">{user?.given_name}! </span>
              Ready to discover new events today
            </h1>
            <Link href='/newEvent'><button className='bg-gray-700 text-white px-4 py-2 rounded-2xl cursor-pointer font-mono'  >Create Event</button></Link>
          </div>
        </section>
        <section className='flex justify-center items-center gap-10 flex-col mt-10'>
          <h1 className='md:text-3xl font-mono font-bold text-xl'>Popular Events Lock them on</h1>
          <div className='md:grid md:grid-cols-3 gap-5 px:10 grid grid-cols-1 px-10'>
            {loading ? (<Spinner />) : (Array.isArray(event) && event?.map(item => {
              return (

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

                    <Link href={`/event/${item?._id}`}><button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition-all duration-300" onClick={isDetail}>
                      View Details
                    </button></Link>
                  </div>
                </div>

              )
            }))}

          </div>
          <Link href='/moreEvents' className='text-center font-mono text-blue-400 text-xl hover:text-blue-500'>See More</Link>
        </section>
        <section>
          <h1 className='md:text-3xl font-bold font-mono px-10 mt-10 text-xl'>Explore Top Categories</h1>
          <div className='flex overflow-x-auto gap-6 px-10 mt-10 snap-x snap-mandatory overflow-y-hidden scrollbar-hide cursor-pointer ml-10'>
            {Array.isArray(allCategory) && allCategory?.map((item, index) => {
              return (
                <Link href={`/category/${item.title}`} key={index}><div

                  className={`relative flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-md p-4 flex flex-col justify-between transform transition hover:scale-105 hover:shadow-lg snap-start delay-150`}
                >

                  <div className='relative z-50'>
                    <div className="text-lg font-bold mt-10">{item.title}</div>
                    <div className="flex justify-between items-end">
                      <div className="text-sm text-gray-400 cursor-pointer">→</div>
                      <div
                        className={`text-4xl`}
                      >
                        {item.icon}
                      </div>
                    </div>
                    <div
                      className={`absolute w-full h-2 rounded-b-xl bg-${item.color}-100`}
                    ></div>
                  </div>
                </div>
                </Link>
              )
            })}

          </div>
        </section>
        <section>
          <h1 className='md:text-3xl font-bold font-mono px-10 mt-10 text-xl'>Popular Cities on LinkUP</h1>
          <div className='md:flex justify-center gap-10 mt-10 md:px-20 grid grid-cols-2 px-5'>
            {Array.isArray(cities) && cities?.map((item, index) => {
              return (

                <Link href={`/city/${item.city}`} key={index}>
                  <div className='bg-gray-100 p-3 rounded-3xl hover:scale-105 transition-all delay-105'>
                    <img src={item.source} alt="" className='rounded-2xl w-48 h-68 object-cover cursor-pointer' />
                    <h1 className='mt-5 text-center text-xl font-mono'>{item.city}</h1>
                  </div></Link>

              )
            })}
          </div>
        </section>
        <Footer />
      </div>

    </div>}
    </>
  )
}

export default Userpage
