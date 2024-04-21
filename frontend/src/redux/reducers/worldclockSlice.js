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
         resetZone: (state) => { 
            state.currentZone = "Asia/Kolkata"
         }

    }

})


export const worldclockSelector = (state) => state.worldclock
export const { setZone, zoneList, resetZone } = worldclockSlice.actions
export const worldclockReducer = worldclockSlice.reducer