import { Router } from "express";
import homeController from "./controllers/home-controller.js";
import authController from "./controllers/auth-controller.js";
import eventContoller from "./controllers/event-controller.js";

const router = Router();

router.use(homeController);
router.use(authController)
router.use('/catalog', eventContoller)

router.get('*', (req, res) => {
    res.render('404');
})

export default router;