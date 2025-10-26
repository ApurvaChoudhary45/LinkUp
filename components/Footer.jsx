'use client'
import React from 'react'
import { motion } from 'framer-motion'
const Footer = () => {
  return (
   <motion.footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-10" whileInView={{opacity: 1, y:0}} initial={{opacity:0, y:100}} transition={{duration: 1.5}}>
                        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
                            {/* Brand */}
                            <div>
                                <h3 className="text-xl font-bold text-white">LinkUp</h3>
                                <p className="text-gray-400 mt-2">
                                    Bringing people together through shared passions and events.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3">
                                    Quick Links
                                </h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="hover:text-indigo-400">Home</a></li>
                                    <li><a href="#" className="hover:text-indigo-400">Events</a></li>
                                    <li><a href="#" className="hover:text-indigo-400">How It Works</a></li>
                                    <li><a href="#" className="hover:text-indigo-400">Stories</a></li>
                                </ul>
                            </div>

                            {/* Support */}
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3">Support</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="hover:text-indigo-400">Help Center</a></li>
                                    <li><a href="#" className="hover:text-indigo-400">Contact Us</a></li>
                                    <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
                                    <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
                                </ul>
                            </div>

                            {/* Socials */}
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
                                <div className="flex space-x-4">
                                    <a href="#" className="hover:text-indigo-400">🐦 Twitter</a>
                                    <a href="#" className="hover:text-indigo-400">📘 Facebook</a>
                                    <a href="#" className="hover:text-indigo-400">📸 Instagram</a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
                            © {new Date().getFullYear()} LinkUp. All rights reserved.
                        </div>
                    </motion.footer>
  )
}

export default Footer
