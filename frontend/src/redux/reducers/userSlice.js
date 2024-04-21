import { createSlice } from "@reduxjs/toolkit" 

const userSlice = createSlice({ 
    name: "user", 
    initialState: '',
    reducers: { 
         setUser: (state, {payload}) => {
            return state = payload
         },
    }
})


export const userSelector = (state) => state.user
export const { setUser } = userSlice.actions
export const userReducer = userSlice.reducer