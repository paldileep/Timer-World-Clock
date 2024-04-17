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
            return state.map(timer => {
                  if(!timer.isPause){
                     return { ...timer, timeLeft: timer.timeLeft - spendTime}
                  }
                  else{ 
                     return timer
                  }
            });
            
           
         }, 
    }
})


export const timerSelector = (state) => state.timer
export const { setTimer, updateTimeLeft, removeTimer, togglePause , updateAllTimeLeft} = timerSlice.actions
export const timerReducer = timerSlice.reducer