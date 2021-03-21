import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  isRegistered: true,
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
