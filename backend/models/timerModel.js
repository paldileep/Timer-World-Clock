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
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }

}, 
    { timestamps: true }
)

const TimerModel = mongoose.model('timers', timerSchema)
module.exports = TimerModel