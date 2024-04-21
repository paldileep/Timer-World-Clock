
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { timerReducer } from "../redux/reducers/timerSlice"
import { worldclockReducer } from "./reducers/worldclockSlice"
import { apiHelperReducer } from "./reducers/apiHelperSlice"
import { userReducer } from "./reducers/userSlice"

const  rootReducer = combineReducers({ 
        timer: timerReducer,
        worldclock: worldclockReducer,
        apiHelper: apiHelperReducer,
        user: userReducer
})

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({ 
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

})

export const persistor = persistStore(store)

