"use client"; 

import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgCloseR } from "react-icons/cg";

const DashboardSidebar = () => {
    const pathname = usePathname();
    const user = useAppSelector((state: RootState) => state.auth.userData);
    const [isLoading, setIsLoading] = useState(true); 
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        
        if (user) {
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="mt-16 sm:mt-20 lg:mt-24 opacity-100 z-50">
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}><GiHamburgerMenu className="text-3xl"></GiHamburgerMenu></button>

            {
                user?.role === "user" && (
                    <div className={`${isOpen ===false ? "hidden":""} fixed mt-16 md:mt-24  top-0 left-0 flex flex-col   bg-[#1c9991] p-4 w-64 h-[90vh]`}>
                        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}><CgCloseR className="text-white text-3xl"></CgCloseR></button>
                        <Link
                            href="/dashboard/followers"
                            className={`block  text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
                                pathname === "/dashboard/followers" ? "bg-[#03AED2] border-2 border-white" : ""
                            }`}
                        >
                            Followers
                        </Link>
                        <Link
                            href="/dashboard/following"
                            className={`block  text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
                                pathname === "/dashboard/following" ? "bg-[#03AED2] border-2 border-white" : ""
                            }`}
                        >
                            Following
                        </Link>
                        <Link
                            href="/dashboard/my-recipe"
                            className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
                                pathname === "/dashboard/my-recipe" ? "bg-[#03AED2] border-2 border-white" : ""
                            }`}
                        >
                            My Recipe
                        </Link>
                    </div>
                )
            }
            {user?.role === "admin" && (
                
                <div className={`${isOpen ===false ? "hidden":""} fixed mt-16 md:mt-24  top-0 left-0 flex flex-col   bg-[#1c9991] p-4 w-64 h-[90vh]`}>
                   <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}><CgCloseR className="text-white text-3xl"></CgCloseR></button>
                    <Link
                        href="/dashboard/all-user"
                        className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
                            pathname === "/dashboard/all-user" ? "bg-[#03AED2] border-2 border-white" : ""
                        }`}
                    >
                        All Users
                    </Link>
                   
                    <Link
                        href="/dashboard/create-admin"
                        className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
                            pathname === "/dashboard/create-admin" ? "bg-[#03AED2] border-2 border-white" : ""
                        }`}
                    >
                        Create Admin
                    </Link>
                   
                    <Link
                        href="/dashboard/get-all-admin"
                        className={`block text-center py-2 text-lg text-white hover:bg-[#03AED2] rounded-md  ${
                            pathname === "/dashboard/get-all-admin" ? "bg-[#03AED2] border-2 border-white" : ""
                        }`}
                    >
                        Get All Admin
                    </Link>
                </div>
            )}
        </div>
    );
};

export default DashboardSidebar;
