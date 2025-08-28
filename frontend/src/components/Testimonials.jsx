import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { HiOutlineUserCircle, HiOutlineChartBar, HiOutlineUsers, HiOutlineClock, HiOutlineBadgeCheck } from 'react-icons/hi';
import { RiDoubleQuotesL } from 'react-icons/ri';

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Patient",
        quote: "The doctors here are incredibly professional and caring. The online booking system made it so easy to schedule my appointments.",
        rating: 5,
        tags: ["Professional Care", "Easy Booking"]
    },
    {
        name: "Michael Chen",
        role: "Regular Patient",
        quote: "I've been coming here for years. The medical care is top-notch, and the staff is always friendly and helpful.",
        rating: 5,
        tags: ["Excellent Staff", "Quality Care"]
    },
    {
        name: "Emily Rodriguez",
        role: "Patient",
        quote: "The facility is modern and clean. I appreciate how the doctors take time to explain everything thoroughly.",
        rating: 5,
        tags: ["Modern Facility", "Detailed Explanations"]
    }
];

const trustIndicators = [
    {
        value: "98%",
        label: "Patient Satisfaction",
        icon: <HiOutlineChartBar className="w-6 h-6" />
    },
    {
        value: "10k+",
        label: "Patients Served",
        icon: <HiOutlineUsers className="w-6 h-6" />
    },
    {
        value: "50+",
        label: "Expert Doctors",
        icon: <HiOutlineUserCircle className="w-6 h-6" />
    },
    {
        value: "15+",
        label: "Years Experience",
        icon: <HiOutlineClock className="w-6 h-6" />
    }
];

const Testimonials = () => {
    return (
        <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Our Patients Say
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Read about the experiences of our patients and how we've helped them
                        with their healthcare needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-gray-50 rounded-xl p-8 relative group hover:bg-white hover:shadow-lg transition-all duration-300"
                        >
                            <RiDoubleQuotesL className="absolute top-6 right-6 text-4xl text-gray-100" />
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <HiOutlineUserCircle className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>

                            <div className="relative">
                                <p className="text-gray-600 mb-4">
                                    {testimonial.quote}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {testimonial.tags.map((tag, i) => (
                                        <span 
                                            key={i}
                                            className="inline-flex items-center gap-1 px-3 py-1 text-sm text-gray-600 bg-white rounded-full group-hover:bg-gray-50"
                                        >
                                            <HiOutlineBadgeCheck className="w-4 h-4 text-gray-400" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-gray-300 group-hover:text-yellow-400 transition-colors duration-300 w-4 h-4" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {trustIndicators.map((indicator, index) => (
                        <motion.div
                            key={index}
                            className="text-center group"
                        >
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-gray-100 transition-colors duration-300">
                                {indicator.icon}
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">
                                {indicator.value}
                            </div>
                            <div className="text-gray-500 font-medium">
                                {indicator.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Testimonials; 