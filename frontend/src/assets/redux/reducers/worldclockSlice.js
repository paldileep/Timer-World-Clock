import { createSlice } from "@reduxjs/toolkit" 


const worldclockSlice = createSlice({ 
    name: "worldclock", 
    initialState: null,
    reducers: { 
         setZone: (state, {payload}) => {
            return state = payload
         }
    }
})


export const worldclockSelector = (state) => state.worldclock
export const { setZone } = worldclockSlice.actions
export const worldclockReducer = worldclockSlice.reducer