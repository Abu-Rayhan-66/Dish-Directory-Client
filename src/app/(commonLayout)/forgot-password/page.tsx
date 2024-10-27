"use client"
import { useForgotPasswordMutation } from "@/redux/features/user/userApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


type Inputs = {
    email:string
}

const ForgotPassword = () => {

   const [ForgotPassword] = useForgotPasswordMutation()




    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>();
    
      const onSubmit: SubmitHandler<Inputs> = async (data) => {
       const toastId =  toast.loading("sending email...");
        try {
            
            ForgotPassword(data)
            toast.success("Reset ui link sent to your email", {id:toastId})

        } catch (error) {
            console.log(error)
          toast.error("something went wrong", {id:toastId});
        }
      };

    return (
        <div className="hero bg-base-200 min-h-screen mt-6">
      <div className="hero-content flex-col ">
        <div className="card bg-base-100 w-screen max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
              />
              <div className="h-2">
                {errors.email && <span>Email is required</span>}
              </div>
            </div>
            
            <div className="form-control ">
              <button type="submit" className="py-1 px-4  text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium">
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default ForgotPassword;