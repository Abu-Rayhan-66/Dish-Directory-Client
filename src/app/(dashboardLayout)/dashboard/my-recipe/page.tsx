/* eslint-disable @next/next/no-img-element */
"use client";
import { useDeleteRecipeMutation } from "@/redux/features/recipe/recipeApi";
import { useUserPostedRecipeQuery} from "@/redux/features/user/userApi";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export type TRecipe = {
  _id: string;
  title: string;
  image: string;
  upvote: string[];
  downvote: string[];
  cookingTime:number;
  isPublished: boolean;
  isPremium: boolean;
};

const MyRecipe = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const itemsPerPage = 10;

  const { data, isLoading, error, refetch } = useUserPostedRecipeQuery({
    searchTerm,
    minPrice,
    maxPrice,
    page: currentPage,
    limit: itemsPerPage,
    sortBy: "createdAt",
    sortOrder,
  });

 
  const [deleteRecipe] = useDeleteRecipeMutation();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
    setCurrentPage(1);
  };

  // Removed the duplicate declaration here
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value ? Number(e.target.value) : "");
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value ? Number(e.target.value) : "");
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteRecipe = (recipeId: string) => {
    const toastId = toast.loading("Deleting Recipe...");
    try {
      deleteRecipe(recipeId);
      refetch();
      toast.success("Recipe Deleted", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

 

  return (
    <div className=" lg:flex ml-4 md:ml-72 -z-10 mt-32">
      <div className="flex-[2]  mb-6 max-w-2xl mx-auto ">
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
            <option value="asc">Oldest to newest</option>
            <option value="desc">Newest to oldest</option>
          </select>
        </div>
        <h2 className="mb-2 bg-[#03AED2] py-1 px-2 text-white rounded-md">
          Filter by cooking time
        </h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="number"
            placeholder="Min Time"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none border-[#03AED2]"
          />
          <input
            type="number"
            placeholder="Max Time"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none border-[#03AED2]"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="py-1 px-4 bg-[#03AED2] text-white rounded-md mr-2 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="py-1 px-2">Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={data && data.data.length < 10}
            className="py-1 px-4 bg-[#03AED2] text-white rounded-md ml-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="overflow-x-auto flex flex-col flex-[6]">
        {isLoading ? (
      <div>Loading...</div>
    ):  error ? (
          <div>data not found</div>
        ) : !data || data.data.length === 0 ? (
          <div>No recipe found</div>
        ):
       ( <table className="table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Image</th>
              <th>Name</th>
              <th>UP Vote</th>
              <th>Down Vote</th>
              <th>Cooking Time</th>
              <th>Status</th>
              <th>Recipe Type</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            
            {data?.data?.map(
              (item: TRecipe, index: number) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h1 dangerouslySetInnerHTML={{ __html: item.title }} />
                  </td>
                  <td>{item.upvote.length}</td>
                  <td>{item.downvote.length}</td>
                  <td>{item.cookingTime} min </td>
                  <td>
                    {item.isPublished ? (
                      <p className="text-green-500">PUBLISHED</p>
                    ) : (
                      <p className="text-red-500">PENDING</p>
                    )}
                  </td>
                  <td>{item.isPremium ? "Premium" : "Free"}</td>
                  <th>
                    <Link href={`/dashboard/my-recipe/${item._id}`}>
                      <button className="py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium">
                        Update
                      </button>
                    </Link>
                  </th>
                  <th>
                    <button
                      onClick={() => handleDeleteRecipe(item._id)}
                      className="py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              )
            )}
          </tbody>
        </table>)}
      </div>
    </div>
  );
};

export default MyRecipe;
