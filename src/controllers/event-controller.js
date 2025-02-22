import { Router } from "express";

import { getErrorMessage } from "../utils/getError.js";
import eventService from "../services/event-service.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const eventContoller = Router();

eventContoller.get('/', async (req, res) => {
    try {
        const events = await eventService.getAll();
        res.render('catalog', { events });
    } catch (error) {
        res.redirect('/404');
    }
});

eventContoller.get('/create', isAuth, (req, res) => {
    res.render('create');
});

eventContoller.post('/create', isAuth, async (req, res) => {
    const formData = req.body;
    const userId = req.user._id;

    formData.owner = userId;

    try {
        await eventService.create(formData);
        res.redirect('/catalog');
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.render('create', { formData, error: errorMessage });

    }
});

eventContoller.get('/:eventId/details', async (req, res) => {

    const isLogin = !!req.user;
    const userId = req.user?._id;
    const eventId = req.params.eventId;
    try {
        const event = await eventService.getOne(eventId);
        const isOwner = event.owner.toString() == userId;
        const isInterested = !!event.interestedList.find(id => id == userId);

        res.render('details', { event, isLogin, isOwner, isInterested });
    } catch (error) {
        res.redirect('/404');
    }
});

eventContoller.get('/:eventId/edit', isAuth, async (req, res) => {
    const userId = req.user._id;
    try {
        const event = await eventService.getOne(req.params.eventId);
        if (userId !== event.owner.toString()) {
            return res.redirect('/login');
        }
        res.render('edit', { event });

    } catch (error) {
        res.redirect('/404');
    }
});

eventContoller.post('/:eventId/edit', isAuth, async (req, res) => {
    const formData = req.body;
    const eventId = req.params.eventId;
    try {
        await eventService.update(req.params.eventId, formData);
        res.redirect(`/catalog/${eventId}/details`);
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.render('edit', { event: formData, error: errorMessage });
    }
});

eventContoller.get('/:eventId/delete', isAuth, async (req, res) => {
    const eventId = req.params.eventId;
    const userId = req.user._id;
    try {
        const event = await eventService.getOne(req.params.eventId);
        if (userId !== event.owner.toString()) {
            return res.redirect('/login');
        }
        await eventService.remove(eventId);
        res.redirect('/catalog');
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        console.log(errorMessage);
        res.redirect('/404');
    }

});

eventContoller.get('/:eventId/interested', isAuth, async (req, res) => {

    const userId = req.user._id;
    const eventId = req.params.eventId;
    try {
        await eventService.interested(userId, eventId);
        res.redirect(`/catalog/${eventId}/details`);
    } catch (error) {
        res.redirect('/404');
    }
});

export default eventContoller;