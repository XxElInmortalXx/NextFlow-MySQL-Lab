import api from "../lib/axios";

export default {
  register(formData) {
    return api.post("/users/auth/register", formData);
  },
  login(formData) {
    return api.post("/users/auth/login", formData);
  },
  getUser(jwt) {
    return api.get("/users/get-user", {
      headers: {
        Authorization: jwt
      }
    })
  }
};
