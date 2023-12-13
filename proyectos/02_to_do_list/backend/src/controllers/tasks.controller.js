import { Tasks } from "../models/tasks.model.js";
import { generateId } from "../utils/index.js";
import { taskValidation } from "../validations/tasks.validation.js";

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll({ where: { user_id: req.user.user_id } });
    res.status(200).json({
      msg: tasks,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createTask = async (req, res) => {
  const data = req.body;
  try {
    const validated = taskValidation(data);
    if (validated) {
      res.status(400).json({
        error: validated,
      });
      return;
    }
    await Tasks.create({
        title: data.title,
        content: data.content,
        user_id: req.user.user_id,
        url: generateId()
    })
    res.status(200).json({
      msg: 'task create'
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Tasks.destroy({ where: { task_id: req.headers.task_id } })
    res.status(200).json({
      msg: 'destroy'
    })
  } catch (error) {
    
  }
}

export { getTasks, createTask, deleteTask };
