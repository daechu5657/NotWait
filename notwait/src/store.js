import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      code: '',
      menulist: [],
      table: [],
      customer_menu: 0,
      customer_bill: 0,
      //modal
      customer_modal: 0,
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
        state.table = payload.data[1].table;
        //modal
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
    table_sync(state, payload) {
      state.table = payload;
    },
    table_push(state) {
      state.table.push({ orderlist: [] });
    },
    table_del(state) {
      state.table.pop();
    },
    customer_modalOnOff(state, payload) {
      if (payload == 'menu') {
        state.customer_menu = 1;
        state.customer_modal = 1;
      } else if (payload == 'bill') {
        state.customer_bill = 1;
        state.customer_modal = 1;
      } else if (payload == 'close') {
        state.customer_menu = 0;
        state.customer_bill = 0;
        state.customer_modal = 0;
      }
    },
  },
  actions: {
    table_update(context, payload) {
      if (payload == 1) {
        context.commit('table_push');
        axios.post('/Tableupdate', context.state.table).then(response => {
          context.commit('table_sync', response.data[0].table);
        });
      } else {
        context.commit('table_del');
        axios.post('/Tableupdate', context.state.table).then(response => {
          context.commit('table_sync', response.data[0].table);
        });
      }
    },
  },
});

export default store;
