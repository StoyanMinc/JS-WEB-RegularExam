import { verifyToken } from "../utils/tokenUtil.js";

export const authMiddleware = async (req, res, next) => {

    const token = req.cookies['auth'];
    if (!token) {
        return next();
    }

    try {
        const decodedToken = await verifyToken(token);
        req.user = decodedToken;
        res.locals.isAuthenticated = true;
        next();
    } catch (error) {
        console.log(error.message)
        res.clearCookie('auth');
        res.redirect('/login');
    }
};

export const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    };
    next();
};

export const isGuest = (req, res, next) => {
    if(req.user) {
        return res.redirect('/');
    }

    next();
}