import { createSlice } from "@reduxjs/toolkit"

const initialState = {
 isLogin: false,
 user: {}
}

export const loginSlice = createSlice({
 name: 'login',
 initialState,
 reducers: {
  setUserLoginState: (state, action) => {
   const payload = action.payload
   const type = payload.type
   const data = payload.data

   if(type === "LOGIN_SUCCESS" || type === "USER_SUCCESS"){
    localStorage.setItem("token", data.token)
    state.isLogin = true
    state.user = payload.data
   } else if(type === "LOGOUT" || type === "AUTH_ERROR"){
    localStorage.removeItem("token")
    state.isLogin = false
    state.user = {}
   } else {
    // console.log("Unknown action type:", type); 
    throw new Error("Unknown action type");
   }

  }
 }
})

export const { setUserLoginState } = loginSlice.actions

export const getAccount = state => state.login

export default loginSlice.reducer