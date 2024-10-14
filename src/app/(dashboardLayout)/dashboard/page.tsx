"use client";

import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react';



const UserDashboard = () => {
  const user = useAppSelector((state: RootState) => state.auth.userData);
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
    <div className=' ml-4 md:ml-72 '>
      <h2>this is main page</h2>
      
    </div>
  );
};

export default UserDashboard;
