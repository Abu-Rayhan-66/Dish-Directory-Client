"use client";
import {
  useSingleRecipeQuery,
  useUpdateRecipeMutation,
} from "@/redux/features/recipe/recipeApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useUserWithPostedRecipeQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export type Inputs = {
  title: string;
  image: string;
  type: string;
};

const UpdateRecipe = ({ params }: { params: { recipeId: string } }) => {
  const recipeId = params.recipeId;
  const [content, setContent] = useState("");
  console.log("content", content);
  const editor = useRef(null);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [UpdateRecipe] = useUpdateRecipeMutation();
  const {  refetch } = useUserWithPostedRecipeQuery(user?.id);
  const { data, isLoading, error } = useSingleRecipeQuery(recipeId);
  const recipe = data?.data;
  console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const toastId = toast.loading("Updating Recipe");

    console.log(data);

    try {
      const formData = {
        title: content,
        image: data.image,
        isPremium: data.type === "true" ? true : false,
      };

      console.log(formData);
      UpdateRecipe({ formData, recipeId });
      refetch()
      toast.success("Recipe updated successfully", { id: toastId });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
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
      <div className="hero-content flex-col">
        <div className="card bg-base-100 w-screen max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <JoditEditor
                ref={editor}
                value={recipe.title}
                onChange={(newContent) => setContent(newContent)}
              />
              <div className="h-2">
                {errors.title && <span>Title is required</span>}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                defaultValue={recipe.image}
                {...register("image", { required: true })}
                type="text"
                placeholder=" Image"
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none border-[#03AED2]"
              />
              <div className="h-2">
                {errors.image && (
                  <span className="text-sm">Image is required</span>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Select a type</span>
              </label>
              <select
                defaultValue={recipe.isPremium}
                {...register("type", { required: true })}
                id=""
              >
                <option value="false">Free</option>
                <option value="true">Premium</option>
              </select>
              <div className="h-2">
                {errors.type && <span className="text-sm">Select a type</span>}
              </div>
            </div>
            <div className="form-control">
              <button
                type="submit"
                className="py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipe;
