'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { Bell, MessageSquare, Calendar, Clock, User, Home } from "lucide-react"; // or use react-icons
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import Footer from '@/components/Footer';
import Detailed from '@/components/Detailed';


const Dashboard = () => {
    const { user, isAuthenticated, isLoading, getPermission } = useKindeAuth()
      
      const [cancreateticket, setcancreateticket] = useState(null)
      
      const leftBar = ['Dasboard', 'Events', 'Tickets', 'Reports', 'Notification']
      const router = useRouter()
      const [profile, setprofile] = useState(false)
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
  const backHome = ()=>{
    router.push('/')
  }
   useEffect(() => {
      if (!isAuthenticated && !isLoading) {
        router.push('/')
      }
    }, [isAuthenticated, isLoading])
    useEffect(() => {
    if (isAuthenticated) {
      const permission = getPermission('answer:ticket');
      console.log(permission)
      setcancreateticket(permission?.isGranted || false);
      // setrole(claim?.value?.[0]?.name)
    }
  }, [isAuthenticated, Dashboard]);
  return (
    <>
   {isAuthenticated && cancreateticket ?   <div className="">

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
        
        <div className='flex'>
        <section className='w-1/6 bg-blue-50 min-h-screen'>
              <div  className='flex justify-start items-center gap-10 flex-col py-10'>
                {leftBar?.map((item, index)=>{
                    return (
                        
                        <div key={index}>
                        <Link href={`/admin/${item}`}><h1 className='text-lg font-mono hover:text-blue-400 cursor-pointer'>{item}</h1></Link>
                        </div>
                        
                    )
                })}
              </div>

        </section>
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto min-h-screen">
      
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Events</p>
          <p className="text-2xl font-bold">56</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Registrations</p>
          <p className="text-2xl font-bold">890</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-bold">$4,500</p>
        </div>
      </div>

      {/* Recent Events Table */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <h2 className="text-lg font-bold mb-4">Recent Events</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2">Event Name</th>
                <th className="px-4 py-2">Organizer</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">React Meetup</td>
                <td className="px-4 py-2">John Doe</td>
                <td className="px-4 py-2">12 Oct</td>
                <td className="px-4 py-2 text-green-600">Active</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">NodeJS Workshop</td>
                <td className="px-4 py-2">Sarah Lee</td>
                <td className="px-4 py-2">15 Oct</td>
                <td className="px-4 py-2 text-yellow-500">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Registrations Table */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <h2 className="text-lg font-bold mb-4">Recent Registrations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Event Joined</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">Alex</td>
                <td className="px-4 py-2">alex@email.com</td>
                <td className="px-4 py-2">React Meetup</td>
                <td className="px-4 py-2 text-green-600">Active</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">Maria</td>
                <td className="px-4 py-2">maria@email.com</td>
                <td className="px-4 py-2">NodeJS Workshop</td>
                <td className="px-4 py-2 text-yellow-500">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Notifications / Alerts */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold mb-4">System Notifications</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>New event submitted for approval</li>
          <li>Payment received from Alice</li>
          <li>User John Doe has reported an issue</li>
        </ul>
      </div>

    </main>
        </div>
        <Footer/>
      </div> :<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 text-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-10 border border-gray-200 max-w-md w-full"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-bold text-red-500 mb-4"
        >
          Access Denied
        </motion.h1>

        <p className="text-gray-700 text-lg font-mono mb-8">
          You do not have the right permission to view this page.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={backHome}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md transition-all"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </motion.button>
      </motion.div>

      <p className="mt-10 text-gray-400 font-mono text-sm">
        Error Code: <span className="font-semibold text-gray-600">403</span>
      </p>
    </div>}
      </>
  )
}

export default Dashboard
