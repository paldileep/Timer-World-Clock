import React , { useEffect, useState } from 'react';
import './historyItem.scss'; 
import { useSelector, useDispatch } from 'react-redux'
import { timerSelector } from "../../redux/reducers/timerSlice"

const HistoryItem = ({ timer, deleteItem, restartTimer, resumeTimer }) => {

  const timerState = useSelector(timerSelector)
  const [inList, setInList ] = useState(false)


  const checkList = () => { 
   
    const timerIds = timerState.map(item=> item.id)
    if(!timerIds.includes(timer.timerId)){
        setInList(true)
    }
  }

  useEffect(()=>{
      checkList()
  },[])


  return (
    <div className="timer-item">
      <div className="timer-name">{timer.timerName}</div>
      <div className="timer-details">
        <div className="detail">Active Duration: {timer.activeDuration || 0}</div>
        <div className="detail">Total Duration: {timer.totalDuration} Minutes</div>
        <div className="detail">Created At: {new Date(timer.createdAt).toLocaleString()}</div>
        {timer.isDeleted && <div className="detail">Deleted on: {new Date(timer.deleteDate).toLocaleString()}</div>}
        {timer.isDeleted ? (
        <>
          <button className="deletebtn" onClick={() => deleteItem(timer.timerId)}>Permanent Delete</button>
        </>
        ) : (
          inList ? (
            <>
              <div className="detail active">In Bucket</div>
              <div className='control_buttons'>
                  <button onClick={() => restartTimer(timer.timerId)}>Restart</button>
                  <button onClick={() => resumeTimer(timer.timerId)}>Resume</button>
                  <button className="deletebtn" onClick={() => deleteItem(timer.timerId)}>Permanent Delete</button>
              </div>
              
            </>
          ) : <div className="active">Live</div>
        )}

        
      </div>
    </div>
  );
};

export default HistoryItem;
