"use client"
import { useCreateAdminMutation } from "@/redux/features/user/userApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
    name: string;
    email: string;
    password: string;
    image: string;
  };

const CreateAdmin = () => {

    const [createAdmin] = useCreateAdminMutation();

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
          createAdmin(formData);
          toast.success("User created successfully", { id: toastId });
        } catch (err) {
            console.log(err)
          toast.error("Something went Wrong", { id: toastId });
        }
      };

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
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
              />
              <div className="h-2">
                {errors.email && <span>Email is required</span>}
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder=" Password"
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
              />
              <div className="h-2">
                {errors.password && <span>Password is required</span>}
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
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default CreateAdmin;