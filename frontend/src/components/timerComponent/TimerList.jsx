import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { timerSelector, removeTimer, togglePause } from '../../redux/reducers/timerSlice'
import { setHelper } from '../../redux/reducers/apiHelperSlice'
import Timer from './Timer'
import axios from 'axios'
import "./timerList.scss"

const BASE_URL = import.meta.env.VITE_BASE_URL

const TimerList = () => {

  const state = useSelector(timerSelector)
  const dispatch = useDispatch()

  const formatTime = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes} minutes ${seconds} seconds`;
  };

  const randomNumber = parseInt(Math.random() * 10000000)

  const removeTimerHandler = async (id, timeLeft) => {
      

      try {

        const data = { timerId: id, activeDuration:formatTime(timeLeft) , isDeleted: true, deleteDate: true }
        await axios.put(`${BASE_URL}/timer`, data)
        dispatch(removeTimer({id: id}))
        dispatch(setHelper(id+randomNumber))
        
      } catch (error) {
          console.log('error-->', error)
      }
  
      
  }

  const pauseTimerHandler = async (id, timeLeft) => { 
      try {

        const data = { timerId: id, activeDuration: formatTime(timeLeft) }
        await axios.put(`${BASE_URL}/timer`, data)
        dispatch(togglePause({id: id}))
        dispatch(setHelper(id+randomNumber))
        
      } catch (error) {
          console.log('error-->', error)
      }
      
  }

  return (
    
    <div className='currentTimerList'>
        <h3>Current Timer List</h3>
        <hr/>
        {state && state.map(item=> <Timer key={item.id} 
                                          id={item.id}
                                          name={item.timerName} 
                                          startTime={item.totalDuration} 
                                          isPause={item.isPause}
                                          removeTimerHandler={removeTimerHandler}
                                          pauseTimer={pauseTimerHandler}/>)}
    </div>

  )
}

export default TimerList