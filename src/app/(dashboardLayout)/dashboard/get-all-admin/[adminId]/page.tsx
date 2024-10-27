"use client"

import { useSingleAdminQuery, useUpdateAdminMutation } from "@/redux/features/user/userApi";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
    name: string;
    email: string;
    password: string;
    image: string;
  };


const UpdateAdmin = ({params}:{params:{adminId:string}} ) => {

    const { data, isLoading, error } = useSingleAdminQuery(params.adminId);
    const adminData = data?.data
    const [updateAdmin] = useUpdateAdminMutation()
    const router = useRouter()
    console.log(data)

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>();
      
      const onSubmit: SubmitHandler<Inputs> = (data) => {
        const toastId = toast.loading("Creating User");
        try {
          const formData = {
            name:data.name ,
            email:data.email ,
            password:data.password,
            image:data.image
           
    
            };
          console.log(formData);
          updateAdmin({data:formData, id:adminData._id});
          toast.success("Admin updated successfully", { id: toastId });
          router.push("/dashboard/get-all-admin");
        } catch (err) {
            console.log(err)
          toast.error("Something went Wrong", { id: toastId });
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
        <div className="hero bg-white min-h-screen mt-6">
      <div className="hero-content flex-col ">
        <div className="card bg-base-100 w-screen max-w-sm shrink-0 shadow-2xl">

          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder=" Name"
                defaultValue={adminData.name}
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
              />
              <div className="h-2">
                {errors.name && <span>Name is required</span>}
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder=" Email"
                defaultValue={adminData.email}
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
              />
              <div className="h-2">
                {errors.email && <span>Email is required</span>}
              </div>
            </div>
           
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                {...register("image", { required: true })}
                type="text"
                placeholder=" Image"
                defaultValue={adminData.image}
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
              />
              <div className="h-2">
                {errors.image && (
                  <span className="text-sm">Image is required</span>
                )}
              </div>
              
            </div>
            <div className="form-control ">
              <button type="submit" className="py-1 px-4  text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default UpdateAdmin;