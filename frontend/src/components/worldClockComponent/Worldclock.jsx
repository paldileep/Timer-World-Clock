import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import './worldclock.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setZone, worldclockSelector } from '../../redux/reducers/worldclockSlice';

const timeZoneList = [
  {
    timeZone: 'PST (Pacific Standard Time)',
    utcValue: 'UTC-8',
  },
  {
    timeZone: 'MST (Mountain Standard Time)',
    utcValue: 'UTC-7',
  },
  {
    timeZone: 'CST (Central Standard Time)',
    utcValue: 'UTC-6',
  },
  {
    timeZone: 'EST (Eastern Standard Time)',
    utcValue: 'UTC-5',
  },
  {
    timeZone: 'CET (Central European Time)',
    utcValue: 'UTC+1',
  },
  {
    timeZone: 'IST (Indian Standard Time)',
    utcValue: 'UTC+5:30',
  },
];

const Worldclock = () => {
  const dispatch = useDispatch();

  // Get selected time zone from Redux state
  const selectedTimeZone = useSelector(worldclockSelector);

  // Current time in the selected time zone
  const [currentTime, setCurrentTime] = useState(DateTime.now().setZone(selectedTimeZone));

  // Dispatch action to set default time zone on component mount
  useEffect(() => {
    if(!selectedTimeZone){
      dispatch(setZone(timeZoneList[0].utcValue));
    }
    
  }, []);

  // Update current time when selected time zone changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(DateTime.now().setZone(selectedTimeZone));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTimeZone]);

  const handleTimeZoneChange = (e) => {
    dispatch(setZone(e.target.value));
  };

  return (
    <div className='world-clock-container'>
      <h1>World Clock</h1>

      <div>
        <select onChange={handleTimeZoneChange} value={selectedTimeZone || timeZoneList[0].utcValue}>
          {timeZoneList.map((zone, index) => (
            <option key={index} value={zone.utcValue}>
              {zone.timeZone}
            </option>
          ))}
        </select>
      </div>

      <h2>Current Time and Date in {selectedTimeZone}</h2>
      <p>Time: {currentTime.toFormat('HH:mm:ss')}</p>
      <p>Date: {currentTime.toFormat('DD')}</p>
    </div>
  );
};

export default Worldclock;
