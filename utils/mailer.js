import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_EMAIL, 
    pass: process.env.SMTP_PASSWORD 
  }
});

export const sendBookingConfirmation = async (toEmail, bookingDetails) => {
  const mailOptions = {
    from: `"Car Dealership 🚘" <${process.env.SMTP_EMAIL}>`,
    to: toEmail,
    subject: `🎉 Booking Confirmed for ${bookingDetails.carName}`,
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 30px; background: #ffffff; border-radius: 10px; font-family: 'Segoe UI', sans-serif; color: #333;">
        <h2 style="color: #2adbbd; text-align: center;">🚗 Booking Confirmation</h2>
        <p style="font-size: 16px;">Hi <strong>${bookingDetails.userName}</strong>,</p>
        <p style="font-size: 15px;">We're excited to let you know that your booking for <strong>${bookingDetails.carName}</strong> has been successfully confirmed!</p>

        <div style="text-align: center; margin: 20px 0;">
          <img src="https://your-deployment-url.com${bookingDetails.carImage}" alt="${bookingDetails.carName}" style="max-width: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.15);">
        </div>

        <h3 style="color: #444;">📄 Booking Details:</h3>
        <table cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 14px;">
          <tr>
            <td><strong>Payment ID:</strong></td>
            <td>${bookingDetails.paymentId}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td><strong>Date:</strong></td>
            <td>${bookingDetails.bookingDate}</td>
          </tr>
          <tr>
            <td><strong>Time:</strong></td>
            <td>${bookingDetails.bookingTime}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td><strong>Amount Paid:</strong></td>
            <td>₹${bookingDetails.amountPaid / 100}</td>
          </tr>
          <tr>
            <td><strong>Address:</strong></td>
            <td>${bookingDetails.address}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td><strong>Status:</strong></td>
            <td style="color: green; font-weight: bold;">${bookingDetails.status}</td>
          </tr>
        </table>

        <div style="margin: 30px 0; text-align: center;">
          <a href="https://your-deployment-url.com/my-orders" style="background: #2adbbd; color: #fff; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold;">View My Booking</a>
        </div>

        <p style="font-size: 13px; color: #888; text-align: center;">Thank you for choosing our dealership. See you on the road!</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

