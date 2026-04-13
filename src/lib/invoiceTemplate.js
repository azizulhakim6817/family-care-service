export const invoiceTemplate = ({ name, bookingId, amount, date }) => {
  return `
  <div style="font-family: Arial; background:#f6f9fc; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; padding:25px; box-shadow:0 5px 15px rgba(0,0,0,0.08);">
      
      <h2 style="text-align:center; color:#2c3e50;">🧾 Invoice</h2>

      <p>Hi <strong>${name}</strong>,</p>
      <p>Your payment was successful. Here are your details:</p>

      <table style="width:100%; border-collapse:collapse; margin-top:20px;">
        <tr>
          <td style="padding:12px; border:1px solid #eee;"><strong>Booking ID</strong></td>
          <td style="padding:12px; border:1px solid #eee;">${bookingId}</td>
        </tr>
        <tr>
          <td style="padding:12px; border:1px solid #eee;"><strong>Date</strong></td>
          <td style="padding:12px; border:1px solid #eee;">${date}</td>
        </tr>
        <tr>
          <td style="padding:12px; border:1px solid #eee;"><strong>Status</strong></td>
          <td style="padding:12px; border:1px solid #eee; color:green;"><strong>Paid ✅</strong></td>
        </tr>
        <tr>
          <td style="padding:12px; border:1px solid #eee;"><strong>Total</strong></td>
          <td style="padding:12px; border:1px solid #eee; font-size:18px; color:#27ae60;">
            <strong>$${amount}</strong>
          </td>
        </tr>
      </table>

      <p style="margin-top:25px;">
        Thank you for choosing <strong>My Service Book</strong> 💙
      </p>

      <hr style="margin:30px 0;" />

      <p style="font-size:12px; color:#999; text-align:center;">
        This is an automated invoice. Please do not reply.
      </p>
    </div>
  </div>
  `;
};
