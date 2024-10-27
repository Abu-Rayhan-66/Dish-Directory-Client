/* eslint-disable @next/next/no-img-element */
"use client"

import { useUserWithPostedRecipeQuery } from "@/redux/features/user/userApi";
import Link from "next/link";

type TFollowing = {
    _id:string
    image:string
    name:string
   
  }


const AllFollowing = ({params}:{params:{followingId:string, profileId:string}}) => {
    const {data, isLoading, error} = useUserWithPostedRecipeQuery(params?.profileId)
    const userData = data?.data?.userData


    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>No user found</div>;
      }
    
      if (!userData  || userData?.follower?.length === 0) {
        return <div>No facilities found</div>;
      }

    return (
        <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 bg-base-300 p-6  mt-32'>
            { userData?.following?.length ===0 ? (
                <div>
                    No follower found
                </div>
            ):
               (
                userData.following.map((item:TFollowing) =>(
                    <Link key={item._id} href={`/profile/${item._id}`}>
                    <div  className="bg-white mb-6 p-4">
                       <img className="h-[20vh]" src={item.image} alt="" />
                        <h2 className="mt-2">{item.name}</h2>
                       </div>
                    </Link>
                ))
               )
            }
            
        </div>
    );
};

export default AllFollowing;