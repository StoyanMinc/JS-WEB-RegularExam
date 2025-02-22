import Event from "../models/Event.js";

const getAll = () => Event.find();
const getOne = (_id) => Event.findById({ _id });
const create = (formData) => Event.create(formData);
const update = (eventId, formData) => Event.findByIdAndUpdate(eventId, formData, { runValidators: true });
const remove = (_id) => Event.findByIdAndDelete({ _id });
const seachEvents = (name, type) => {

    let query = {};

    if (name) {
        query.name = new RegExp(name, 'i');
    }

    if (type) {
        query.type = type;
    }

    return Event.find(query);
};

const interested = async (userId, _id) => {
    const event = await Event.findById({ _id });
    if(event.owner.toString() === userId) {
        return;
    }
    const isLiked = event.interestedList.some(u => u._id == userId);
    if (isLiked) {
        return;
    }

    event.interestedList.push(userId);
    event.save();
}
const eventService = {
    create,
    getAll,
    getOne,
    update,
    remove,
    seachEvents,
    interested
};

export default eventService;