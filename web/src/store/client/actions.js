import axios from '../../services/axios';

export default {
  index: async ({ commit }) => {
    try {
      const { data } = await axios.get('/clients');

      commit('SET_CLIENTS', data);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  show: async (context, id) => {
    try {
      const { data } = await axios.get(`/clients/${id}`);

      return Promise.resolve(data);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  store: async ({ commit }, payload) => {
    try {
      const student = await axios.post('/clients', payload);

      commit('ADD_CLIENT', student);

      return Promise.resolve(student);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  update: async (context, { data, id }) => {
    try {
      const student = await axios.put(`/clients/${id}`, data);

      return Promise.resolve(student);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  destroy: async ({ commit }, id) => {
    try {
      await axios.delete(`/clients/${id}`);

      commit('REMOVE_CLIENT', id);

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
