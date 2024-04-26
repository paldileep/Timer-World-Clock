import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HistoryItem from './HistoryItem'
import "./historyList.scss"
import { useSelector, useDispatch } from 'react-redux'
import { timerSelector, setTimer } from "../../redux/reducers/timerSlice"
import { apiHelperSelector } from '../../redux/reducers/apiHelperSlice'
import Loader from '../../utils/Loader'
import { useNavigate } from "react-router-dom"

const BASE_URL = import.meta.env.VITE_BASE_URL

const HistoryList = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [timerList, setTimerList] = useState([])
  const timerState = useSelector(timerSelector)
  const apiHelperState = useSelector(apiHelperSelector)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  

  const headers = {
    'Content-Type': 'application/json',
    'token': user?.token 
  };

  const sortTimerList = (data) => { 
    const sortedData = data.sort((a, b)=> { 
      const isDeletedA = a.isDeleted ? 1 : 0;
      const isDeletedB = b.isDeleted ? 1 : 0;
    
      // Compare isDeleted values
      return isDeletedA - isDeletedB;
    })

    return sortedData
  }

  const fetchTimerList = async () => { 
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/timer`, {headers});
      setTimerList(sortTimerList(response.data.data))
      setLoading(false);

    } catch (error) {

      if (error.response) {
        
        if(error.response.data.message === "Token Expired"){
            localStorage.removeItem('user')
            navigate('/login')
        }
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

  const parmanentDelete = async (id) => { 
    try {

      setLoading(true)
      await axios.delete(`${BASE_URL}/timer/${id}`, { headers })
      setLoading(false);
      fetchTimerList()
      
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


  const formatTime = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes} minutes ${seconds} seconds`;
  };

  
  const restartTimer = async (id) => { 
    
    try {

      const timer = timerList.filter(item=>item.timerId===id)
      const timerIds = timerState.map(item=> item.id)

      const data = { 
        timerId: timer[0].timerId, 
        activeDuration: formatTime(0), 
        timeLeft: timer[0].totalDuration * 60 - timer[0].timeLeft
      }

      setLoading(true)
      await axios.put(`${BASE_URL}/timer`, data, {headers})
      setLoading(false);
      
      if(!timerIds.includes(timer[0].timerId)){
        dispatch(setTimer( { 
          totalDuration: timer[0].totalDuration, 
          id: timer[0].timerId, 
          timerName: timer[0].timerName , 
          timeLeft: timer[0].totalDuration* 60 
      } ))
        
      fetchTimerList()
    }
      
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

  const resumeTimer = (id) => { 


    const timer = timerList.filter(item=>item.timerId===id)
    const timerIds = timerState.map(item=> item.id)

    if(!timerIds.includes(timer[0].timerId)){
      dispatch(setTimer( { 
        totalDuration: timer[0].totalDuration, 
        id: timer[0].timerId, 
        timerName: timer[0].timerName , 
        timeLeft: (timer[0].totalDuration* 60) - timer[0].timeLeft
      } ))
        
      fetchTimerList()
    }
  }

  useEffect(()=>{
    fetchTimerList()

  },[timerState.length, user?.token])

  useEffect(()=>{

      fetchTimerList();

  },[apiHelperState])


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='historyList'>
        {loading ? <Loader/> : timerList && timerList.length > 0 ? 
          (
            timerList.map((timer, index) => (
              <HistoryItem 
                key={index} 
                timer={timer} 
                deleteItem={parmanentDelete}  
                restartTimer={restartTimer}
                resumeTimer={resumeTimer}/>
            ))
          ) : (
            <p>No timers available</p>
          )}
    
    </div>
  )
}

export default HistoryList