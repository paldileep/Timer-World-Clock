import { configureStore } from "@reduxjs/toolkit"
import { timerReducer } from "../redux/reducers/timerSlice"
import { worldclockReducer } from "./reducers/worldclockSlice"
import { apiHelperReducer } from "./reducers/apiHelperSlice"

export const store = configureStore({ 
    reducer: { 
        timer: timerReducer,
        worldclock: worldclockReducer,
        apiHelper: apiHelperReducer
    }
})