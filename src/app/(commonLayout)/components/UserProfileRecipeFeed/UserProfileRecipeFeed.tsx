/* eslint-disable @next/next/no-img-element */
"use client";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useDownVoteMutation,
  useUpVoteMutation,
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
import { useSingleUserQuery, useUserWithPostedRecipeQuery } from "@/redux/features/user/userApi";


type TUser = {
  _id:string
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
  user: TUser;
  createdAt: string;
  isPremium: boolean;
  upvote: string[]; 
  downvote: string[]; 
  comments: TComment[];
  rating: TRating[];
};



const UserProfileRecipeFeed = ({params}:{params:string}) => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { data:onlyUserData,   } = useSingleUserQuery(user?.id);
  const { data, isLoading, error, refetch } = useUserWithPostedRecipeQuery(params);
  const userProfile = data?.data?.userData
  console.log("user profile recipe", data?.data)
  const [upVote] = useUpVoteMutation();
  const [downVote] = useDownVoteMutation();
  const [comment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const handleUpVote = (id: string) => {
    const toastId = toast.loading("Adding Upvote");
    try {
      upVote(id);
      toast.success("Upvote added", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleDownVote = (id: string) => {
    const toastId = toast.loading("Adding Downvote");
    try {
      downVote(id);
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
      toast.success("Comment added", { id: toastId });
      refetch()
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleDeleteComment = (recipeId: string, commentId: string) => {
    const toastId = toast.loading("Deleting comment");
    try {
      deleteComment({ recipeId, id: commentId });
      toast.success("Comment deleted", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No user found</div>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <div>No facilities found</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data?.data?.userPostedRecipeData.map((item:TRecipe) => (
        <div
          key={item._id}
          className="mt-10 max-w-4xl h-[55vh] md:h-[70vh] mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-6"
        >
          
         <div className="flex justify-between ">
         <div className="flex items-center p-4">
            
            <Link href={`/profile/${userProfile?._id}`}>
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={userProfile?.image}
              alt="User"
            />
            </Link>

           
            <div className="ml-3">
              <Link href={`/profile/${userProfile?._id}`}>
                <p className="text-gray-900 font-semibold">{userProfile?.name}</p>
              </Link>
              <RecipePostedTime postTime={item.createdAt}></RecipePostedTime>
            </div>
            
          </div>
          <div>
          <p className="flex justify-end mr-6 mt-4">{item?.isPremium === false ? "Free":"Premium"}</p>
          </div>
         </div>
          
          <img
            className="w-full h-2/4 md:h-2/3 object-cover"
            src={item.image}
            alt={item.title}
          />

          <div className="p-2">
            <h2 dangerouslySetInnerHTML={{ __html: item.title }} />

            <div className="flex items-center ">
              <div>
                {item.rating && (
                  <ReactStars
                    count={5}
                    value={
                      item.rating.length
                        ? item.rating.reduce(
                            (sum:number, ratingObj:TRating) => sum + ratingObj.rating,
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
                  onClick={() => handleUpVote(item._id)}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <BiSolidLike
                    className={`mr-1 text-2xl ${
                      item.upvote.includes(user?.id)
                        ? "text-red-500"
                        : "text-black"
                    }`}
                  />{" "}
                  {item?.upvote?.length}
                </button>
                <button
                  onClick={() => handleDownVote(item._id)}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <BiSolidDislike
                    className={`mr-1 text-2xl ${
                      item.downvote.includes(user?.id)
                        ? "text-red-500"
                        : "text-black"
                    }`}
                  />{" "}
                  {item?.downvote?.length}
                </button>
              </div>
              <div className="flex items-center text-gray-600 hover:text-green-600">
                <button className="btn " onClick={() => openModal(`modal_${item._id}`)}>
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
                      <button onClick={() => closeModal(`modal_${item._id}`)}>X</button>
                    </div>

                    <div className="py-4 flex-grow overflow-y-auto">
                      {item?.comments?.map((comment) => (
                        <div className="" key={comment._id}>
                          <p className=" ml-12">{comment.name}</p>
                          <div className="flex gap-2 items-start">
                            <img
                              className="size-10 rounded-full"
                              src={comment.profilePicture}
                              alt=""
                            />
                            <p className="bg-base-300 p-2 mb-4">
                              {comment.comment}
                            </p>
                          </div>
                          {user?.id === comment.id && (
                            <div className="mb-3 ml-12">
                              <button className="">Edit</button>
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
      ))}
    </div>
  );
};

export default UserProfileRecipeFeed;
