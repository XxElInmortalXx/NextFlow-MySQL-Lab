import api from "../lib/axios";

export default {
  getTasks(jwt) {
    return api.get("/tasks/get-tasks", {
      headers: {
        Authorization: jwt,
      },
    });
  },
  createTask(formData, jwt) {
    return api.post("/tasks/create-task", formData, {
      headers: {
        Authorization: jwt,
      },
    });
  },
  deleteTask (id, jwt) {
    return api.delete("/tasks/delete-task", {
      headers: {
        Authorization: jwt,
        task_id: id
      }
    })
  }
};
