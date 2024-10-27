"use client";
import { useCreateRecipeMutation } from "@/redux/features/recipe/recipeApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import dynamic from "next/dynamic"; // For dynamic import of JoditEditor
import { useRef, useState } from "react";

// Dynamically import JoditEditor only on client-side
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

export type Inputs = {
  title: string;
  image: string;
  cookingTime:number;
  type: string;
};

const CreateRecipe = () => {
  const [content, setContent] = useState('');
  const editor = useRef(null);
  const [createRecipe] = useCreateRecipeMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const toastId = toast.loading("Creating Recipe");

  console.log(data)

    try {
      const formData = {
        title: content,  
        image: data.image,
        cookingTime: Number(data.cookingTime),
        isPremium: data.type === "true" ? true: false
       
      };

      // console.log(data)

      console.log(formData);
      createRecipe(formData);
      toast.success("Recipe created successfully", { id: toastId });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

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
                value={content}
                onChange={newContent => setContent(newContent)}
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
                <span className="label-text">Cooking Time</span>
              </label>
              <input
                {...register("cookingTime", { required: true })}
                type="text"
                placeholder=" Cooking Time"
                className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none border-[#03AED2]"
              />
              <div className="h-2">
                {errors.cookingTime && (
                  <span className="text-sm">Cooking Time is required</span>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Select a type</span>
              </label>
             <select   {...register("type", { required: true })} id="">
              <option  value="false">Free</option>
              <option value="true">Premium</option>
             </select>
              <div className="h-2">
                {errors.type && (
                  <span className="text-sm">Select a type</span>
                )}
              </div>
            </div>
            <div className="form-control">
              <button type="submit" className="py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
