// src/App.js

import React, { useState } from 'react';

function App() {
    const [formData, setFormData] = useState({
        sellerName: '',
        invoiceNo: '',
        invoiceDate: '',
        // Add more fields as per invoice requirements
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/generate-invoice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log('Generated PDF:', data.pdfPath);
            alert('Invoice generated successfully!');
        } catch (error) {
            console.error('Error generating invoice:', error);
            alert('Failed to generate invoice');
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Invoice Generator</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <input
                    type="text"
                    name="sellerName"
                    placeholder="Seller Name"
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
                <input
                    type="text"
                    name="invoiceNo"
                    placeholder="Invoice No."
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
                <input
                    type="date"
                    name="invoiceDate"
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
                {/* Add more input fields for other invoice details */}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Generate Invoice
                </button>
            </form>
        </div>
    );
}

export default App;
