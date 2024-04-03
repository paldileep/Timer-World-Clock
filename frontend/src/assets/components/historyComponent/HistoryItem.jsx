import React from 'react';
import './historyItem.scss'; 

const HistoryItem = ({ timer }) => {
  return (
    <div className="timer-item">
      <div className="timer-name">{timer.timerName}</div>
      <div className="timer-details">
        <div className="detail">Active Duration: {timer.activeDuration || 0}</div>
        <div className="detail">Total Duration: {timer.totalDuration} Minutes</div>
        <div className="detail">Created At: {new Date(timer.createdAt).toLocaleString()}</div>
       
        {timer.isDeleted ? <div className="detail deleted">Deleted</div> :
            <div className="detail active">In Bucket</div>}
        {timer.isDeleted && <div className="detail">Deleted on: {new Date(timer.deleteDate).toLocaleString()}</div>}
      </div>
    </div>
  );
};

export default HistoryItem;
