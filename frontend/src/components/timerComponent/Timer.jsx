import React, { useState, useEffect } from 'react';
import "./timer.scss"
import {  updateTimeLeft, removeTimer } from "../../redux/reducers/timerSlice"
import { worldclockSelector } from '../../redux/reducers/worldclockSlice';
import { useDispatch, useSelector } from 'react-redux';

const Timer = ({startTime, removeTimerHandler, pauseTimer, id, isPause, name}) => {

  const dispatch = useDispatch();

  const timeSpendState = useSelector(worldclockSelector)

  const timer = useSelector(state => state.timer.find(timer => timer.id === id));


  const formatTime = (timeLeft) => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
  
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  useEffect(() => {
    let intervalId;

    if (!timer.isPause) {

      intervalId = setInterval(() => {
        const newTimeLeft = timer.timeLeft - 1;
        if (newTimeLeft <= -1) {
          clearInterval(intervalId);
          dispatch(removeTimer({ id }));
          removeTimerHandler(id, (startTime * 60 - timer.timeLeft))
        } else {
          dispatch(updateTimeLeft({ id, timeLeft: newTimeLeft }));
        }

      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    }

  }, [dispatch, id, timer.isPause, timer.timeLeft]);

  return (

    <div className="list-item">
        <span className="list-item-text">
        <span className="title">{name}</span>
          {formatTime(timer.timeLeft)}
        </span>
        <button className="pause-button" onClick={()=> pauseTimer(id, (startTime * 60 - timer.timeLeft))}>
          {isPause? "Resume": "Pause"}
        </button>
        <button className="close-button" onClick={()=> removeTimerHandler(id, (startTime * 60 - timer.timeLeft))}>X</button>
    </div>
  )
}

export default Timer



