import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
          query:({data,id})=>({
            url:`/api/auth/update-user/${id}`,
            method:'PATCH',
            body:data
          }),
          invalidatesTags: ["user"],
        
        }),

        followUser: builder.mutation({
          query:(id)=>({
            url:`/api/auth/follow-user/${id}`,
            method:'PATCH',
            
          }),
          invalidatesTags: ["user"],
        }),

        unFollowUser: builder.mutation({
          query:(id)=>({
            url:`/api/auth/unfollow-user/${id}`,
            method:'PATCH',
           
          }),
          invalidatesTags: ["user"],
        }),

        singleUser: builder.query({
          query:(id)=>({
            url:`/api/auth/user/${id}`,
            method:'GET',
            
          }),
            providesTags: ["user"],
        }),

        allUser: builder.query({
          query:()=>({
            url:`/api/auth/user`,
            method:'GET',
            
          }),
            providesTags: ["user"],
        }),

        userWithPostedRecipe: builder.query({
          query:(id)=>({
            url:`/api/auth/user-with-recipe/${id}`,
            method:'GET',
            
          }),
            providesTags: ["user"],
        }),

        userPostedRecipe: builder.query({
          query:({searchTerm = "", minPrice = "", maxPrice = "",page, limit, sortBy, sortOrder })=>({
            url:`/api/auth/posted-recipe`,
            params: { searchTerm, minPrice, maxPrice, page, limit, sortBy, sortOrder },
            method:'GET',
            
            
          }),
            providesTags: ["user"],
        }),

        singleUserWithEmail: builder.query({
          query:(data)=>({
            url:`/api/user-with-email`,
            method:'GET',
            body:data
            
          }),
            providesTags: ["user"],
        }),

        blockUser: builder.mutation({
            query:(id)=>({
              url:`/api/auth/block-user/${id}`,
              method:'PATCH',
            }),
            invalidatesTags: ["user"],
          }),
        unblockUser: builder.mutation({
            query:(id)=>({
              url:`/api/auth/unblock-user/${id}`,
              method:'PATCH',
            }),
            invalidatesTags: ["user"],
          }),
        deleteUser: builder.mutation({
            query:(id)=>({
              url:`/api/auth/delete-user/${id}`,
              method:'DELETE',
            }),
            invalidatesTags: ["user"],
          }),

        createAdmin: builder.mutation({
            query:(data)=>({
              url:`/api/auth/admin`,
              method:'POST',
              body:data
            }),
            invalidatesTags: ["user"],
          }),

          allAdmin: builder.query({
            query:()=>({
              url:`/api/auth/admin`,
              method:'GET',
              
            }),
              providesTags: ["user"],
          }),

          singleAdmin: builder.query({
            query:(id)=>({
              url:`/api/auth/admin/${id}`,
              method:'GET',
              
            }),
              providesTags: ["user"],
          }),
          updateAdmin: builder.mutation({
            query:({data,id})=>({
              url:`/api/auth/update-admin/${id}`,
              method:'PATCH',
              body:data
            }),
            invalidatesTags: ["user"],
          
          }),
          deleteAdmin: builder.mutation({
            query:(id)=>({
              url:`/api/auth/delete-admin/${id}`,
              method:'DELETE',
            }),
            invalidatesTags: ["user"],
          }),

          changePassword: builder.mutation({
            query:(data)=>({
              url:`/api/password/change-password`,
              method:'PATCH',
              body:data
            }),
            invalidatesTags: ["user"],
          }),

          forgotPassword: builder.mutation({
            query:(data)=>({
              url:`/api/password/forgot-password`,
              method:'PATCH',
              body:data
            }),
            invalidatesTags: ["user"],
          }),
         
          resetPassword: builder.mutation({
            query:({data, yourToken})=>({
              url:`/api/password/reset-password`,
              method:'PATCH',
              body:data,
              headers: {
               
                Authorization: `${yourToken}`, 
                'Content-Type': 'application/json',   
              },
            }),
            invalidatesTags: ["user"],
          }),

          getPremium: builder.mutation({
            query:(id)=>({
              url:`/api/payment/make-payment/${id}`,
              method:'PATCH',
             
            }),
            invalidatesTags: ["user"],
          }),
         



      }),
})

export const {
    useUpdateUserMutation,
    useFollowUserMutation,
    useUnFollowUserMutation,
    useSingleUserQuery,
    useSingleUserWithEmailQuery,
    useAllUserQuery,
    useUserWithPostedRecipeQuery,
    useUserPostedRecipeQuery,
    useBlockUserMutation,
    useUnblockUserMutation,
    useDeleteUserMutation,
    useCreateAdminMutation,
    useAllAdminQuery,
    useSingleAdminQuery,
    useUpdateAdminMutation,
    useDeleteAdminMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetPremiumMutation

} = userApi