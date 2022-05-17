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
      talk_modal: 0,
      talk_index: 0,
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
    customerlogin(state, payload) {
      state.menulist = payload.data[0];
      state.table = payload.data[1];
    },
    //modal
    menulist_modalOnOff(state) {
      if (state.menulist_modal == 1) {
        state.menulist_modal = 0;
      } else {
        state.menulist_modal = 1;
      }
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
    talk_modalOnOff(state, payload) {
      if (payload != undefined) {
        state.talk_index = payload;
      }
      if (state.talk_modal == 1) {
        state.talk_modal = 0;
      } else {
        state.talk_modal = 1;
      }
    },
    table_push(state, payload) {
      state.table.push({ orderlist: [], talk: [], index: payload });
    },
    table_del(state) {
      state.table.pop();
    },
    //sync
    menulistSync(state, payload) {
      state.menulist = payload;
    },
    table_sync(state, payload) {
      state.table = payload;
    },
    talk_sync(state, payload) {
      state.table.talk.push(payload[0]);
    },
  },
  actions: {
    table_update(context, payload) {
      if (payload.value == 1) {
        context.commit('table_push', payload.index);
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
    customer_login(context, payload) {
      axios
        .post('/LoginCustomer', { code: '1234', table: payload })
        .then(response => {
          context.commit('customerlogin', response);
        });
    },
    talk_update(context, payload) {
      var send;
      send = { text: payload, index: this.state.talk_index };
      axios.post('/Talkupdate', send).then(response => {
        context.commit('table_sync', response.data[0].table);
      });
    },
    owner_customer_update(context, payload) {
      var eventSource = new EventSource(`/Sync/${payload}`);
      eventSource.addEventListener('test', function (e) {
        var 문서 = JSON.parse(e.data);
        if (Object.keys(문서) == 'menu') {
          context.commit('menulistSync', 문서.menu);
        } else if (Object.keys(문서) === 'table') {
          context.commit('table_sync', 문서.table);
        } else {
          context.commit('talk_sync', Object.values(문서));
        }
      });
    },
  },
});

export default store;
