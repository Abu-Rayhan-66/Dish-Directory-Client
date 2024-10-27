/* eslint-disable @next/next/no-img-element */
"use client";

import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgCloseR } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { useSingleUserQuery } from "@/redux/features/user/userApi";


const DashboardSidebar = () => {
  const pathname = usePathname();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { data, isLoading,  } = useSingleUserQuery(user?.id);
  const userData = data?.data

  const [isOpen, setIsOpen] = useState(true);


  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  if (!isClient || !user) {
    return null; 
  }


  if (!user) {
    return <div>No user data available</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

 

  return (
    <div className="mt-16 sm:mt-20 lg:mt-24 opacity-100 z-[50]">
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <GiHamburgerMenu className="text-3xl"></GiHamburgerMenu>
      </button>

      {user?.role === "user" && (
        <div
        className={`fixed left-0 flex flex-col bg-[#1c9991] p-4 w-64 h-[90vh] z-[9999] ${
          isOpen ? "block" : "hidden"
        } top-[100px]`}
      >
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <CgCloseR className="text-white text-3xl"></CgCloseR>
          </button>
          <div className="tooltip tooltip-bottom" data-tip="Edit Profile">
            <Link className="relative" href={`/dashboard/edit-profile`}>
              <img
                className="size-32  rounded-full ml-10 mb-2"
                src={userData?.image}
                alt="profile image"
              />
              <FaEdit className="absolute bottom-8 right-14 text-xl "></FaEdit>
            </Link>
          </div>

          <Link
            href="/dashboard"
            className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
              pathname === "/dashboard"
                ? "bg-[#03AED2] border-2 border-white"
                : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/create-recipe"
            className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
              pathname === "/dashboard/create-recipe"
                ? "bg-[#03AED2] border-2 border-white"
                : ""
            }`}
          >
            Create Recipe
          </Link>

          <Link
            href="/dashboard/my-recipe"
            className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
              pathname === "/dashboard/my-recipe"
                ? "bg-[#03AED2] border-2 border-white"
                : ""
            }`}
          >
            My Recipe
          </Link>
          <Link
            href="/dashboard/change-password"
            className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
              pathname === "/dashboard/change-password"
                ? "bg-[#03AED2] border-2 border-white"
                : ""
            }`}
          >
            Change Password
          </Link>
          {userData?.premiumMembership === false  &&
            <Link
            href="/dashboard/get-premium"
            className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
              pathname === "/dashboard/get-premium"
                ? "bg-[#03AED2] border-2 border-white"
                : ""
            }`}
          >
            Get Premium
          </Link>
          }
        </div>
      )}
      {user?.role === "admin" && (
        <div
          className={`${
            isOpen === false ? "hidden" : ""
          } fixed mt-16 md:mt-24  top-0 left-0 flex flex-col   bg-[#1c9991] p-4 w-64 h-[90vh]`}
        >
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <CgCloseR className="text-white text-3xl"></CgCloseR>
          </button>
          <div className="tooltip tooltip-bottom" data-tip="Edit Profile">
            <Link className="relative" href={`/dashboard/edit-profile`}>
              <img
                className="size-32  rounded-full ml-10 mb-2"
                src={userData?.image}
                alt="profile image"
              />
            </Link>
            <FaEdit className="absolute bottom-8 right-14 text-xl "></FaEdit>
          </div>
          <Link
            href="/dashboard"
            className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
              pathname === "/dashboard"
                ? "bg-[#03AED2] border-2 border-white"
                : ""
            }`}
          >
            Dashboard
          </Link>


          <Link
            href="/dashboard/all-recipe"
            className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
              pathname === "/dashboard/all-recipe"
                ? "bg-[#03AED2] border-2 border-white"
                : ""
            }`}
          >
            All Recipe
          </Link>
          <Link
            href="/dashboard/all-user"
            className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
              pathname === "/dashboard/all-user"
                ? "bg-[#03AED2] border-2 border-white"
                : ""
            }`}
          >
            All Users
          </Link>

          <Link
            href="/dashboard/create-admin"
            className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
              pathname === "/dashboard/create-admin"
                ? "bg-[#03AED2] border-2 border-white"
                : ""
            }`}
          >
            Create Admin
          </Link>

          <Link
            href="/dashboard/get-all-admin"
            className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
              pathname === "/dashboard/get-all-admin"
                ? "bg-[#03AED2] border-2 border-white"
                : ""
            }`}
          >
            Get All Admin
          </Link>
          <Link
            href="/dashboard/change-password"
            className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
              pathname === "/dashboard/change-password"
                ? "bg-[#03AED2] border-2 border-white"
                : ""
            }`}
          >
            Change Password
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
