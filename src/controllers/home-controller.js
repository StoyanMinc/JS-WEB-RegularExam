import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import eventService from '../services/event-service.js'

const homeController = Router();

homeController.get('/', async (req, res) => {
  res.render('home')
});

homeController.get('/search', async (req, res) => {

  const { name, type } = req.query;
  const events = await eventService.seachEvents(name, type);
  res.render('search', { events, name, type });
})

export default homeController;