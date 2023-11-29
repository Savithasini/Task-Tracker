const Event = require("../models/task");

exports.createTask = async (req, res) => {
    const eventObj = req.body;
    try {
        var moviess = await new Event(eventObj).save();
        return res.status(201).json(moviess);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}
exports.updateTask = async (req, res) => {
    const id = req.params.id;
    const bd = req.body;
    try {
        const updatemovie = await Event.findByIdAndUpdate(id, bd, { new: true });
        res.status(200).json(updatemovie);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}
exports.getAllTask = async (req, res) => {
    const id = req.params.id;
    try {
        const getid = await Event.findById(id).lean();
        res.status(200).json(getid);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}
exports.viewTask = async (req, res, next) => {
    try {
        const k = await Event.find().lean();
        return res.status(200).json(k);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.viewTaskNotInclude = async (req, res) => {
    try {
        const getid = await Event.find({ assignto: { $exists: false } }).lean();
        res.status(200).json(getid);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}
exports.viewTaskById = async (req, res) => {
    const id = req.params.id;
    try {
        const getid = await Event.find({ assignto: id }).lean();
        res.status(200).json(getid);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.updateTask = async (req, res) => {
    const id = req.params.id;
    const bd = req.body;
    try {
        const updatemovie = await Event.findByIdAndUpdate(id, bd, { new: true });
        res.status(200).json(updatemovie);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteid = await Event.findByIdAndDelete(id);
        res.status(200).send("Task Deleted successfully")
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}
exports.getSearch = async (req, res) => {
    try {
        const id = req.params.id;
        const cas = new RegExp(`${id}`, 'i');
        const getid = await Event.find({ status: { $regex: cas } }).lean();
        const getname = await Event.find({ taskname: { $regex: cas } }).lean();
        const getdescription = await Event.find({ description: { $regex: cas } }).lean();
        const getpriority = await Event.find({ priority: { $regex: cas } }).lean();
        const getduration = await Event.find({ duration: { $regex: cas } }).lean();
        const getassign = await Event.find({ assignto: { $regex: cas } }).lean();
        var result;
        if (getid.length != 0) {
            result = getid;
        }
        else if (getname.length != 0) {
            result = getname;
        }
        else if (getdescription.length != 0) {
            result = getdescription;
        }
        else if (getpriority.length != 0) {
            result = getpriority;
        }
        else if (getduration.length != 0) {
            result = getduration;
        }
        else if (getassign.length != 0) {
            result = getassign;
        }
        res.status(200).json(result)
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}