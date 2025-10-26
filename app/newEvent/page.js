"use client";

import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bell, MessageSquare, Calendar, Clock, User } from "lucide-react"; // or use react-icons
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useEdgeStore } from "@/lib/edgestore";
import ComponentNav from "@/components/ComponentNav";
export default function CreateEventPage() {
    const { user, isAuthenticated, isLoading } = useKindeAuth()
    const [file, setfile] = useState(null)
    const [isCreating, setisCreating] = useState(false)
    const { edgestore } = useEdgeStore();
    const [Notification, setNotification] = useState([])

    const popUp = (message) => {
        let id = Date.now()
        setNotification(prev => [...prev, { id, message }])
        setTimeout(() => {
            setNotification(prev => prev.filter(i => i.id !== id))
        }, 4000);
    }

    const [formData, setformData] = useState({
        title: "",
        category: "",
        description: "",
        startDate: "",
        endDate: "",
        venue: "",
        city: "",
        state: "",
        pincode: "",
        address: "",
        link: "",
        isOnline: false,       // checkbox / boolean
        organizer: "",
        email: "",
        phone: "",
        price: "",
        ticket: "",
    })


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setformData(prev => ({
            ...prev, [name]: type === 'checkbox' ? checked : value
        }))
    }

    const router = useRouter()
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

    const finalEvent = async (e) => {
        e.preventDefault()
        setisCreating(true)
        let uploadURL = ''
        if (file) {
            const uploaded = await edgestore.publicFiles.upload({
                file
            })
            console.log(uploaded)
            uploadURL = uploaded.url


        }
        let details = {
            title: formData.title,
            category: formData.address,
            description: formData.description,
            startDate: new Date(formData.startDate),
            endDate: new Date(formData.endDate),
            venue: formData.venue,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            address: formData.address,
            link: formData.link,
            isOnline: false,       // checkbox / boolean
            organizer: formData.organizer,
            email: formData.email,
            phone: formData.phone,
            price: formData.price,
            ticket: formData.ticket,
            image: uploadURL
        }



        const data = await fetch('/api/sendEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify(details) // Convert data to JSON string
        })
        setisCreating(false)
        popUp('Event has been created successfully')

        // router.push('/Userpage')


    }
    // To check if all the required fields are filled before submitting the form
    const isForm = formData.title && formData.category && formData.description && formData.venue && formData.city && formData.address && formData.organizer && formData.email && file


    return (
        <>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100">

                <ComponentNav/>
            </div>
            <motion.div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-6" variants={container(1.5)}
                initial="initial"
                animate="animate">
                <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-3xl p-8 md:p-12">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create an Event</h1>
                        <p className="text-gray-500">
                            Share your event details and connect with your community.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-10">
                        {/* Basic Info */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                Basic Information
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Event Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Tech Innovators Meetup 2025"
                                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Category *</label>
                                    <input
                                        type="text"
                                        name="category"
                                        required
                                        value={formData.category}
                                        onChange={handleChange}
                                        placeholder="Technology, Music, Fitness..."
                                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Description *</label>
                                    <textarea
                                        value={formData.description}
                                        name="description"
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Write a brief about your event..."
                                        className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>


                            </div>
                        </section>

                        {/* Date & Time */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                Date & Time
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Start Date & Time *</label>
                                    <input
                                        type="datetime-local"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className="w-full border rounded-xl px-4 py-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">End Date & Time *</label>
                                    <input
                                        type="datetime-local"
                                        value={formData.endDate}
                                        name="endDate"
                                        onChange={handleChange}
                                        className="w-full border rounded-xl px-4 py-2.5"
                                    />
                                </div>

                                <div className="flex items-center mt-8 md:mt-0">
                                    <input
                                        id="isAllDay"
                                        type="checkbox"
                                        name="isOnline"
                                        value={formData.isOnline}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                    <label htmlFor="isAllDay" className="ml-2 text-gray-700">
                                        All Day Event
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Location */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                Location Details
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Venue Name *</label>
                                    <input
                                        type="text"
                                        name="venue"
                                        value={formData.venue}
                                        onChange={handleChange}
                                        placeholder="WeWork Koramangala"
                                        className="w-full border rounded-xl px-4 py-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Bangalore"
                                        className="w-full border rounded-xl px-4 py-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="Karnataka"
                                        className="w-full border rounded-xl px-4 py-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        placeholder="560034"
                                        className="w-full border rounded-xl px-4 py-2.5"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="12 Residency Road, Koramangala, Bangalore"
                                        className="w-full border rounded-xl px-4 py-2.5"
                                    />
                                </div>


                                <div>
                                    <label className="block text-sm font-medium mb-1">Online Link (if any)</label>
                                    <input
                                        type="url"
                                        name="link"
                                        value={formData.link}
                                        onChange={handleChange}
                                        placeholder="https://meet.google.com/example"
                                        className="w-full border rounded-xl px-4 py-2.5"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Organizer */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                Organizer Details
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Organizer Name *</label>
                                    <input
                                        type="text"
                                        name="organizer"
                                        value={formData.organizer}
                                        onChange={handleChange}
                                        placeholder="Apurva Singh"
                                        className="w-full border rounded-xl px-4 py-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="apurva@example.com"
                                        className="w-full border rounded-xl px-4 py-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="w-full border rounded-xl px-4 py-2.5"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Media */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                Media
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Banner Image *</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setfile(e.target.files[0])}
                                        accept="image/*"
                                        className="w-full border rounded-xl px-4 py-2.5 cursor-pointer"
                                    />
                                </div>


                            </div>
                        </section>

                        {/* Ticketing */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                                Ticketing / Pricing
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">

                                <div>
                                    <label className="block text-sm font-medium mb-1">Ticket Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="499"
                                        className="w-full border rounded-xl px-4 py-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Ticket Link</label>
                                    <input
                                        type="url"
                                        name="ticket"
                                        value={formData.ticket}
                                        onChange={handleChange}
                                        placeholder="https://linkup.com/tickets/example"
                                        className="w-full border rounded-xl px-4 py-2.5"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Submit */}
                        <div className="pt-6 border-t mt-10 text-center">
                            <button
                                type="submit"
                                className="px-10 py-3 bg-indigo-600 text-white font-medium rounded-2xl hover:bg-indigo-700 transition-all"
                                onClick={finalEvent}
                                disabled={!isForm}
                            >
                                Create Event
                            </button>
                        </div>
                    </form>
                    {isCreating && (
                        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/60 text-white z-50">
                            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                            <h2 className="text-2xl font-semibold tracking-wide">Creating your event...</h2>
                            <p className="text-gray-300 mt-2">Please wait while we process your request</p>
                        </div>
                    )}

                    <div className="fixed top-4 right-4 flex flex-col z-50 space-y-4 mt-20">
                        {Array.isArray(Notification) && Notification?.map(item => {
                            return (
                                <div key={item.id}>
                                    <h1>{item.message}</h1>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </motion.div>
        </>
    );
}
