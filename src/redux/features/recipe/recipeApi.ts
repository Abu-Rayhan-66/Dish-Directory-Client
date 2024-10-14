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
            query:()=>({
              url:`/api/recipe`,
              method:'GET',
              
            }),
              providesTags: ["recipe"],
          }),
        allRecipeForAdmin: builder.query({
            query:()=>({
              url:`/api/recipe/admin`,
              method:'GET',
              
            }),
              providesTags: ["recipe"],
          }),
        singleRecipe: builder.query({
            query:(id)=>({
              url:`/api/recipe/${id}`,
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
            invalidatesTags: ["user"],
          }),
          editComment: builder.mutation({
            query:({data,userId, recipeId})=>({
              url:`/api/recipe/edit-comment/${userId}/${recipeId}`,
              method:'PATCH',
              body:data
            }),
            invalidatesTags: ["user"],
          }),

          upVote: builder.mutation({
            query:(id)=>({
              url:`/api/recipe/up-vote/${id}`,
              method:'PATCH',
             
            }),
            invalidatesTags: ["user"],
          }),

          downVote: builder.mutation({
            query:(id)=>({
              url:`/api/recipe/down-vote/${id}`,
              method:'PATCH',
             
            }),
            invalidatesTags: ["user"],
          }),

          rating: builder.mutation({
            query:({data,id})=>({
              url:`/api/recipe/rating/${id}`,
              method:'PATCH',
             body:data
            }),
            invalidatesTags: ["user"],
          }),
          publishRecipe: builder.mutation({
            query:(id)=>({
              url:`/api/recipe/publish/${id}`,
              method:'PATCH',
        
            }),
            invalidatesTags: ["user"],
          }),

          unpublishRecipe: builder.mutation({
            query:(id)=>({
              url:`/api/recipe/unpublish/${id}`,
              method:'PATCH',
        
            }),
            invalidatesTags: ["user"],
          }),

          deleteRecipe: builder.mutation({
            query:(id)=>({
              url:`/api/recipe/${id}`,
              method:'DELETE',
        
            }),
            invalidatesTags: ["user"],
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
    useUpVoteMutation,
    useDownVoteMutation,
    useRatingMutation,
    usePublishRecipeMutation,
    useUnpublishRecipeMutation,
    useDeleteRecipeMutation

} = recipeApi