import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [first_name, setFirst_name] = useState("")
  const [last_name, setLast_name] = useState("")
  const [password, setPassword] = useState("")
  const [re_password, setRe_password] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === re_password) {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register/`, {
          first_name,
          last_name,
          email,
          password,
        });
        if (response.status === 201) {
          router.push("/login");
        } 
      } catch (error) {
        setError("password is too simple")
        console.log(error.response.data)
      }
    } else {
      setError("passwords are not equal")
    } 
  };

  return (
    <>
      <div className="bg-white flex flex-col justify-center items-center">
        <Link href="/">
          <div className="my-2">
            <Image
              src="/Amazon_logo.svg.png"
              objectFit="contain"
              width={100}
              height={40}
              className="cursor-pointer "
            />
          </div>
        </Link>

        <div className="border-2 border-gray-200 flex flex-col justify-start rounded-md">
          <div className="m-5">
            <div className="text-xl md:text-2xl my-3">Sign in</div>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="font-bold text-xs">Email</div>
              <input
                type="email"
                className="mt-1 w-64 text-xs border border-gray-400 outline-none pl-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm active:from-yellow-500 hover:opacity-80 transition duration-300 ease-out"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="font-bold text-xs mt-1">First name</div>
              <input
                type="text"
                className="mt-1 w-64 text-xs border border-gray-400 outline-none pl-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm active:from-yellow-500 hover:opacity-80 transition duration-300 ease-out"
                onChange={(e) => setFirst_name(e.target.value)}
                required
              />
              <div className="font-bold text-xs mt-1">Last name</div>
              <input
                type="text"
                className="mt-1 w-64 text-xs border border-gray-400 outline-none pl-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm active:from-yellow-500 hover:opacity-80 transition duration-300 ease-out"
                onChange={(e) => setLast_name(e.target.value)}
                required
              />
              <div className="font-bold text-xs mt-1">Password</div>
              <input
                type="password"
                className="text-xs mt-1 w-64 border border-gray-400 outline-none pl-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm active:from-yellow-500 hover:opacity-80 transition duration-300 ease-out"
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="min 8 characters and different from email"
                minLength="8"
              />
              <div className="font-bold text-xs mt-1">Re-enter password</div>
              <input
                type="password"
                className="text-xs mt-1 w-64 border border-gray-400 outline-none pl-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm active:from-yellow-500 hover:opacity-80 transition duration-300 ease-out"
                placeholder="min 8 characters and different from email"
                onChange={(e) => setRe_password(e.target.value)}
                minLength="8"
                required
              />

              {error && <div className="text-xs text-red-400">{error}</div>}

              <div className="mt-3 w-64">
                <button className="button cursor-pointer w-full">
                  Continue
                </button>
              </div>
            </form>
            <div className="text-xs mt-6">
              By continuing, you agree to{" "}
              <span className="text-blue-500 cursor-pointer font-semibold hover:opacity-80">
                Conditions of Use
              </span>{" "}
              <br /> and{" "}
              <span className="text-blue-500 cursor-pointer font-semibold hover:opacity-80">
                Privacy Notice
              </span>
            </div>
          </div>
        </div>

        <div className="w-64 mt-2">
          <div className="flex">
            <div className="flex border-b border-gray-200 w-[20%]"></div>
            <div className="text-xs text-gray-500 flex items-start flex-grow justify-center align-text-bottom">
              Already have an account?
            </div>
            <div className="flex border-b border-gray-200 w-[20%]"></div>
          </div>
        </div>

        <Link href="/login">
          <div className="w-64 my-4">
            <button className="text-xs md:text-sm rounded-md bg-gray-100 w-full py-2 border border-gray-500 hover:opacity-80 transition ease-out duration-300">
              Login
            </button>
          </div>
        </Link>
      </div>
      <div className="bg-gray-100 opacity-50 h-screen border-t border-gray-200 border-opacity-80">
        <div className="flex flex-col items-center mt-3">
          <div className="flex items-center justify-between w-[220px]">
            <div className="text-xs text-indigo-800 cursor-pointer font-semibold hover:opacity-80">
              Conditions of use
            </div>
            <div className="text-xs text-indigo-800 cursor-pointer font-semibold hover:opacity-80">
              Privacy note
            </div>
            <div className="text-xs text-indigo-800 cursor-pointer font-semibold hover:opacity-80">
              Help
            </div>
          </div>
          <div className="text-xs mt-3">© Amazon.com, Inc. or its affiliates</div>
        </div>
      </div>
    </>
  );
};

export default Login;
