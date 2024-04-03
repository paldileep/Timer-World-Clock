const TimerModel = require("../models/timerModel")


exports.setTimer = async (req, res, next) => { 
    try {

      const { timerName, timerId, duration } = req.body
      if(!timerName) 
          return res.status(400).json({message: "no timerName provided"})

      if(!duration) 
        return res.status(400).json({message: "no duration provided"})

      if(!timerId) 
        return res.status(400).json({message: "no timerId provided"})

      const newTimer = new TimerModel({ 
          timerName: timerName, 
          totalDuration: duration,
          timerId: timerId
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

      const timers = await TimerModel.find().sort({ createdAt: -1})
      if(timers.length < 1){
          return res.status(200).json({message: "no timer found", data: []})
      }
      return res.status(200).json({message:  `${timers.length} timers found`, data: timers})
      
    } catch (error) {
      return res.status(500).json({error:error.message})
    }
} 


exports.updateTimer = async (req, res, next) => { 
    try {

      const { timerId, activeDuration, isDeleted = false , deleteDate = false } = req.body
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

      const updatedTimer = await timer.save()

      if(!updatedTimer)
        return res.status(500).json({message: "timer updation failed"})

      return res.status(200).json({message: "timer udpated successfully", data: updatedTimer}) 

        
    } catch (error) {
      return res.status(500).json({error:error.message})
    }
}

