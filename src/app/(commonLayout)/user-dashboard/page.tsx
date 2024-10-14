"use client";

import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react';

const Page = () => {
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
    <div className='mt-24'>
      {user?.role === 'user' ? (
        <h2>This is the user dashboard page</h2>
      ) : (
        <h2>This is the admin dashboard page</h2>
      )}
    </div>
  );
};

export default Page;
