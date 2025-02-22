import { Schema, model } from "mongoose";
import { hash } from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [2, 'Name must be at least 2 characters!'],
    },

    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email must be at least 10 characters long!']
    },

    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password must be at least 4 characters!']
    }
});

userSchema.pre('save', async function () {
    this.password = await hash(this.password, 12);
})
const User = model('User', userSchema);

export default User;