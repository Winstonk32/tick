import React from 'react';

const OrderConfirmation = ({ booking }) => {
  const handleDownload = () => {
    // Logic for downloading e-ticket
    alert("Downloading e-ticket...");
  };

  const handleEmailConfirmation = () => {
    // Logic for sending email confirmation
    alert("Confirmation email sent!");
  };

  return (
    <div className="order-confirmation">
      <h2>Order Confirmation</h2>
      <p><strong>Booking ID:</strong> {booking.id}</p>
      <p><strong>Event:</strong> {booking.eventName}</p>
      <p><strong>Seats:</strong> {booking.seats.map(seat => seat.label).join(", ")}</p>
      <p><strong>Total Price:</strong> ${booking.totalPrice}</p>

      <button onClick={handleDownload}>Download e-Ticket</button>
      <button onClick={handleEmailConfirmation}>Send Confirmation Email</button>
    </div>
  );
};

export default OrderConfirmation;
