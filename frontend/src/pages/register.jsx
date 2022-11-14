import React from "react";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
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
            <p className="text-2xl my-3">Sign in</p>
            <p className="font-bold text-xs">Email</p>
            <input
              type="email"
              className="mt-1 w-64 text-sm border border-gray-400 outline-none pl-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm active:from-yellow-500 hover:opacity-80 transition duration-300 ease-out"
            />
            <p className="font-bold text-xs mt-1">First name</p>
            <input
              type="email"
              className="mt-1 w-64 text-sm border border-gray-400 outline-none pl-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm active:from-yellow-500 hover:opacity-80 transition duration-300 ease-out"
            />
            <p className="font-bold text-xs mt-1">Last name</p>
            <input
              type="email"
              className="mt-1 w-64 text-sm border border-gray-400 outline-none pl-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm active:from-yellow-500 hover:opacity-80 transition duration-300 ease-out"
            />
            <p className="font-bold text-xs mt-1">Password</p>
            <input
              type="password"
              className="mt-1 w-64 border border-gray-400 outline-none pl-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm active:from-yellow-500 hover:opacity-80 transition duration-300 ease-out"
            />
            <p className="font-bold text-xs mt-1">Re-enter password</p>
            <input
              type="password"
              className="mt-1 w-64 border border-gray-400 outline-none pl-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-sm active:from-yellow-500 hover:opacity-80 transition duration-300 ease-out"
            />
            <div className="mt-3 w-64">
              <button className="button cursor-pointer w-full">Continue</button>
            </div>
            <p className="text-xs mt-6">
              By continuing, you agree to{" "}
              <span className="text-blue-500 cursor-pointer font-semibold hover:opacity-80">
                Conditions of Use
              </span>{" "}
              <br /> and{" "}
              <span className="text-blue-500 cursor-pointer font-semibold hover:opacity-80">
                Privacy Notice
              </span>
            </p>
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
          <p className="text-xs mt-3">© Amazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </>
  );
};

export default Login;
