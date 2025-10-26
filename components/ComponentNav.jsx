'use client'
import React from 'react'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Bell, MessageSquare, Calendar, Clock, User, HomeIcon } from "lucide-react"; // or use react-icons
import { motion } from 'framer-motion'
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import Link from 'next/link';
import { useState } from 'react';

const ComponentNav = () => {
  const { user } = useKindeAuth()
  const [profile, setprofile] = useState(false)
  const [notify, setnotify] = useState(false)
  const isProfile = () => {
    setprofile(!profile)
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
    <div>
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
        {/* Back to UserPage */}
        <Link href='/Userpage'><motion.h1 variants={container(1.1)}
          initial="initial"
          animate="animate">Home</motion.h1></Link>

        {/* Center Search Bar */}
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
                  <LogoutLink
                    postLogoutRedirectURL="/"
                    className=" px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Log Out
                  </LogoutLink>
                </div>
              </div>
            )}
          </div>

          {/* Logout */}
          <span className="text-gray-700 font-medium">
            Hi, {user?.given_name.replace(/"/g, "&quot;")}
          </span>
          
        </motion.div>
      </nav>
    </div>
  )
}

export default ComponentNav
