import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      code: '',
      menulist: [],
      menulist_modal: 0,
      login_modal: 0,
    };
  },
  mutations: {
    menulistUpdate(state, payload) {
      state.menulist = payload.data[0].menu;
    },
    login(state, payload) {
      if (payload.data == '틀려유') {
        alert('틀려유');
      } else if (payload.data == '돈내야지') {
        alert('돈내야지');
      } else {
        state.code = payload.data[0]._id;
        state.menulist = payload.data[0].menu;
        state.login_modal = 1;
      }
    },
    menulist_modalOnOff(state) {
      if (state.menulist_modal == 1) {
        state.menulist_modal = 0;
      } else {
        state.menulist_modal = 1;
      }
    },
  },
});

export default store;
