import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HistoryItem from './HistoryItem'
import "./historyList.scss"
import { useSelector } from 'react-redux'
import { timerSelector } from "../../redux/reducers/timerSlice"
import { apiHelperSelector } from '../../redux/reducers/apiHelperSlice'
import Loader from '../../utils/Loader'

const BASE_URL = import.meta.env.VITE_BASE_URL

const HistoryList = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [timerList, setTimerList] = useState([])
  const timerState = useSelector(timerSelector)
  const apiHelperState = useSelector(apiHelperSelector)

  const fetchTimerList = async () => { 
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/timer`);
      setTimerList(response.data.data)
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

  useEffect(()=>{
    fetchTimerList()

  },[])

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
              <HistoryItem key={index} timer={timer} />
            ))
          ) : (
            <p>No timers available</p>
          )}
    
    </div>
  )
}

export default HistoryList