"use client";
import { logout } from "@/redux/features/auth/authSlice";
import { useChangePasswordMutation, useSingleUserQuery } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TChangePassword = {
  email: string;
  password: string;
  newPassword: string;
};

const ChangePassword = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { data  } = useSingleUserQuery(user?.id);
  const userData = data?.data
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [ChangePassword] = useChangePasswordMutation();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TChangePassword>();

  const onSubmit: SubmitHandler<TChangePassword> = (data) => {
    const toastId = toast.loading("Password Changing...");
    try {
      const formData = {
        email: data.email,
        password: data.password,
        newPassword: data.newPassword,
      };

      if (userData?.email !== data.email) {
        toast.error("Enter you email correctly", { id: toastId });
        return;
      }

      ChangePassword(formData);

      toast.success("Password changed successfully", { id: toastId });
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { id: toastId });
    }
  };

  

  return (
    <div className="hero bg-white min-h-screen mt-6">
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
                placeholder=" Email"
                defaultValue={userData?.email}
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
              />
              <div className="h-2">
                {errors.email && <span>Email is required</span>}
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Current Password</span>
              </label>
              <input
                {...register("password", { required: true })}
                type="text"
                placeholder="Current Password"
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
              />
              <div className="h-2">
                {errors.password && <span>Password is required</span>}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input
                {...register("newPassword", { required: true })}
                type="text"
                placeholder=" New password"
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
              />
              <div className="h-2">
                {errors.newPassword && (
                  <span className="text-sm">New Password is required</span>
                )}
              </div>
            </div>
            <div className="form-control ">
              <button
                type="submit"
                className="py-1 px-4  text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium"
              >
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
