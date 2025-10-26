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

const ReportProblem = () => {
     const { user, isAuthenticated, isLoading } = useKindeAuth()
  const [loading, setloading] = useState(false)
  const [event, setevent] = useState([])
  const [modal, setmodal] = useState(false)
  const [search, setsearch] = useState('')

  const router = useRouter()
  const [profile, setprofile] = useState(false)
  const [formData, setFormData] = useState({ subject: '', description: '' })
  const [submitted, setSubmitted] = useState(false)
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
  const getSearch = async () => {
    try {

      const data = await fetch(`/api/tickSearch`)
      const res = await data.json()
      console.log(res?.tickEvent?._embedded)
      setevent(res?.tickEvent?._embedded?.events)


    } catch (error) {
      console.log('Unable to fetch')
    }
  }

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setloading(true)
    // send report to backend
    await fetch('/api/reportIssue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    setloading(false)
    setSubmitted(true)
    setFormData({ subject: '', description: '' })
  }

  return (
    <>
    <div className="">

        <nav className="flex justify-between items-center md:px-20 sticky top-0 z-50">

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

            {/* Message Icon */}
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
              <MessageSquare className="w-6 h-6 text-gray-600" />
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
              className="bg-gray-700 text-white px-4 py-2 rounded-2xl cursor-pointer hover:scale-105 transition-all ease-in-out delay-75 font-mono"
            >
              Log Out
            </LogoutLink>
          </motion.div>
        </nav>
      </div>
    <div className="py-10 flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Report a Problem
        </h1>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Let us know what’s going wrong, and we’ll fix it as soon as possible.
        </p>

        {submitted && (
          <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4 text-center">
            Thank you! Your report has been submitted.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="description"
            placeholder="Describe the problem..."
            value={formData.description}
            onChange={handleChange}
            rows={6}
            required
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </motion.div>
    </div>
    <Footer/>
    </>
  )
}

export default ReportProblem
