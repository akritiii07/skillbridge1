import api from "./api";

export const userAPI = {
  getAll: (params) => api.get("/users", { params }),
  getById: (id) => api.get(`/auth/${id}`),
  getRecommended: () => api.get("/users/recommended"),
  getTrendingSkills: () => api.get("/users/trending"),
  getStats: () => api.get("/users/stats"),
};

export const connectionAPI = {
  sendRequest: (data) => api.post("/connections/request", data),
  accept: (id) => api.put(`/connections/${id}/accept`),
  reject: (id) => api.put(`/connections/${id}/reject`),
  getMy: (params) => api.get("/connections/my", { params }),
  getPending: () => api.get("/connections/pending"),
  remove: (id) => api.delete(`/connections/${id}`),
};

export const exchangeAPI = {
  create: (data) => api.post("/exchanges", data),
  getMy: (params) => api.get("/exchanges/my", { params }),
  update: (id, data) => api.put(`/exchanges/${id}`, data),
  addFeedback: (id, data) => api.post(`/exchanges/${id}/feedback`, data),
  getById: (id) => api.get(`/exchanges/${id}`),
};
