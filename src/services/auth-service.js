import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/tokenUtil.js';

const register = async (formData) => {

    const { username, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
        throw new Error("Passwords don\'t match!");
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new Error("Email is already existing!");
    }
    const userData = await User.create({ username, email, password});

    const token = generateToken(userData);
    return token;
}

const login = async (formData) => {

    const { email, password } = formData;
    const existedUser = await User.findOne({ email });

    if (!existedUser) {
        throw new Error("Invalid email or password!");
    }

    const isValid = await bcrypt.compare(password, existedUser.password);
    if (!isValid) {
        throw new Error('Invalid email or password!');
    }

    const token = await generateToken(existedUser);

    return token;
};

export const authService = {
    register,
    login,
}