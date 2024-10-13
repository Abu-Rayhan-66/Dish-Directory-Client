import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signUser: builder.mutation({
          query:(data)=>({
            url:'/api/auth/signup',
            method:'POST',
            body:data
          })
        }),
        loginUser: builder.mutation({
          query:(data)=>({
            url:'/api/auth/login',
            method:'POST',
            body:data
          })
        })
      }),
})

export const {useSignUserMutation, useLoginUserMutation} = authApi