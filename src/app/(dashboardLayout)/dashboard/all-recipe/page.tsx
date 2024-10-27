/* eslint-disable @next/next/no-img-element */
"use client"
import {   useAllRecipeForAdminQuery, useDeleteRecipeMutation, usePublishRecipeMutation, useUnpublishRecipeMutation } from "@/redux/features/recipe/recipeApi";
import { toast } from "sonner";
import { TRecipe } from "../my-recipe/page";


const AllRecipe = () => {

    const { data, isLoading, error } = useAllRecipeForAdminQuery(undefined);
  const [publishRecipe] = usePublishRecipeMutation()
  const [UnpublishRecipe] = useUnpublishRecipeMutation()
  const [deleteRecipe] =  useDeleteRecipeMutation()




  const handleDeleteRecipe = (recipeId:string) =>{
    const toastId = toast.loading("Deleting Recipe...")
    try{
        deleteRecipe(recipeId)
        toast.success("Recipe Deleted", {id:toastId})
    }catch(error){
        console.log(error)
       toast.error("Something went wrong", {id:toastId})
    }
}
  const handlePublishRecipe = (recipeId:string) =>{
    const toastId = toast.loading("Publishing Recipe...")
    try{
        publishRecipe(recipeId)
        toast.success("Recipe Published", {id:toastId})
    }catch(error){
        console.log(error)
       toast.error("Something went wrong", {id:toastId})
    }
}

  const handleUnpublishRecipe = (recipeId:string) =>{
    const toastId = toast.loading(" Unpublishing Recipe...")
    try{
        UnpublishRecipe(recipeId)
        toast.success("Recipe Unpublished", {id:toastId})
    }catch(error){
        console.log(error)
       toast.error("Something went wrong", {id:toastId})
    }
}


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
        <div className=" ml-4 md:ml-72 -z-10">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Image</th>
              <th>Name</th>
              <th>UP Vote</th>
              <th>Down Vote</th>
              <th>Status</th>
              <th>Publish</th>
              <th>Un publish</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {
            data?.data?.map((item:TRecipe, index:number) =>(
                <tr key={item._id}>
                <th>
                  {index+1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                    </div>
                  </div>
                </td>
                <td>
                <h1 dangerouslySetInnerHTML={{ __html: item.title }} />
                </td>
                <td>
                 {item.upvote.length}
                </td>
                <td>
                 {item.downvote.length}
                </td>
                <td>
                 {item.isPublished === true ?<p className='text-green-500'>PUBLISHED</p> : <p className='text-red-500'>PENDING</p>}
                </td>
                <th>
                  <button disabled={item.isPublished === true} onClick={()=>handlePublishRecipe(item._id)} className={` ${item.isPublished === true ? "opacity-60":""} py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium`}>Publish</button>
                </th>
                <th>
                  <button disabled={item.isPublished === false} onClick={()=>handleUnpublishRecipe(item._id)} className={` ${item.isPublished === false ? "opacity-60":""} py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium`}>Unpublish</button>
                </th>
                <th>
                  <button onClick={()=>handleDeleteRecipe(item._id)} className="py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium">Delete</button>
                </th>
               
              </tr>
            ))
           }
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default AllRecipe;