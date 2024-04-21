import React, {useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../../redux/reducers/userSlice';
import { clearTimer, timerSelector } from '../../redux/reducers/timerSlice';
import { resetZone } from '../../redux/reducers/worldclockSlice';
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
import "./navbar.scss"

const Navbar = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector(userSelector)
  const timerState = useSelector(timerSelector)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formatTime = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes} minutes ${seconds} seconds`;
  };

  useEffect(()=> { 
      const user = JSON.parse(localStorage.getItem('user'))
      if(user?.token){
          setIsLoggedIn(true)
      }
      else{
        setIsLoggedIn(false) 
      }

  }, [user.token])

  const localUser = JSON.parse(localStorage.getItem('user'))

  const headers = {
    'Content-Type': 'application/json',
    'token': localUser?.token 
  };

  const logout = async () => { 

    const updateAllTimerPayload = timerState?.map(item=> { 

        let obj = { 
            timerId: item.id, 
            activeDuration: formatTime(item.totalDuration * 60 - item.timeLeft ), 
            timeLeft: item.totalDuration * 60 - item.timeLeft 
        }
        return obj
    })
    

    try {

      const data = { timers: updateAllTimerPayload }
      setLoading(true)
      await axios.put(`${BASE_URL}/update-all-timers`, data, {headers})
      setLoading(false);

      
      //udpating data
      localStorage.removeItem('user')
      setIsLoggedIn(false) 
      dispatch(clearTimer())
      dispatch(resetZone())
      navigate('/login')

      
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

    <div className="navBar">
    
      {!isLoggedIn ? (

          <div className='menu'>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/worldclock">World Clock</NavLink>
          </div>

        )

          : 
          
          <div className='menu'>
            <NavLink to="/">Timer</NavLink>
            <NavLink to="/worldclock">World Clock</NavLink>

            <div className='sideMenu'>
              <span>{user.name}</span>
              <button onClick={logout}>Logout</button>
            </div>

          </div>
      
        }
    </div>
  )
}

export default Navbar