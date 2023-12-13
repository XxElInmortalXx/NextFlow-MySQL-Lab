import api from "../lib/axios";

export default {
  login(formData) {
    return api.post("/users/auth/login", formData);
  },
  register(formData) {
    return api.post("/users/auth/register", formData);
  },
  getUser(token) {
    return api.get("/users/get-user", {
      headers: {
        Authorization: token,
      },
    });
  },
};
