import React from 'react'
import Image from "next/image"

import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon
} from "@heroicons/react/outline";

const Header = () => {
  return (
    <header>
        {/* top nav */}
        <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
            <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                <Image 
                    src="https://links.papareact.com/f90"
                    objectFit='contain'
                    width={150}
                    height={40}
                    className="cursor-pointer"
                />
            </div>

            {/* search */}
            <div className="hidden sm:flex items-center h-10 flex-grow rounded-lg bg-yellow-400 hover:bg-yellow-500">
                <input type="text" className='w-6 h-full rounded-l-lg flex-grow flex-shrink outline-none p-2' />
                <SearchIcon className="h-12 p-4 cursor-pointer"/>
            </div>

            {/* right */}
            <div className="flex text-white gap-x-6 ml-3 items-center text-xs md:text-sm mx-6 whitespace-nowrap">
                <div className="link">
                    <p>Hello Anatoly</p>
                    <p className='font-extrabold'>Account & Lists</p>
                </div>
                <div className="link">
                    <p>Returns</p>
                    <p className='font-extrabold'>& Orders</p>
                </div>
                <div className="link flex items-center relative">
                    <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-xs text-gray-800 font-bold'>4</span>
                    <ShoppingCartIcon  className="h-10"/>
                    <p className='hidden md:block font-extrabold mt-2'>Basket</p>
                </div>
            </div>

        </div>
        {/* bottom nav */}
        <div className="flex items-center gap-x-3 p-3 pl-6 bg-amazon_blue-light text-white">
            <p className='flex items-center link'>
                <MenuIcon className='mr-1 h-6'/>
                All
            </p>
            <p className='link'>Prime video</p>
            <p className='link'>Amazon Business</p>
            <p className='link'>Today's Deals</p>
            <p className='link hidden lg:block'>Electronics</p>
            <p className='link hidden lg:block'>Food & Grocery</p>
            <p className='link hidden lg:block'>Prime</p>
            <p className='link hidden lg:block'>Shopper Toolkit</p>
            <p className='link hidden lg:block'>Health & Personal Care</p>
        </div>
    </header>
  )
}

export default Header