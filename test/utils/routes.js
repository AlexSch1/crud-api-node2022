module.exports = {
  users: {
    getAll: '/api/users',
    getById: id => `/api/users/${id}`,
    create: '/api/users',
    update: id => `/api/users/${id}`,
    delete: id => `/api/users/${id}`
  },
};
