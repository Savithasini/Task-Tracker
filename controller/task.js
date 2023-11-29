const { Router } = require("express");
const taskServices = require("../services/task");
const router = Router({ strict: true });

router.post("/tasks", taskServices.createTask);
router.get("/tasks", taskServices.viewTask);
router.get("/tasklist/:id", taskServices.getAllTask);
router.put("/tasks/:id", taskServices.updateTask);
router.get("/tasksnew", taskServices.viewTaskNotInclude);
router.get("/tasks/:id", taskServices.viewTaskById);
router.put("/tasks/:id", taskServices.updateTask);
router.delete("/tasks/:id", taskServices.deleteTask);
router.get("/tasksearch/:id", taskServices.getSearch);
module.exports = router;