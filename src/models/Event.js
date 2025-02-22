import { Schema, model, Types } from "mongoose";

const eventSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name of the event is required!'],
        minLength: [2, 'Name of the event must be at least 2 characters long!']
    },
    type: {
        type: String,
        required: [true, 'Type of the event is required!'],
        enum: {
            values: ['Wildfire', 'Flood', 'Earthquake', 'Hurricane', 'Drought', 'Tsunami', 'Other'],
            message: 'Invalid Option!'
        }
    },
    year: {
        type: Number,
        required: [true, 'Year of the event is required!'],
        min: [0, 'Year must be between 0 and 2024'],
        max: [2024, 'Year must be between 0 and 2024'],

    },
    location: {
        type: String,
        required: [true, 'Location of the event is required!'],
        minLength: [3, 'Location of the event must be at least 3 characters long!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Image must start with http:// or https://']
    },
    description: {
        type: String,
        required: [true, 'Description of the event is required!'],
        minLength: [10, 'Description of the event must be at least 10 characters long!']
    },
    interestedList: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });

const Event = model('Event', eventSchema);

export default Event;