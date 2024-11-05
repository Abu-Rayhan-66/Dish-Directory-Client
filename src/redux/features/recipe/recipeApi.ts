import { baseApi } from "../../api/baseApi";

const recipeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createRecipe: builder.mutation({
          query:(data)=>({
            url:`/api/recipe`,
            method:'POST',
            body:data
          }),
          invalidatesTags: ["recipe"],
        }),

        allRecipe: builder.query({
            query:({searchTerm = "", minPrice = "", maxPrice = "",page, limit, sortBy, sortOrder, id})=>({
              url:`/api/recipe/user-recipe`,
              params: { searchTerm, minPrice, maxPrice, page, limit, sortBy, sortOrder, id },
              method:'GET',
              
            }),
              providesTags: ["recipe"],
          }),

        allRecipeForAdmin: builder.query({
            query:()=>({
              url:`/api/recipe/admin-recipe`,
              method:'GET',
              
            }),
              providesTags: ["recipe"],
          }),


        singleRecipe: builder.query({
            query:(id)=>({
              url:`/api/recipe/single-recipe/${id}`,
              method:'GET',
              
            }),
              providesTags: ["recipe"],
          }),
          addComment: builder.mutation({
            query:({data,id})=>({
              url:`/api/recipe/comment/${id}`,
              method:'PATCH',
              body:data
            }),
            invalidatesTags: ["recipe"],
          }),
          editComment: builder.mutation({
            query:({data, recipeId, commentId})=>({
              url:`/api/recipe/edit-comment/${recipeId}/${commentId}`,
              method:'PATCH',
              body:data
            }),
            invalidatesTags: ["recipe"],
          }),

          deleteComment: builder.mutation({
            query:({recipeId,id})=>({
              url:`/api/recipe/delete-comment/${recipeId}/${id}`,
              method:'DELETE',
            }),
            invalidatesTags: ["recipe"],
          }),

          upVote: builder.mutation({
            query:(id)=>({
              url:`/api/recipe/up-vote/${id}`,
              method:'PATCH',
             
            }),
            invalidatesTags: ["recipe"],
          }),

          downVote: builder.mutation({
            query:(id)=>({
              url:`/api/recipe/down-vote/${id}`,
              method:'PATCH',
             
            }),
            invalidatesTags: ["recipe"],
          }),

          rating: builder.mutation({
            query:({rating,id})=>({
              url:`/api/recipe/rating/${id}`,
              method:'PATCH',
             body:rating
            }),
            invalidatesTags: ["recipe"],
          }),
          publishRecipe: builder.mutation({
            query:(id)=>({
              url:`/api/recipe/publish/${id}`,
              method:'PATCH',
        
            }),
            invalidatesTags: ["recipe"],
          }),

          unpublishRecipe: builder.mutation({
            query:(id)=>({
              url:`/api/recipe/unpublish/${id}`,
              method:'PATCH',
        
            }),
            invalidatesTags: ["recipe"],
          }),

          deleteRecipe: builder.mutation({
            query:(id)=>({
              url:`/api/recipe/${id}`,
              method:'DELETE',
        
            }),
            invalidatesTags: ["recipe"],
          }),

          updateRecipe: builder.mutation({
            query:({formData,id})=>({
              url:`/api/recipe/update-recipe/${id}`,
              method:'PATCH',
              body:formData
        
            }),
            invalidatesTags: ["recipe"],
          }),


          
      }),
})

export const {

    useCreateRecipeMutation,
    useAllRecipeQuery,
    useAllRecipeForAdminQuery,
    useSingleRecipeQuery,
    useAddCommentMutation,
    useEditCommentMutation,
    useDeleteCommentMutation,
    useUpVoteMutation,
    useDownVoteMutation,
    useRatingMutation,
    usePublishRecipeMutation,
    useUnpublishRecipeMutation,
    useDeleteRecipeMutation,
    useUpdateRecipeMutation

} = recipeApi