/* eslint-disable @next/next/no-img-element */
"use client";

import { useSingleUserQuery } from '@/redux/features/user/userApi';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react';



const UserDashboard = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { data  } = useSingleUserQuery(user?.id);
  const userData = data?.data
  console.log(user)
  
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {

    if (user) {
      setIsLoading(false);
    }
  }, [user]);


  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className=' ml-4 md:ml-72 mt-10 md:mt-60 -z-[10]'>
      {
        user?.role === "admin" &&(
          <div className=" relative rounded-md  md:flex md:justify-between md:items-center mx-auto  break-words h-[50vh] max-w-3xl bg-gradient-to-tr from-[#083f53] to-[#1c9991]">
          <div className="">
          <h2 className="text-white font-medium text-xl ml-4">Welcome back, {userData?.name}</h2>
         
          </div>
          <div>
            <img className="h-full w-1/2 absolute bottom-0 right-0" src={userData?.image} alt="" />
          </div>
        </div>
        )

      
      }
      {
        user?.role === "user" && (
          <div className=" relative rounded-md  md:flex md:justify-between md:items-center mx-auto  break-words h-[50vh] max-w-3xl bg-gradient-to-tr from-[#083f53] to-[#1c9991]">
          <div className="">
          <h2 className="text-white font-medium text-xl ml-4">Welcome back, {userData?.name}</h2>
          <h4 className="text-white ml-4 mt-4">Followers: {userData?.followers.length}</h4>
          <h4 className="text-white ml-4 mt-4">Followers: {userData?.following.length}</h4>
          </div>
          <div>
            <img className="h-full w-1/2 absolute bottom-0 right-0" src={userData?.image} alt="" />
          </div>
        </div>
        )
      }
      
    </div>
  );
};

export default UserDashboard;
