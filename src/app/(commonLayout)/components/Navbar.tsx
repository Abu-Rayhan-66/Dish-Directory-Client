"use client";

import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook to get current path
import Image from "next/image";

const Navbar = () => {
  const user = useAppSelector((state: RootState) => state.auth.userData);
  const dispatch = useAppDispatch();
  const pathname = usePathname(); // Get current route path

  const handleLogOut = () => {
    dispatch(logout());
  };

  const navigationButton = (
    <ul>
      <li className="text-white font-medium uppercase text-lg m-3">
        <Link
          href="/"
          className={`${
            pathname === "/" ? "text-[#03AED2] border-2 border-[#03AED2] rounded-tl-xl rounded-br-xl p-1" : ""
          }`}
        >
          home
        </Link>
      </li>
      <li className="text-white font-medium uppercase text-lg m-3">
        <Link
          href="/about"
          className={`${
            pathname === "/about" ? "text-[#03AED2] border-2 border-[#03AED2] rounded-tl-xl rounded-br-xl p-1" : ""
          }`}
        >
          about
        </Link>
      </li>
      <li className="text-white font-medium uppercase text-lg m-3">
        <Link
          href="/contact"
          className={`${
            pathname === "/contact" ? "text-[#03AED2] border-2 border-[#03AED2] rounded-tl-xl rounded-br-xl p-1" : ""
          }`}
        >
          contact
        </Link>
      </li>
      {user && (
        <li className="text-white font-medium uppercase text-lg m-3">
          <Link
            href="/dashboard"
            className={`${
              pathname === "/dashboard"
                ? "text-[#03AED2] border-2 border-[#03AED2] rounded-tl-xl rounded-br-xl p-1"
                : ""
            }`}
          >
            Dashboard
          </Link>
        </li>
      )}
    </ul>
  );

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-3000 ease-in-out ${
        isScrolled
          ? "bg-gradient-to-l from-[#083f53] to-[#1c9991] border-b-[1px] border-slate-400"
          : "bg-transparent border-none"
      }`}
    >
      <div className="navbar bg-transparent">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#1c9991] rounded-box z-[50] mt-3 w-52 p-2 shadow"
            >
              {navigationButton}
            </ul>
          </div>
          {user ? <a className="btn btn-ghost text-xl text-white">{user.name}</a> : ""}
          <div>
            <Link href="/">
              <Image
              src="https://i.ibb.co.com/JcVyrjg/Screenshot-3.png"
              height={60}
              width={60}
              className="rounded-full"
              alt="logo"
              ></Image>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navigationButton}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleLogOut}
              className="py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium"
            >
              SignOut
            </button>
          ) : (
            <button className="py-1 px-4 rounded-tl-md rounded-br-md text-white bg-[#03AED2] text-lg font-medium ">
              <Link href="/login">Login</Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
