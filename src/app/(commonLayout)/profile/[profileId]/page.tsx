/* eslint-disable @next/next/no-img-element */
"use client";
import {
  useFollowUserMutation,
  useSingleUserQuery,
  useUnFollowUserMutation,
  useUserWithPostedRecipeQuery,
} from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { toast } from "sonner";
import UserProfileRecipeFeed from "../../components/UserProfileRecipeFeed/UserProfileRecipeFeed";


type TProfile = {
  _id:string
  image:string
  name:string
 
}

const Profile = ({ params }: { params: { profileId: string } }) => {

  const user = useAppSelector((state: RootState) => state.auth.user);
  const { data:onlyUserData,   } = useSingleUserQuery(user?.id);
  const id = params?.profileId
  const { data, isLoading, error } = useUserWithPostedRecipeQuery(params?.profileId);
  const [followUser] = useFollowUserMutation();
  const [unFollowUser] = useUnFollowUserMutation();
  const userData = data?.data?.userData;
  console.log("user recipe",data?.data)


  const handleFollowUser = () => {
    const toastId = toast.loading("following user");

    try {
      followUser(id);
      toast.success(`You started following ${userData.name} `, { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleUnFollowUser = () => {
    const toastId = toast.loading("UnFollowing user");

    try {
      unFollowUser(id);
      toast.success(`You started UnFollowing ${userData.name} `, { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No user found</div>;
  }

  return (
    <div className="mt-20 md:mt-32 mb-10 max-w-4xl mx-auto">
      <div className="bg-base-300">
        <img className="h-[50vh] p-6  w-full" src={userData?.image} alt="" />
        <div className=" md:flex items-center gap-4 px-6">
          <h2 className="text-2xl font-semibold ">{userData?.name}</h2>

          {user?.id === params?.profileId ? (
            <button className="text-2xl text-[#03AED2] hidden">hidden</button>
          ) : 
          onlyUserData?.data?.following?.includes(params.profileId) ? (
            <button onClick={handleUnFollowUser} className="text-2xl text-[#03AED2]">Unfollow</button>
          ) : (
            <button onClick={handleFollowUser} className="text-2xl text-[#03AED2] font-semibold">
              Follow
            </button>
          )}
        </div>
        <h2 className="mx-6">{userData?.bio}</h2>
      </div>
      <div className="mt-4 ">

        <div className="bg-base-300">
          <div className="flex justify-between p-6 mt-6 ">
            <h2 className=" mb-4 text-lg font-medium">followings</h2>
            <Link href={`/profile/${userData._id}/following/${userData._id}`}>
              See All
            </Link>
          </div>
          <div className="grid grid-cols-1  md:grid-cols-3 gap-3">
            {userData?.following?.length === 0 ? (
              <div className="px-6">No following found</div>
            ) : (
              userData?.following?.slice(0, 3).map((item:TProfile) => (
                <div key={item._id} className="px-6 mb-6 ">
                  <Link href={`/profile/${item._id}`}>
                    <div className=" bg-white mb-6 p-4">
                      <img className="h-[20vh]" src={item.image} alt="" />
                      <h2 className="mt-2">{item.name}</h2>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>


        <div className="bg-base-300">
          <div className="flex justify-between p-6 mt-6 ">
            <h2 className=" mb-4 text-lg font-medium">followers</h2>
            <Link href={`/profile/${userData._id}/follower/${userData._id}`}>
              See All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {userData?.followers?.length === 0 ? (
              <div className="px-6">No following found</div>
            ) : (
              userData?.followers?.slice(0, 3).map((item:TProfile) => (
                <div key={item._id} className="px-6 mb-6 ">
                  <Link href={`/profile/${item._id}`}>
                    <div className=" bg-white mb-6 p-4">
                      <img className="h-[20vh]" src={item.image} alt="" />
                      <h2 className="mt-2">{item.name}</h2>
                    </div>
                  </Link>
                </div>
              ))
            )}

            
          </div>
        </div>
        <UserProfileRecipeFeed params={params.profileId} ></UserProfileRecipeFeed>
      </div>
      
    </div>
  );
};

export default Profile;
