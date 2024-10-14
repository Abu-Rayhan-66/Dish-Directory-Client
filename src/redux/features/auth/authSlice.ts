import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";



export interface User {
 
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  role:string
 
}

type TAuthState = {
  user: User | null;
  token: string | null;
  userData: User | null;
};

const initialState: TAuthState = {
    user: null,
    token: null,
    userData:null,
  };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUser: (state, action) => {
        const { user, token, userData } = action.payload;
        state.user = user;
        state.token = token;
        state.userData = userData
      },
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.userData = null;
      },
    },
  });

  export const { setUser, logout } = authSlice.actions;

export const authReducer =  authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;