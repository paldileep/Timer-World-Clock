import { createSlice } from "@reduxjs/toolkit" 

const worldclockSlice = createSlice({ 
    name: "worldclock", 
    initialState: {
        currentZone: "Asia/Kolkata",
        timeZoneList: [], 
    },
    reducers: { 
         setZone: (state, {payload}) => {
            state.currentZone = payload
         },
         zoneList: (state, {payload}) => { 
            state.timeZoneList = payload
         },

    }
})


export const worldclockSelector = (state) => state.worldclock
export const { setZone, zoneList } = worldclockSlice.actions
export const worldclockReducer = worldclockSlice.reducer