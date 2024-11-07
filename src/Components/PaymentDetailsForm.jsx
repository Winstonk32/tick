import React, { useState } from 'react';

const PaymentDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    billingAddress: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!formData.expirationDate) newErrors.expirationDate = 'Expiration date is required';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    if (!formData.billingAddress) newErrors.billingAddress = 'Billing address is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle successful submission (e.g., send data to server)
      console.log('Payment details submitted:', formData);
      
      // Show success alert
      alert("Congrats, you have successfully bought the tickets!");
      
      // Reset form
      setFormData({
        name: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        billingAddress: '',
      });
      setErrors({});
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#38A3A5] rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name on Card:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full p-3 border rounded-md shadow-sm ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } focus:ring focus:ring-teal-300`}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className={`mt-1 block w-full p-3 border rounded-md shadow-sm ${
              errors.cardNumber ? 'border-red-500' : 'border-gray-300'
            } focus:ring focus:ring-teal-300`}
          />
          {errors.cardNumber && <span className="text-red-500 text-sm">{errors.cardNumber}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Expiration Date (MM/YY):</label>
          <input
            type="text"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            placeholder="MM/YY"
            className={`mt-1 block w-full p-3 border rounded-md shadow-sm ${
              errors.expirationDate ? 'border-red-500' : 'border-gray-300'
            } focus:ring focus:ring-teal-300`}
          />
          {errors.expirationDate && <span className="text-red-500 text-sm">{errors.expirationDate}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">CVV:</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            className={`            mt-1 block w-full p-3 border rounded-md shadow-sm ${
              errors.cvv ? 'border-red-500' : 'border-gray-300'
            } focus:ring focus:ring-teal-300`}
          />
          {errors.cvv && <span className="text-red-500 text-sm">{errors.cvv}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Billing Address:</label>
          <input
            type="text"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            className={`mt-1 block w-full p-3 border rounded-md shadow-sm ${
              errors.billingAddress ? 'border-red-500' : 'border-gray-300'
            } focus:ring focus:ring-teal-300`}
          />
          {errors.billingAddress && <span className="text-red-500 text-sm">{errors.billingAddress}</span>}
        </div>
        <button 
          type="submit"
          className="w-full bg-teal-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition duration-200 shadow-md"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentDetailsForm;