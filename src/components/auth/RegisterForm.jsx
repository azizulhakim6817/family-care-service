"use client";

import { postUser } from "@/actions/server/auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const callBack = params.get("callbackUrl") || "/";

  // Form state
  const [form, setForm] = useState({
    nidno: "",
    name: "",
    email: "",
    password: "",
    contact: "",
    image: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //! Handle form submit------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = form.password;
    // Validation
    const minLength = password.length >= 6;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);

    if (!minLength || !hasUpper || !hasLower) {
      return Swal.fire(
        "Error",
        "Password must be at least 6 characters, include 1 uppercase & 1 lowercase",
        "error",
      );
    }

    // Register user
    const res = await postUser(form);

    if (res?.acknowledged) {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl: callBack,
      });

      if (result?.ok) {
        Swal.fire("Success", "Registration successful!", "success");
        router.push(callBack);
      } else {
        Swal.fire("Error", "Login after registration failed.", "error");
      }
    } else {
      Swal.fire("Error", "Registration failed. Try again.", "error");
    }
  };

  return (
    <div className="my-8 mx-auto card bg-base-100 dark:text-white dark:bg-black w-full max-w-sm shadow-2xl">
      <div className="card-body">
        <h1 className="text-xl font-semibold text-gray-600 text-center dark:text-white">
          Registration
        </h1>

        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset space-y-1">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input dark:text-black"
              placeholder="Name"
              required
            />
            {/* NID No */}
            <label className="label">NID No</label>
            <input
              type="text"
              name="nidno"
              value={form.nidno}
              onChange={handleChange}
              className="input dark:text-black"
              placeholder="NID No"
              required
            />

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input dark:text-black"
              placeholder="Email"
              required
              autoComplete="email"
            />

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="input dark:text-white dark:bg-black"
              placeholder="Password"
              required
              autoComplete="current-password"
            />
            {/* Password */}
            <label className="label">Contract</label>
            <input
              type="tel"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="input dark:text-white dark:bg-black"
              placeholder="Contract"
              required
              autoComplete="current-tel"
            />

            {/* Image URL */}
            <label className="label">Image URL</label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="input dark:text-black"
              placeholder="Image URL"
            />

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="btn bg-accent text-white font-normal mt-4 w-full"
            >
              Register
            </button>
          </fieldset>
        </form>

        <p className="text-center mt-4">
          Already registered?{" "}
          <Link
            href="/login"
            className="text-blue-500 underline hover:text-blue-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
