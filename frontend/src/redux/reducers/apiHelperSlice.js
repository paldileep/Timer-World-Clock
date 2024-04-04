import { createSlice } from "@reduxjs/toolkit" 


const apiHelperSlice = createSlice({ 
    name: "apiHelper", 
    initialState: null,
    reducers: { 
          setHelper: (state, {payload}) => {
            return state = payload
          }
    }
})


export const apiHelperSelector = (state) => state.apiHelper
export const { setHelper } = apiHelperSlice.actions
export const apiHelperReducer = apiHelperSlice.reducer