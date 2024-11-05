/* eslint-disable @next/next/no-img-element */
"use client";
import {
  useRatingMutation,
  useSingleRecipeQuery,
} from "@/redux/features/recipe/recipeApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { IoMdClock } from "react-icons/io";
import ReactStars from "react-stars";
import { toast } from "sonner";

type TRating = {
  _id: string;
  id: string;
  rating: number;
};

type TComment = {
  _id:string
  id:string
  name:string
  profilePicture:string
  comment:string
}

const RecipeDetails = ({ params }: { params: { recipeId: string } }) => {
  const recipeId = params?.recipeId;
  const { data, isLoading, error } = useSingleRecipeQuery(recipeId);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const recipe = data?.data;
  const [addRating] = useRatingMutation();
  console.log("from recipe details", recipe?.rating);

  const filterRating = recipe?.rating?.find(
    (item: TRating) => item.id === user?.id
  );
  console.log("filter rating", filterRating);

  const handleRating = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = formData.get("ratingCount") as string;
    const rating = {
      rating: Number(data),
    };
    console.log("rating number", rating);

    const toastId = toast.loading("Adding your rating...");
    try {
      await addRating({ rating, id: recipeId });
      toast.success("Rating added successfully", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add rating", { id: toastId });
    }
  };

  const ingredientsArray = recipe?.ingredient
    ?.replace(/<\/?[^>]+(>|$)/g, "")
    .split(",")
    .map((ingredient: string) => ingredient.trim());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No recipe found</div>;
  }

  return (
    <div className="mt-32 max-w-3xl mx-auto ">
      <h2
        className="bg-base-300 p-4"
        dangerouslySetInnerHTML={{ __html: recipe?.title }}
      />
      <div className="mt-6 bg-base-300 p-6">
        <img className="w-full rounded-md" src={recipe?.image} alt="" />
        <div className="flex gap-4 mt-6">
          <div className="flex items-center gap-1 ">
            <BiSolidLike className="text-2xl"></BiSolidLike>
            <h2>{recipe?.upvote?.length}</h2>
          </div>

          <div className="flex items-center gap-1">
            <BiSolidDislike className="text-2xl"></BiSolidDislike>
            <h2>{recipe?.downvote?.length}</h2>
          </div>

          <div className="flex items-center gap-1">
            <IoMdClock className="text-2xl"></IoMdClock>
            <h2>{recipe?.cookingTime} mins</h2>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-base-300 p-6">
        <h2 className="font-bold mb-2">Ingredients:</h2>
        <ul className="list-disc pl-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {ingredientsArray?.map((ingredient: string, index: number) => (
            <li
              className="list-none text-white bg-[#03AED2] p-4 rounded-md text-center"
              key={index}
              dangerouslySetInnerHTML={{ __html: ingredient }}
            />
          ))}
        </ul>
      </div>

      <div className="mt-6 p-6 mb-6 bg-base-300">
        <h2 className="font-bold">Your Rating</h2>
        {filterRating?.id === user?.id ? (
          <ReactStars
            count={5}
            value={filterRating?.rating}
            edit={false}
            size={20}
            color2={"#03AED2"}
          />
        ) : (
          "You didn't rate yet"
        )}
        <form onSubmit={handleRating}>
          <label className="mr-2" htmlFor="ratingCount">
            Select your rating
          </label>

          <select
            defaultValue={filterRating?.rating}
            name="ratingCount"
            id="ratingCount"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button
            className="m-4 py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium"
            type="submit"
          >
            {filterRating?.id === user?.id ? "Edit rating" : "Add rating"}
          </button>
        </form>
      </div>

      <div className="mt-6 p-6 mb-6 bg-base-300 overflow-y-auto max-h-96">
        <h2 className="font-bold mb-6">All comments</h2>
        {recipe?.comments.map((item:TComment) => (
          <div key={item._id}>
            <p className=" ml-12">{item?.name}</p>
            <div className="flex gap-2 items-start">
              <img
                className="size-10 rounded-full"
                src={item?.profilePicture}
                alt=""
              />
              <p className="bg-white p-2 mb-4">{item?.comment}</p>
            </div>
          </div>
        ))}
      </div>
          <div className="mt-6 p-6 mb-6 bg-base-300">
          <h2 className="font-bold mb-6">Description</h2>
          <h2 dangerouslySetInnerHTML={{ __html: recipe.description }} />
          </div>

    </div>
  );
};

export default RecipeDetails;
