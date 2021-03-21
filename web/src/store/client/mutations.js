export default {
  SET_CLIENT(state, client) {
    state.client = client;
  },
  SET_CLIENTS(state, clients) {
    state.clients = clients;
  },
  REMOVE_CLIENT(state, itemId) {
    const clientIndex = state.clients.findIndex((client) => client.id === itemId);
    state.clients.splice(clientIndex, 1);
  },
  ADD_CLIENT(state, client) {
    state.students.push(client);
  },
};
