import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import path from 'path';
import cookieParser from 'cookie-parser';

import router from './router.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
// TODO change start command of the app!!!
const app = express();

try {
    await mongoose.connect('mongodb://127.0.0.1:27017/exam');
    console.log('Connect to DB');
} catch (error) {
    console.log(error.message);
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        setSelectOption: (a, b) => a === b
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.resolve('src/views'));

app.use(express.static('src/public'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.use(authMiddleware);
app.use(router);

app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));