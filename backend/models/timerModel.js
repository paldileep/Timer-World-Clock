const mongoose = require("mongoose")

const timerSchema = new mongoose.Schema({

    timerName: { 
      type: String, 
    }, 
    timerId: { 
      type: String,
    },
    totalDuration: { 
      type: Number,
    },
    deleteDate: { 
      type: Date,
      default: null 
    },
    activeDuration: { 
      type: String,
      default: null
    },
    timeLeft: { 
      type: Number
    }, 
    isDeleted: { 
      type: Boolean, 
      default: false
    }

}, 
    { timestamps: true }
)

const TimerModel = mongoose.model('timers', timerSchema)
module.exports = TimerModel