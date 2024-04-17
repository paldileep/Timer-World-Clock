import React, { useState, useEffect, useRef } from 'react';
import TimeDisplay from './TimeDisplay';
import Loader from '../../utils/Loader';

import './worldclock.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setZone, worldclockSelector, zoneList } from '../../redux/reducers/worldclockSlice';
import { updateAllTimeLeft } from "../../redux/reducers/timerSlice"


const Worldclock = () => {

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const zoneState = useSelector(worldclockSelector)


  const [zoneDetails, setZoneDetails] = useState(null)

  const spendTimeRef = useRef(0)

  const handleZoneChange = (e) => { 
    const value = e.target.value
    dispatch(setZone(value))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://worldtimeapi.org/api/timezone'); 
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        dispatch(zoneList(data))
        setLoading(false);

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const setIntervalId =  setInterval(() => {
        spendTimeRef.current += 1;
    },  1000);

    fetchData();

    return () => {
      dispatch(updateAllTimeLeft({ spendTime : spendTimeRef.current}))
      clearInterval(setIntervalId)
      
    }



  }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://worldtimeapi.org/api/timezone/${zoneState.currentZone || "Asia/Kolkata"}`); 
        if (!response.ok) {
          setLoading(false);
        }
        const data = await response.json();
        setZoneDetails(data);
        setLoading(false);

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData(); 
  }, [zoneState.currentZone]);


  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className='world-clock-container'>

      <div className='box'>
        <select value={zoneState.currentZone} onChange={handleZoneChange}>
          {/* <option value="">Select a zone</option> */}
          {zoneState.timeZoneList && zoneState.timeZoneList.map((item, index)=> { 
              return <option key={index} value={item}>{item}</option>
          })}
        </select>

        {loading && <Loader />}

        {!loading && zoneDetails && <TimeDisplay  
            className="time-display"
            dateString={zoneDetails.datetime} 
            zone={zoneDetails.timezone}/>}
      </div>

    

    </div>
  )


};

export default Worldclock;
