import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

const EventCard = ({ event }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 w-full">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
          {event.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h2 className="text-2xl font-bold text-gray-900">{event.name}</h2>
        <p className="text-gray-600 text-sm">
          Hosted by <span className="font-semibold">{event.publisher}</span>
        </p>

        {/* Event Details */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-700 text-sm mt-2 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-purple-600" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-purple-600" />
            <span>{event.city}</span>
          </div>
        </div>

        {/* RSVP Button */}
        <div className="mt-4">
          <a
            href={event.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            RSVP Now
          </a>
        </div>
      </div>
    </div>
  );
};

// Example usage
const event = {
  name: "Dreamflow Jam - Buildathon",
  image: "/mnt/data/8d07eb25-9315-49e8-a853-ae80852c8752.png",
  publisher: "Mohammed M.",
  date: "Oct 31, 2025",
  time: "10:00 AM - 12:00 PM IST",
  city: "Hyderabad",
  category: "Technology",
  link: "https://www.youtube.com/live/jiAUTVgpJfw?feature=share",
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <EventCard event={event} />
    </div>
  );
}
