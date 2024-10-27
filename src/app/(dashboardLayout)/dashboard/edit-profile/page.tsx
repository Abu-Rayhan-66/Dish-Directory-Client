/* eslint-disable @next/next/no-img-element */
"use client"

import { useSingleUserQuery, useUpdateUserMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs  ={
    name:string
    image:string
    bio:string
}


const EditProfile = () => {
  
  const user = useAppSelector((state: RootState) => state.auth.user);
  const id = user?.id
  const { data, isLoading, error } = useSingleUserQuery(id);
  const userData = data?.data
  const [editProfile] = useUpdateUserMutation();
  
  
  if(!userData){
    
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
   const toastId =  toast.loading("Updating profile...");
    try {
      const result =  await editProfile({data, id})
      const res = result?.data?.data
      console.log(res)

      
     

    
      toast.success("profile updated successfully",{id:toastId});
     
    } catch (error) {
        console.log(error)
      toast.error("something went wrong", {id:toastId});
    }
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No user found</div>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <div>No facilities found</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <div className="flex justify-center">
        <div className="relative">
          <img
            className="w-full h-72  object-cover border-2 border-gray-200"
            src={userData?.image}
            alt="Profile Image"
          />
         
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}className="mt-6 space-y-4">
      <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
              defaultValue={userData?.name}
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
              />
              <div className="h-2">
                {errors.name && <span>Name is required</span>}
              </div>
            </div>

      <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
              defaultValue={userData?.image}
                {...register("image", { required: true })}
                type="url"
                placeholder="image"
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
              />
              <div className="h-2">
                {errors.image && <span>Image is required</span>}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
              defaultValue={userData?.bio}
              rows={4}
                {...register("bio", { required: true })}
                placeholder="Bio"
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
              />
              <div className="h-2">
                {errors.bio && <span>Bio is required</span>}
              </div>
            </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
