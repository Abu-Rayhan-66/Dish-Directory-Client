/* eslint-disable @next/next/no-img-element */
"use client";
import {
  useAddCommentMutation,
  useAllRecipeQuery,
  useDeleteCommentMutation,
  useDownVoteMutation,
  useEditCommentMutation,
  useUpVoteMutation,
  useUpdateRecipeMutation,
} from "@/redux/features/recipe/recipeApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { FaCommentDots } from "react-icons/fa";
import { toast } from "sonner";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import ReactStars from "react-stars";
import RecipePostedTime from "@/app/(dashboardLayout)/components/RecipePostedTime/RecipePostedTime";
import { useSingleUserQuery } from "@/redux/features/user/userApi";
import { useState } from "react";
import { IoMdClock } from "react-icons/io";

type TUser = {
  _id: string;
  id: string;
  name: string;
  image: string;
};

type TComment = {
  _id: string;
  id: string;
  name: string;
  profilePicture: string;
  comment: string;
};

type TRating = {
  id: string;
  rating: number;
};

type TRecipe = {
  _id: string;
  title: string;
  image: string;
  cookingTime:string;
  user: TUser;
  createdAt: string;
  isPremium: boolean;
  upvote: string[];
  downvote: string[];
  comments: TComment[];
  rating: TRating[];
};

const RecipeFeed = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  console.log("search",user?.id)
  
  const { data, isLoading, refetch } = useAllRecipeQuery({
    searchTerm,
    minPrice,
    maxPrice,
    sortBy: "upvoteCount",
    sortOrder,
    id:user?.id
  });

  const { data: onlyUserData } = useSingleUserQuery(user?.id, { skip: !user });
  const [upVote] = useUpVoteMutation();
  const [downVote] = useDownVoteMutation();
  const [comment] = useAddCommentMutation();
  const [editComment] = useEditCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [updateRecipe] = useUpdateRecipeMutation()

 

  const handleUpVote = (id: string, likeCount:number) => {

    const upvoteCount = likeCount + 1
    const formData = {
      upvoteCount:upvoteCount
    }

  
    const toastId = toast.loading("Adding Upvote");
    try {
      upVote(id);
      updateRecipe({formData, id})
      refetch();
      toast.success("Upvote added", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleDownVote = (id: string, likeCount:number) => {

    const upvoteCount = likeCount - 1
    const formData = {
      upvoteCount:upvoteCount
    }

    const toastId = toast.loading("Adding Downvote");
    try {
      downVote(id);
      updateRecipe({formData, id})
      refetch();
      toast.success("Downvote added", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleComment = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const commentInput = e.currentTarget.comment.value;

    const data = {
      name: onlyUserData?.data?.name,
      image: onlyUserData?.data?.image,
      comment: commentInput,
    };

    const toastId = toast.loading("Adding comment");
    try {
      comment({ data, id });
      refetch();
      toast.success("Comment added", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleEditComment = (
    e: React.FormEvent<HTMLFormElement>,
    recipeId: string,
    id: string
  ) => {
    e.preventDefault();
    const commentInput = e.currentTarget.comment.value;

    const data = {
      comment: commentInput,
    };

    const toastId = toast.loading("Editing comment");
    try {
      editComment({ data, recipeId: recipeId, commentId: id });
      refetch();
      toast.success("Comment edited", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleDeleteComment = (recipeId: string, commentId: string) => {
    const toastId = toast.loading("Deleting comment");
    try {
      deleteComment({ recipeId, id: commentId });
      refetch();
      toast.success("Comment deleted", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value ? Number(e.target.value) : "");
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value ? Number(e.target.value) : "");
  };

  const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    } else {
      console.error("Modal element not found");
    }
  };

  const closeModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.close();
    } else {
      console.error("Modal element not found");
    }
  };

  const openEditCommentModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    } else {
      console.error("Modal element not found");
    }
  };

  const closeEditCommentModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.close();
    } else {
      console.error("Modal element not found");
    }
  };

 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>No user found</div>;
  // }

  // if (!data || !data.data || data.data.length === 0) {
  //   return <div>No facilities found</div>;
  // }

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="min-h-screen max-w-6xl md:flex gap-4 mx-auto mt-10">
      <div className="bg-white  mb-6 max-w-2xl  sticky top-16 md:top-36 h-36">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by recipe name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="py-1 w-full mb-3 rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none border-[#03AED2]"
          />
          <select
            name="sortSelect"
            value={sortOrder}
            onChange={handleSortChange}
            className="py-1 w-full mb-3 rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none border-[#03AED2]"
          >
            <option value="" disabled selected>
              Sort by created time
            </option>
            <option value="asc">Most popular</option>
            <option value="desc">Least popular</option>
          </select>
        </div>
        <h2 className="mb-2 bg-[#03AED2] py-1 px-2 text-white rounded-md">
          Filter by cooking time
        </h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="number"
            placeholder="Min Cooking Time"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none border-[#03AED2]"
          />
          <input
            type="number"
            placeholder="Max Cooking Time"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none border-[#03AED2]"
          />
        </div>
      </div>

      <div>
        { !data?.data ? (
          <div>No post found</div>
        ):(
          data?.data?.map((item: TRecipe) => (
            <div
              key={item._id}
              className="mt-10 max-w-4xl h-[55vh] md:h-[70vh] mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-6"
            >
              <div className="flex justify-between ">
                <div className="flex items-center p-4">
                  <Link href={`/profile/${item.user._id}`}>
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={item.user?.image}
                      alt="User"
                    />
                  </Link>
  
                  <div className="ml-3">
                    <Link href={`/profile/${item.user._id}`}>
                      <p className="text-gray-900 font-semibold">
                        {item.user.name}
                      </p>
                    </Link>
                    <RecipePostedTime
                      postTime={item.createdAt}
                    ></RecipePostedTime>
                  </div>
                </div>
                <div>
                  <p className="flex justify-end mr-6 mt-4">
                    {item?.isPremium === false ? "Free" : "Premium"}
                  </p>
                </div>
              </div>
  
              <img
                className="w-full h-2/4 md:h-2/3 object-cover"
                src={item.image}
                alt={item.title}
              />
  
              <div className="p-2">
                <h2 dangerouslySetInnerHTML={{ __html: item.title }} />
  
                <div className="flex items-center  z-[-1]">
                  <div>
                    {item.rating && (
                      <ReactStars
                        count={5}
                        value={
                          item.rating.length
                            ? item.rating.reduce(
                                (sum: number, ratingObj: TRating) =>
                                  sum + ratingObj.rating,
                                0
                              ) / item.rating.length
                            : 0
                        }
                        edit={false}
                        size={20}
                        color2={"#03AED2"}
                      />
                    )}
                  </div>
                </div>
  
                <div className="flex justify-between items-center  ">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleUpVote(item._id, item?.upvote?.length)}
                      className="flex items-center text-gray-600 hover:text-blue-600"
                    >
                      <BiSolidLike
                         className={`mr-1 text-2xl ${
                          user?.id && item.upvote.includes(user.id) ? "text-[#03AED2]" : "text-black"
                        }`}
                      />{" "}
                      {item?.upvote?.length}
                    </button>
                    <button
                      onClick={() => handleDownVote(item._id, item?.downvote?.length)}
                      className="flex items-center text-gray-600 hover:text-blue-600"
                    >
                      <BiSolidDislike
                        className={`mr-1 text-2xl ${
                          user?.id && item.downvote.includes(user.id) ? "text-[#03AED2]" : "text-black"
                        }`}
                      />{" "}
                      {item?.downvote?.length}
                    </button>
                  
                    <div className="flex gap-1">
                    <IoMdClock className="text-2xl"></IoMdClock>
                    <h2>{item?.cookingTime} mins</h2>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 hover:text-green-600">
                    <Link href={`/recipe-details/${item._id}`}>
                      <button className="btn mr-2">View Details</button>
                    </Link>
                    <button
                      className="btn "
                      onClick={() => openModal(`modal_${item._id}`)}
                    >
                      <FaCommentDots className="mr-1" />
                      {item.comments.length} Comment
                    </button>
  
                    <dialog
                      id={`modal_${item._id}`}
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box flex flex-col">
                        <div className="flex justify-between">
                          <h2>{item.user.name}s Post</h2>
                          <button className="text-2xl" onClick={() => closeModal(`modal_${item._id}`)}>
                            X
                          </button>
                        </div>
  
                        <div className="py-4 flex-grow overflow-y-auto">
                          {item?.comments?.map((comment) => (
                            <div className="" key={comment?._id}>
                              <p className=" ml-12">{comment?.name}</p>
                              <div className="flex gap-2 items-start">
                                <img
                                  className="size-10 rounded-full"
                                  src={comment?.profilePicture}
                                  alt=""
                                />
                                <p className="bg-base-300 p-2 mb-4">
                                  {comment?.comment}
                                </p>
                              </div>
                              {user?.id === comment?.id && (
                                <div className="mb-3 ml-12">
                                  <button
                                    className=""
                                    onClick={() =>
                                      openEditCommentModal(
                                        `modal_${comment?._id}`
                                      )
                                    }
                                  >
                                    Edit
                                  </button>
                                  <dialog
                                    id={`modal_${comment?._id}`}
                                    className="modal modal-bottom sm:modal-middle"
                                  >
                                    <div className="modal-box">
                                    <div className="flex justify-end">
                                    <button
                                        className=" text-2xl  mb-4   text-right"
                                          onClick={() =>
                                            closeEditCommentModal(
                                              `modal_${comment._id}`
                                            )
                                          }
                                        >
                                          X
                                        </button>
                                    </div>
                                      <form
                                        onSubmit={(e) =>
                                          handleEditComment(
                                            e,
                                            item._id,
                                            comment?._id
                                          )
                                        }
                                        method="dialog"
                                        className="flex"
                                      >
                                       
                                        <input
                                          type="text"
                                          defaultValue={comment?.comment}
                                          placeholder="Add a comment..."
                                          className="input input-bordered w-full"
                                          name="comment"
                                        />
                                        <button
                                          onClick={() =>
                                            closeEditCommentModal(
                                              `modal_${comment._id}`
                                            )
                                          }
                                          type="submit"
                                          className="btn ml-2"
                                        >
                                          Submit
                                        </button>
                                      </form>
                                    </div>
                                  </dialog>
                                  <button
                                    onClick={() =>
                                      handleDeleteComment(item._id, comment._id)
                                    }
                                    className="ml-3"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
  
                        <div className="mt-auto">
                          <form
                            onSubmit={(e) => handleComment(e, item._id)}
                            method="dialog"
                            className="flex"
                          >
                            <input
                              type="text"
                              placeholder="Add a comment..."
                              className="input input-bordered w-full"
                              name="comment"
                            />
                            <button type="submit" className="btn ml-2">
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
            </div>
          ))
        )

        }
        
      </div>
    </div>
  );
};

export default RecipeFeed;
