const TimerModel = require("../models/timerModel")


exports.setTimer = async (req, res, next) => { 
    try {
  
      const { timerName, timerId, duration, timeLeft } = req.body
      if(!timerName) 
          return res.status(400).json({message: "no timerName provided"})

      if(!duration) 
        return res.status(400).json({message: "no duration provided"})

      if(!timerId) 
        return res.status(400).json({message: "no timerId provided"})

      const newTimer = new TimerModel({ 
          timerName: timerName, 
          totalDuration: duration,
          timerId: timerId, 
          timeLeft: timeLeft,
          user: req.user._id
      })

      const timerSaved = await newTimer.save()
      if(!timerSaved)
        return res.status(500).json({message: "timer creation failed"})

      return res.status(200).json({message: "timer saved successfully", data: timerSaved}) 

    } catch (error) {
      return res.status(500).json({error:error.message})
    }
}

exports.getTimer = async (req, res, next) => { 
    try {

      const timers = await TimerModel.find({user: req.user._id}).sort({ createdAt: -1})
      if(timers.length < 1){
          return res.status(200).json({message: "no timer found", data: []})
      }
      return res.status(200).json({message:  `${timers.length} timers found`, data: timers})
      
    } catch (error) {
      return res.status(500).json({error:error.message, message: "Something went wrong"})
    }
} 


exports.updateTimer = async (req, res, next) => { 
    try {

      const { timerId, activeDuration, isDeleted = false , deleteDate = false, timeLeft } = req.body
      if(!timerId) 
          return res.status(400).json({message: "no timerId provided"})

      if(!activeDuration) 
        return res.status(400).json({message: "no activeDuration provided"})

      const timer = await TimerModel.findOne({timerId: timerId})
      if(!timer){
            return res.status(400).json({message: "no timer found with this timer id"})
      }

      if(isDeleted) timer.isDeleted = true
      if(deleteDate) timer.deleteDate = new Date()
      timer.activeDuration = activeDuration
      timer.timeLeft = timeLeft

      const updatedTimer = await timer.save()

      if(!updatedTimer)
        return res.status(500).json({message: "timer updation failed"})

      return res.status(200).json({message: "timer udpated successfully", data: updatedTimer}) 

        
    } catch (error) {
      return res.status(500).json({error:error.message})
    }
}

exports.updateAllTimer = async (req, res, next) => { 
  try {
      const timersToUpdate = req.body.timers; 

      if (!timersToUpdate || !Array.isArray(timersToUpdate)) {
          return res.status(400).json({ message: "No timers provided or invalid format" });
      }

      for (const timer of timersToUpdate) {
          const { timerId, activeDuration, isDeleted = false, deleteDate = false, timeLeft } = timer;

          if (!timerId || !activeDuration) {
              return res.status(400).json({ message: "Invalid timer data" });
          }

          const existingTimer = await TimerModel.findOne({ timerId: timerId });
          if (!existingTimer) {
              return res.status(400).json({ message: `No timer found with id ${timerId}` });
          }


          if (isDeleted) existingTimer.isDeleted = true;
          if (deleteDate) existingTimer.deleteDate = new Date();
          existingTimer.activeDuration = activeDuration;
          existingTimer.timeLeft = timeLeft;


          await existingTimer.save();
      }

      return res.status(200).json({ message: "All timers updated successfully" });
      
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};


exports.deleteTimer = async (req, res, next) => { 
  try {

    const { timerId } = req.params
    if(!timerId) 
        return res.status(400).json({message: "no timerId provided"})

    const timer = await TimerModel.deleteOne({$and:[
        {timerId: timerId},
        {user:req.user._id}
    ]})

    if(!timer){
          return res.status(400).json({message: "error in deleting timer"})
    }
    return res.status(200).json({message: "timer deleted successfully"}) 
      
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
}

