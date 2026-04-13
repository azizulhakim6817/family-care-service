📌 Care.xyz – Baby Sitting & Elderly Care Service Platform

Care.xyz is a modern web application that connects users with trusted caregivers for babies, elderly people, and patients.
Users can easily book care services online, track bookings, and receive secure and reliable caregiving support.

🌐 Live Websive  Link : 

   👉 https://family-care-service-platform.vercel.app

📁 GitHub Repository

    👉 https://github.com/azizulhakim6817/family-care-service

🌐 Admin
    👉 Email : programmerazizulhakim@gmail.com 
    👉 Password : Aziz68

🚀 Project Overview

Care.xyz is designed to make caregiving easy, secure, and accessible.

Users can:

Find care services
Book caregivers
Track booking status
Manage their bookings
Receive invoice emails after booking
✨ Key Features
👤 Authentication
Email & Password Login
Google Login (NextAuth)
Secure session handling
Protected routes
📅 Booking System
Dynamic service booking
Duration-based booking
Location selection:
Division
District
City
Area / Address
Automatic total cost calculation
Booking status:
Pending
Confirmed
Completed
Cancelled
🧾 My Bookings
View all bookings
View booking details
Cancel booking
Real-time status updates
🏠 Services
Baby Care Service
Elderly Care Service
Sick Patient Care
Service detail pages with booking option
📧 Email System
Invoice email sent after booking
Booking confirmation email
💳 (Optional Feature)
Stripe payment integration
Booking confirmed after successful payment
🛠 Admin Panel (Optional)
View all bookings
Payment history dashboard
Manage users & services
📄 Pages & Routes
🏠 Homepage (/)
Hero banner / slider
About section
Services overview
Testimonials
🧾 Service Details (/service/:id)
Service information
Pricing details
Book service button
📅 Booking Page (/booking/:service_id)

Private Route

Select duration
Select location
Live total cost calculation
Confirm booking
📌 My Bookings (/my-bookings)

Private Route

View all bookings
Status tracking
Cancel booking
View details
🔐 Authentication
/login
/register
❌ 404 Page
Custom Not Found page
Redirect to Home button
⚙️ Tech Stack
Frontend
Next.js (App Router)
React.js
Tailwind CSS
DaisyUI
Backend
Next.js API Routes / Server Actions
MongoDB
Authentication
NextAuth.js
Email Service
Nodemailer
Payment (Optional)
Stripe
🔐 Environment Variables

Create a .env.local file:

MONGODB_URI=your_mongodb_connection
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://family-care-service-platform.vercel.app

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

STRIPE_SECRET_KEY=your_stripe_key
📦 Installation Guide

# Clone repository

git clone https://github.com/your-username/care.xyz

# Install dependencies

npm install

# Run development server

npm run dev
🚀 Deployment
Recommended Platforms:
Vercel (Frontend + Backend)
MongoDB Atlas (Database)
🧠 Challenges Implemented
Metadata implementation (SEO)
Dynamic booking system
Email invoice system
Protected routes
Status-based booking management
