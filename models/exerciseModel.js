import mongoose, { Schema } from "mongoose";

const schema = new Schema(
    {
        date: Date,
        duration: String,
        description: String
    }
)

const Exercise = mongoose.model('Exercise', schema);

export default Exercise;