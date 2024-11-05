"use client"

import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";

import { toast } from "sonner";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginUserMutation();

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
   const toastId =  toast.loading("Logging in...");
    try {


      
      const res = await login(data).unwrap();
      const user = verifyToken(res.token);
      dispatch(setUser({ user: user, token: res.token}));
      Cookies.set("access_token", res.token, { expires: 30 }); 
      toast.success("logged in",{id:toastId});
      router.push("/");
    } catch (error) {
        console.log(error)
      toast.error("You Have no right to login", {id:toastId});
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
              />
              <div className="h-2">
                {errors.password && <span>Password is required</span>}
              </div>
              <label className="label">
                <h4 className="text-lg ">
                  New to this website?
                  <Link href="/register" className="text-[#03AED2] ">
                    Create an account
                  </Link>
                </h4>
              </label>
            </div>
            <div className="form-control ">
              <Link className="mb-4" href={"/forgot-password"}>
              <button>Forgot password</button>
              </Link>
              <button type="submit" className="py-1 px-4  text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;