const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FitnessSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },

    exercises: [{
        type:
        {
            type: String,
            trim: true,
            required: "Last Name is Required"
        },

        name: {
            type: String,
            trim: true,
        },

        duration: {
            type: Number
        },

        weight: {
            type: Number,
        },

        reps: {
            type: Number,
        },
        sets: {
            type: Number,
        },
        distance: {
            type: Number,
        }

    }]});

const Fitness = mongoose.model('Fitness', FitnessSchema); 
// Export the User model
module.exports = Fitness;