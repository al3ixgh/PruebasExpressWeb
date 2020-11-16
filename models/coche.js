const mongoose = require('mongoose')

const Coche = mongoose.model('Coche', {
    marca:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    modelo:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
  

})

module.exports = Coche
