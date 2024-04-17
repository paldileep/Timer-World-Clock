import React, { useState, useEffect } from 'react';
 
const TimeDisplay = ({ dateString, zone , className}) => {
  const [formattedTime, setFormattedTime] = useState('');
  console.log('dateString-->', dateString)
 
  useEffect(() => {
 
    let date = new Date(dateString);
 
    const formatTime = (date) => {
      date.setSeconds(date.getSeconds() + 1);
      let newDate = new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'full',
        timeStyle: 'medium',
        timeZone: zone,
        hour12: false
      }).format(date);
 
      console.log('newDate-->', newDate)
      setFormattedTime(newDate);
    };
 
    formatTime(date);
 

    const intervalId = setInterval(()=>formatTime(date), 1000);

    return () => clearInterval(intervalId);
  }, [zone]);
 
  return <div className={className}>{formattedTime}</div>;
};
 
export default TimeDisplay;