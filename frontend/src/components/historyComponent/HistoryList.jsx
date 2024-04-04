import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HistoryItem from './HistoryItem'
import "./historyList.scss"
import { useSelector, useDispatch } from 'react-redux'
import { timerSelector } from "../../redux/reducers/timerSlice"
import { apiHelperSelector } from '../../redux/reducers/apiHelperSlice'

const BASE_URL = import.meta.env.VITE_BASE_URL

const HistoryList = () => {

  const [timerList, setTimerList] = useState([])
  const timerState = useSelector(timerSelector)
  const apiHelperState = useSelector(apiHelperSelector)

  const fetchTimerList = async () => { 
    try {
      const response = await axios.get(`${BASE_URL}/timer`);
      setTimerList(response.data.data)
    } catch (error) {
      console.error('Error fetching timer list:', error);
    }
  }

  useEffect(()=>{
    fetchTimerList()

  },[])

  useEffect(()=>{

      fetchTimerList();

  },[apiHelperState])


  return (
    <div className='historyList'>
        {timerList && timerList.length > 0 ? 
          (
            timerList.map((timer, index) => (
              <HistoryItem key={index} timer={timer} />
            ))
          ) : (
            <p>No timers available</p>
          )
        }
    </div>
  )
}

export default HistoryList