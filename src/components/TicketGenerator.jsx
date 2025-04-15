import React, { useState } from 'react';
import './TicketGenerator.css';
const TicketGenerator = () => {
    const [formData, setFormData] = useState({
        serialNumber: '',
        description: ''
    });
    const [message, setMessage] = useState({ text: '', type: '', show: false });

const validateSerialNumber = (serial) => {
    let sum = serial.toString()
        .split('')
        .reduce((acc, digit) => acc + parseInt(digit), 0);
    while (sum > 9) {
        sum = sum.toString()
            .split('')
            .reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum === 9;
};

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateSerialNumber(formData.serialNumber)) {
            setMessage({
                text: 'Invalid Serial number or product not found',
                type: 'error',
                show: true
            });
            return;
        }

        try {
            const response = await fetch('https://supreme-duck-helping.ngrok-free.app/ticket/external/add', {
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
        <div className="ticket-container">
            <div className="ticket-form">
                <div className="form-header">
                    <h1 className="form-title">Support Ticket</h1>
                    <p className="form-subtitle">We're here to help solve your issues</p>
                </div>

                <form onSubmit={handleSubmit} className="form-content">
                    <div className="form-group">
                        <label htmlFor="serialNumber" className="form-label">
                            Product Serial Number
                        </label>
                        <input
                            type="text"
                            id="serialNumber"
                            name="serialNumber"
                            value={formData.serialNumber}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="Enter your product serial number"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">
                            Issue Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="form-textarea"
                            placeholder="Please describe your issue in detail..."
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-button">
                        Submit Ticket
                    </button>

                    {message.show && (
                        <div className={`message ${message.type}`}>
                            <svg className="message-icon" viewBox="0 0 20 20" fill="currentColor">
                                {message.type === 'success' ? (
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                ) : (
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                                )}
                            </svg>
                            <span>{message.text}</span>
                        </div>
                    )}
                </form>

                <div className="form-footer">
                    © 2023 Support System. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default TicketGenerator;