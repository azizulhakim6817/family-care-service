"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import SocialButton from "../button/SocialButton";

const LoginForm = () => {
  const route = useRouter();
  const params = useSearchParams();
  //console.log(params) //callbackUrl=%2Fproducts%2F699e51d889f3a5c0ceb0d8a8
  const callBack = params.get("callbackUrl") || "/";
  //console.log(params.get("callbackUrl") || "/"); //products/699e51d889f3a5c0ceb0d8a8

  //! form--data--------------------
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //! onChange-------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //! handleSubmit----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
      callbackUrl: callBack,
    });

    if (!res.ok) {
      Swal.fire(
        "error",
        ` Email & Password is not match !<br> Try Google Login / Register`,
        "error",
      );
    } else {
      Swal.fire("Success", "Welcome to family care", "success");
      route.push(callBack);
    }
  };

  return (
    <div>
      <div className="my-8 mx-auto card bg-base-100 dark:text-white dark:bg-black w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-xl font-semibold  text-gray-600 text-center dark:text-white">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              {/* password-- */}
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="input  dark:bg-black"
                placeholder="Email "
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="input"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              {/* Login---------------------*/}
              <button
                type="submit"
                className="btn bg-accent text-white font-normal mt-4 hover:bg-secondary  hover:outline-1 outline-accent"
              >
                Login
              </button>
            </fieldset>
          </form>
          {/* social button-----------------------*/}
          <div>
            <SocialButton></SocialButton>
          </div>
          {/* Please register at family care ------------- */}
          <div>
            <p className="text-center mt-2">
              Please register at Family Care :
              <Link
                href={`/register?callbackUrl=${callBack.slice(1)}`}
                className="text-blue-500 hover:text-blue-800 underline"
              >
                <span> Register</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
