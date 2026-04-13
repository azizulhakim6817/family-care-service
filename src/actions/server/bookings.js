"use server";

import { authOptions } from "@/lib/authOptions ";
import { collection, dbConnect } from "@/lib/dbConnect";
import { invoiceTemplate } from "@/lib/invoiceTemplate";
import { sendEmail } from "@/lib/mailer";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
//! payment method---------------
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//! getBooking --------------------
export const getBooking = async () => {
  const collections = await dbConnect(collection.BOOKING);
  const result = await collections.find().sort({ createdAt: -1 }).toArray();

  const data = result.map((items) => ({
    ...items,
    id: items._id.toString(),
  }));

  return data;
};

//! single booking -------------
export const singleBooking = async (id) => {
  const collections = await dbConnect(collection.BOOKING);
  const result = await collections.findOne({
    _id: new ObjectId(id),
  });

  return result;
};

//! delete booking -------------
export const cancelBooking = async (id) => {
  const collections = await dbConnect(collection.BOOKING);
  const result = await collections.deleteOne({
    _id: new ObjectId(id),
  });

  return result;
};

//! create-checkout-session-------------------------
//! payment related apis-----------------------------------------
//! new payment post--------------------------
// ================= CREATE BOOKING =================
export const createBooking = async (payload) => {
  const session = await getServerSession(authOptions);

  try {
    const collections = await dbConnect(collection.BOOKING);
    const bookingData = {
      ...payload,
      status: "Pending",
      isPaid: false,
      name: session?.user?.name,
      email: session?.user?.email,
      createdAt: new Date().toISOString(),
    };

    const result = await collections.insertOne(bookingData);

    return {
      success: true,
      bookingId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Booking Error:", error);
    return { success: false };
  }
};

//! CREATE CHECKOUT SESSION--------------
export const createCheckoutSession = async (paymentInfo) => {
  try {
    const amount = Math.round(Number(paymentInfo.totalCost) * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amount,
            product_data: {
              name: paymentInfo?.serviceName || "Service",
            },
          },
          quantity: 1,
        },
      ],
      customer_email: paymentInfo?.email,

      metadata: {
        bookingId: paymentInfo?.bookingId, // ✅ IMPORTANT
      },

      success_url: `${process.env.NEXTAUTH_URL}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/payment-cancel`,
    });

    return session.url;
  } catch (error) {
    console.error("Stripe Error:", error);
    throw error;
  }
};

//!VERIFY PAYMENT-----------------------
export const verifyPayment = async (sessionId) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return { payment_status: "failed", bookingId: null };
    }

    const bookingId = session?.metadata?.bookingId;
    const userEmail = session?.customer_details?.email;
    const userName = session?.customer_details?.name || "User";
    const amount = (session?.amount_total || 0) / 100;

    if (!userEmail) {
      throw new Error("Email not found");
    }

    //* fixed conditions--------------------
    if (session.status === "complete" && bookingId) {
      const collections = await dbConnect(collection.BOOKING);

      const booking = await collections.findOne({
        _id: new ObjectId(bookingId),
      });

      // duplicate email
      if (booking?.isPaid) {
        return {
          payment_status: "already_paid",
          bookingId,
        };
      }

      //* Update booking-------------
      await collections.updateOne(
        { _id: new ObjectId(bookingId) },
        {
          $set: {
            status: "Paid",
            isPaid: true,
          },
        },
      );

      //* Send Email----------------
      await sendEmail({
        to: userEmail,
        subject: "Payment Successful 🧾",
        html: invoiceTemplate({
          name: userName,
          bookingId,
          amount: amount.toFixed(2),
          date: new Date().toLocaleDateString(),
        }),
      });

      //* create invoice----save to invoice------------
      const invoiceData = {
        bookingId,
        name: userName,
        email: userEmail,
        serviceName: booking?.serviceName,
        amount,
        transactionId: session.id,
        createdAt: new Date(),
      };
      const invoicesCollection = await dbConnect(collection.INVOICES);
      await invoicesCollection.insertOne(invoiceData);

      return {
        payment_status: "paid",
        bookingId,
      };
    }

    return {
      payment_status: "pending",
      bookingId: null,
    };
  } catch (error) {
    console.error("Verify Payment Error:", error);
    return { payment_status: "failed", bookingId: null };
  }
};

//! Update Booking Status-------------------------------------
export const markBookingPaid = async (bookingId) => {
  try {
    if (!ObjectId.isValid(bookingId)) {
      console.error("Invalid bookingId:", bookingId);
      return false;
    }
    const collections = await dbConnect(collection.BOOKING);
    const existing = await collections.findOne({
      _id: new ObjectId(bookingId),
    });

    if (!existing) {
      console.warn("Booking not found:", bookingId);
      return false;
    }

    const updateResult = await collections.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status: "Paid" } },
    );

    if (updateResult.matchedCount === 0) {
      console.warn("No matching booking found.");
      return false;
    }

    if (updateResult.modifiedCount === 0) {
      console.warn("Already Paid or no change needed.");
      return true;
    }

    return true;
  } catch (error) {
    console.error("Update Booking Error:", error);
    return false;
  }
};
