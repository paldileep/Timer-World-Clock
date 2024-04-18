import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { timerSelector, removeTimer, togglePause } from '../../redux/reducers/timerSlice'
import { setHelper } from '../../redux/reducers/apiHelperSlice'
import Timer from './Timer'
import axios from 'axios'
import "./timerList.scss"
import Loader from '../../utils/Loader'

const BASE_URL = import.meta.env.VITE_BASE_URL

const TimerList = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionId, setActionId] = useState(null);


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
        setLoading(true)
        await axios.put(`${BASE_URL}/timer`, data)
        dispatch(removeTimer({id: id}))
        dispatch(setHelper(id+randomNumber))
        setLoading(false);
        
      } catch (error) {
        if (error.response) {

          setError(error.response.data.message);
          setLoading(false);
  
        } else if (error.request) {
  
          setError(error.request);
          setLoading(false);
  
        } else {
    
          setError(error.message);
          setLoading(false);
        }
      }
  
      
  }

  const pauseTimerHandler = async (id, timeLeft) => { 
      try {

        const data = { timerId: id, activeDuration: formatTime(timeLeft), timeLeft: timeLeft }
        setLoading(true)
        setActionId(id);
        await axios.put(`${BASE_URL}/timer`, data)
        dispatch(togglePause({id: id}))
        dispatch(setHelper(id+randomNumber))
        setLoading(false);
        
      } catch (error) {
        if (error.response) {

          setError(error.response.data.message);
          setLoading(false);
  
        } else if (error.request) {
  
          setError(error.request);
          setLoading(false);
  
        } else {
    
          setError(error.message);
          setLoading(false);
        }
      }
      
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    
    <div className='currentTimerList'>
        <h3>Current Timer List</h3>
        <hr/>

    {state &&
        state.map((item) => (
          <Timer
            key={item.id}
            id={item.id}
            name={item.timerName}
            startTime={item.totalDuration}
            isPause={item.isPause}
            removeTimerHandler={removeTimerHandler}
            pauseTimer={pauseTimerHandler}
            loading={loading}
            actionId={actionId}
          />
        ))}
    </div>

  )
}

export default TimerList