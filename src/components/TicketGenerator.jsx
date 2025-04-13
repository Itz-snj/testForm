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
            const response = await fetch('http://localhost:3000/ticket/external/add', {
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
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Ticket</h1>
                    <p className="text-gray-600">Submit your issue and we'll get back to you</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Product Serial Number
                        </label>
                        <input
                            type="text"
                            id="serialNumber"
                            name="serialNumber"
                            value={formData.serialNumber}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Enter your product serial number"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Issue Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                            placeholder="Please describe your issue in detail..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Submit Ticket
                    </button>
                </form>

                {message.show && message.type === 'success' && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">{message.text}</p>
                            </div>
                        </div>
                    </div>
                )}

                {message.show && message.type === 'error' && (
                    <div className="mt-4 p-4 bg-red-50 rounded-lg">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">{message.text}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketGenerator;