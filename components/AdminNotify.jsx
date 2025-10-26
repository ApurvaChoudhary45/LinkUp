import React from 'react'
import { useState } from 'react'
const AdminNotify = ({onClose}) => {
    const [complaint, setcomplaint] = useState(true)
    
    const [title, settitle] = useState('')
   
    const [desc, setdesc] = useState('')
    
    const fileComplaint = async(e)=>{
        e.preventDefault()
        let details = {
            title : title,
            description : desc
        }
       const data = await fetch('/api/notifyUpdate', {method : 'POST',
        headers: {
                'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify(details) // Convert data to JSON string
       })
       onClose()
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        🔔 Push a New Notification
                    </h2>
                    <button className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={onClose}>✖</button>
                </div>

                {/* Form Fields */}
                <form className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Notification Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                            placeholder="Enter a short title"
                            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                   

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Describe the issue..."
                            value={desc}
                            onChange={(e) => setdesc(e.target.value)}
                            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                   

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-green-500 text-white rounded-xl font-medium shadow hover:bg-green-600 transition"
                        onClick={fileComplaint}
                    >
                        🚀 Send Notification
                    </button>
                </form>
            </div>
        </div>
  )
}

export default AdminNotify
