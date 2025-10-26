'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
const Page = () => {
const router = useRouter()
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3159/3159066.png"
        alt="Thank you"
        className="w-28 h-28 mb-6"
      />

      <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
      <p className="text-gray-600 text-lg mb-8">
        Your ticket has been booked successfully. See you at the Event!
      </p>

      <button
        onClick={() => router.push('/Userpage')}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-lg transition cursor-pointer"
      >
        Back to Menu
      </button>
    </div>
    </div>
  )
}

export default Page
