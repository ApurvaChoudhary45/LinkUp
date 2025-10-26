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


const CheckoutPage = ({ event }) => {
    const { user, isAuthenticated, isLoading } = useKindeAuth()
    const [joined, setjoined] = useState(false)
    const [Notification, setNotification] = useState([])
    const [notifPanel, setnotifPanel] = useState(false)
    const params = useParams()
    const [card, setcard] = useState([])

    const router = useRouter()
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

        const bookTicket = async(card)=>{
          const data = await fetch('/api/bookedTicket', {method : 'POST',
             headers: {
                'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify(card) // Convert data to JSON string
          })
          router.push('/Confirmation')
        }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-3xl w-full p-6">
        
        {/* Event Summary */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          <img
            src={card.image}
            alt={card.name}
            className="w-40 h-40 rounded-xl object-cover mb-4 md:mb-0 md:mr-6"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{card.name}</h2>
            <p className="text-gray-600 mb-1">📅 {card.date} | {card.time}</p>
            <p className="text-gray-600 mb-1">📍 {card.location}</p>
            <p className="text-lg font-semibold mt-2">Price: ₹{card.price}</p>
          </div>
        </div>

        {/* Payment Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3">Payment Method</h3>
          <div className="flex space-x-4 mb-4">
            <button className="px-4 py-2 rounded-xl border">Card</button>
            <button className="px-4 py-2 rounded-xl border">UPI</button>
            <button className="px-4 py-2 rounded-xl border">Wallet</button>
          </div>

          <p className="text-gray-700 mb-4">
            Total Amount: <span className="font-bold">₹{card.price}</span>
          </p>

          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all" onClick={()=>bookTicket(card)}>
            Pay Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
