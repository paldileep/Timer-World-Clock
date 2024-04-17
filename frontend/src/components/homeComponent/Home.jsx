import React, { useEffect, useState } from 'react'
import "./home.scss"
import TimerList from '../timerComponent/TimerList'
import { useDispatch } from "react-redux"
import { setTimer } from "../../redux/reducers/timerSlice"
import HistoryList from '../historyComponent/HistoryList'
import { setHelper } from '../../redux/reducers/apiHelperSlice'

import axios from "axios"
const BASE_URL = import.meta.env.VITE_BASE_URL

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [timerName, setTimerName ] = useState('')
  const [totalDuration, setTotalDuration ] = useState('')

  const dispatch = useDispatch()

  const handleName = (e) => { 
      setTimerName(e.target.value)
  }

  const handleDuration = (e) => { 
    setTotalDuration(e.target.value)
  }

  const startTimer = async (e) => { 
      try {

        e.preventDefault()

        if(timerName && totalDuration){

          
            const timerId = parseInt(Math.random() * 1000000000).toString()

            const data = { timerName: timerName, duration: totalDuration, timerId:  timerId, timeLeft: totalDuration* 60 }
            setLoading(false);
            await axios.post(`${BASE_URL}/timer`, data)

            dispatch(setTimer( { totalDuration, id: timerId, timerName , timeLeft: totalDuration* 60 } ))
            dispatch(setHelper(timerId))
            setLoading(false);
            
            setTimerName('')
            setTotalDuration('')

        }else{ 
          alert('Please fill both the fields...')
        }
        
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
  }


  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    <div className='timer_container'>

        <div className='timer_list_section'> 
                  <h2>Create New Timer</h2>

                  <input 
                      type="text" 
                      name="timerName"
                      placeholder='Timer Name'
                      className='input-box'
                      value={timerName}
                      onChange={handleName}
                    />
                    <input 
                      type="number" 
                      name="duration"
                      placeholder='Time in minutes'
                      className='input-box'
                      value={totalDuration}
                      onChange={handleDuration}
                    />
                 
                    <button className="start-button" onClick={startTimer}>Start Timer</button>

                  <TimerList/>

        </div>

        <div className='new_timer_section'>
                <h2>Timer History</h2>

                <HistoryList/>
                    

  
        </div>

        

    </div>
  )
}

export default Home