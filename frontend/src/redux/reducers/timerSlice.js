import { createSlice } from "@reduxjs/toolkit" 


const timerSlice = createSlice({ 
    name: "timer", 
    initialState: [],
    reducers: { 
         setTimer: (state, {payload}) => { 
               state.push({totalDuration: payload.totalDuration , 
               id: payload.id, 
               isPause: false, 
               timerName: payload.timerName,
               timeLeft: payload.timeLeft   })
         },
         updateTimeLeft(state, {payload}) {
            const { id, timeLeft } = payload;
            const timer = state.find(timer => timer.id === id);
            if (timer) {
              timer.timeLeft = timeLeft;
            }
         },
         removeTimer: (state, {payload}) => { 
               return state.filter(item => item.id !== payload.id)
         },
         togglePause: (state, {payload}) =>{
               return state.map(item => { 
                    if(item.id === payload.id){
                        return { ...item, isPause: !item.isPause}
                    }else{ 
                      return item
                    }
               } )
         },
         updateAllTimeLeft(state, {payload}) {
            const { spendTime } = payload;
            const newTimers =  state.map(timer => {
                  if(!timer.isPause){
                     return { ...timer, timeLeft: timer.timeLeft - spendTime}
                  }
                  else{ 
                     return timer
                  }
            });
            const timerTobeDeleted = newTimers.filter(item=> item.timeLeft < -1)
            updateTimerInDb(timerTobeDeleted)
            return newTimers.filter(item=> item.timeLeft > -1)
            
           
         },
         clearTimer: (state) => { 
            return state = []
         }, 
    }
})


export const timerSelector = (state) => state.timer
export const { setTimer, updateTimeLeft, removeTimer, togglePause , updateAllTimeLeft, clearTimer} = timerSlice.actions
export const timerReducer = timerSlice.reducer


import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL
const formatTime = (timeLeft) => {
   const minutes = Math.floor(timeLeft / 60);
   const seconds = timeLeft % 60;
   return `${minutes} minutes ${seconds} seconds`;
 };


const updateTimerInDb = async (timers) => {

   const localUser = JSON.parse(localStorage.getItem('user'))

   const headers = {
     'Content-Type': 'application/json',
     'token': localUser?.token 
   };
 
   const updateAllTimerPayload = timers?.map(item=> { 

      let obj = { 
            timerId: item.id, 
            activeDuration: formatTime(item.totalDuration * 60), 
            timeLeft: item.totalDuration * 60,
            isDeleted : true,
            deleteDate : true
      }
      return obj
   })
   
 
   const data = { timers: updateAllTimerPayload }
   await axios.put(`${BASE_URL}/update-all-timers`, data, {headers})

}