import React, { useState } from 'react';

const TicketGenerator = () => {
    const [formData, setFormData] = useState({
        serialNumber: '',
        description: ''
    });
    const [message, setMessage] = useState({ text: '', type: '', show: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(' https://supreme-duck-helping.ngrok-free.app/ticket/external/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (response.ok) {
                setMessage({
                    text: `Ticket created successfully! Ticket ID: ${data.ticketId}`,
                    type: 'success',
                    show: true
                });
                setFormData({ serialNumber: '', description: '' });
            } else {
                throw new Error(data.message || 'Failed to create ticket');
            }
        } catch (error) {
            setMessage({
                text: error.message || 'An error occurred. Please try again.',
                type: 'error',
                show: true
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
            <div className="max-w-lg w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/20">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Support Ticket
                    </h1>
                    <p className="text-gray-600 text-lg">
                        We're here to help. Submit your issue below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                        <div className="relative">
                            <label htmlFor="serialNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                                Product Serial Number
                            </label>
                            <input
                                type="text"
                                id="serialNumber"
                                name="serialNumber"
                                value={formData.serialNumber}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
                                placeholder="Enter your product serial number"
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                Issue Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="5"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm hover:shadow-md resize-none"
                                placeholder="Please describe your issue in detail..."
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium text-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                    >
                        Submit Ticket
                    </button>
                </form>

                {message.show && message.type === 'success' && (
                    <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100 shadow-sm">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-base font-medium text-green-800">{message.text}</p>
                            </div>
                        </div>
                    </div>
                )}

                {message.show && message.type === 'error' && (
                    <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100 shadow-sm">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-base font-medium text-red-800">{message.text}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketGenerator;