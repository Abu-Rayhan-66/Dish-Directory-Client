"use client";

import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 
import Image from "next/image";
import { useSingleUserQuery } from "@/redux/features/user/userApi";
import Cookies from "js-cookie";

const Navbar = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { data, isLoading,  } = useSingleUserQuery(user?.id);
  const dispatch = useAppDispatch();
  const pathname = usePathname(); 
  const router = useRouter()

  const handleLogOut = () => {
    Cookies.remove("access_token");
    dispatch(logout());
    router.push("/login")

  };

  const navigationButton = (
    <>
      <li className="text-white font-medium uppercase text-lg m-3">
        <Link
          href="/"
          className={`${
            pathname === "/" ? " border-2 border-[#03AED2] rounded-tl-xl text-white rounded-br-xl p-1" : ""
          }`}
        >
          home
        </Link>
      </li>
      <li className="text-white font-medium uppercase text-lg m-3">
        <Link
          href="/about"
          className={`${
            pathname === "/about" ? "text-white border-2 border-[#03AED2] rounded-tl-xl rounded-br-xl p-1" : ""
          }`}
        >
          about
        </Link>
      </li>
      <li className="text-white font-medium uppercase text-lg m-3">
        <Link
          href="/contact"
          className={`${
            pathname === "/contact" ? "text-white border-2 border-[#03AED2] rounded-tl-xl rounded-br-xl p-1" : ""
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
                ? "text-white border-2 border-[#03AED2] rounded-tl-xl rounded-br-xl p-1"
                : ""
            }`}
          >
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  


  return (
    <nav
      className="fixed top-0 w-full z-50  bg-gradient-to-l from-[#083f53] to-[#1c9991] border-b-[1px] border-slate-400"
          
      
    >
      <div className="navbar bg-transparent">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Menu">
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
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#1c9991] rounded-box z-[50] mt-3 w-52 p-2 shadow"
            >
              {navigationButton}
            </ul>
          </div>
          {user ? <a className="btn btn-ghost text-xl text-white">{data?.data?.name}</a> : ""}
          <div>
            <Link href="/">
              <Image
                src="https://i.ibb.co.com/0G2QF9N/Screenshot-12.png"
                height={60}
                width={60}
                className="rounded-full"
                alt="logo"
              />
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
