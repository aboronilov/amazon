import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useState } from "react";

import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";

const Header = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const { totatlQuantity } = useSelector((state) => state.basket);  

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      router.push({
        pathname: "/search",
        query: { q: search },
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <header>
      {/* top nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow pl-2">
        <Link href="/">
          <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
            <Image
              src="https://links.papareact.com/f90"
              objectFit="contain"
              width={100}
              height={30}
              className="cursor-pointer"
            />
          </div>
        </Link>

        {/* search */}
        <div className="ml-2 hidden sm:flex items-center h-10 flex-grow rounded-lg bg-yellow-400 hover:bg-yellow-500">
          <input
            type="text"
            className="w-6 h-full rounded-l-lg flex-grow flex-shrink outline-none p-2"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyPress={handleSearch}
          />
          <SearchIcon
            className="h-12 p-4 cursor-pointer"
            onClick={() => {
              router.push({
                pathname: "/search",
                query: { q: search },
              });
            }}
          />
        </div>

        {/* right */}
        <div className="flex text-white gap-x-6 ml-3 items-center text-xs md:text-sm mx-6 whitespace-nowrap">
          {isAuthenticated ? (
            <div className="link">
              <div>
                Hello{" "}
                <span className="capitalize text-yellow-300">
                  {currentUser.first_name}
                </span>
              </div>
              <div className="font-extrabold" onClick={handleLogout}>
                Logout
              </div>
            </div>
          ) : (
            <div className="link" onClick={() => router.push("/login")}>
              <div>Login</div>
              <div className="font-extrabold">Account & Lists</div>
            </div>
          )}

          <div className="link">
            <div>Returns</div>
            <div className="font-extrabold">& Orders</div>
          </div>
          <div
            className="link flex items-center relative"
            onClick={() => router.push("/checkout")}
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-xs text-gray-800 font-bold">
              {totatlQuantity}
            </span>
            <ShoppingCartIcon className="h-10" />
            <div className="hidden md:block font-extrabold mt-2">Basket</div>
          </div>
        </div>
      </div>
      {/* bottom nav */}
      <div className="flex items-center gap-x-3 p-3 pl-6 bg-amazon_blue-light text-white">
        <div className="flex items-center link">
          <MenuIcon className="mr-1 h-4 md:h-6 " />
          All
        </div>
        <div className="link">Prime video</div>
        <div className="link">Amazon Business</div>
        <div className="link">Today's Deals</div>
        <div className="link hidden lg:block">Electronics</div>
        <div className="link hidden lg:block">Food & Grocery</div>
        <div className="link hidden lg:block">Prime</div>
        <div className="link hidden lg:block">Shopper Toolkit</div>
        <div className="link hidden lg:block">Health & Personal Care</div>
      </div>
    </header>
  );
};

export default Header;
