"use client";
import { useResetPasswordMutation } from "@/redux/features/user/userApi";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  email: string;
  newPassword: string;
};

const ResetPassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); 
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const toastId = toast.loading("Resetting Password...");
    if (!token) {
      toast.error("Token is missing", { id: toastId });
      return;
    }

    try {
   
       await resetPassword({
        data, 
        yourToken: `Bearer ${token}`,
      }) 

      toast.success("Password reset successfully", { id: toastId });
      router.push("/login");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      
      toast.error( "Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen mt-6">
      <div className="hero-content flex-col">
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
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none border-[#03AED2]"
              />
              <div className="h-2">
                {errors.email && <span>Email is required</span>}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input
                {...register("newPassword", { required: true })}
                type="password"
                placeholder="New Password"
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none border-[#03AED2]"
              />
              <div className="h-2">
                {errors.newPassword && <span>New password is required</span>}
              </div>
            </div>

            <div className="form-control">
              <button
                type="submit"
                className="py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
