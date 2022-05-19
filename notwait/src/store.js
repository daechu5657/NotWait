import { createStore } from 'vuex';
import axios from 'axios';
//

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
      event_modal: 0,
      event_text: '',
      review_modal: 0,
      review_index: 0,
      loading_modal: 1,
      //index
      talk_index: 0,
      customer_id: 0,
      //etc
      percentage: 0,
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
    event_modalOnOff(state, payload) {
      if (state.event_modal == 1) {
        state.event_modal = 0;
      } else {
        state.event_text = payload;
        state.event_modal = 1;
      }
    },
    review_modalOnOff(state, payload) {
      if (payload != undefined) {
        state.review_index = payload;
      }
      if (state.review_modal == 1) {
        state.review_modal = 0;
      } else {
        state.review_modal = 1;
      }
    },
    login_percentage(state, payload) {
      state.percentage = payload;
    },
    loading_modalOnOff(state) {
      if (state.percentage == 100) {
        state.loading_modal = 0;
      }
    },
    //sync
    customer_idsync(state, payload) {
      state.customer_id = payload;
    },
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
        .post(
          '/LoginCustomer',
          { code: '1234', table: payload },
          {
            onDownloadProgress: ProgressEvent => {
              let percentage =
                (ProgressEvent.loaded * 100) / ProgressEvent.total;
              let percentcompleted = Math.round(percentage);
              context.commit('login_percentage', percentcompleted);
            },
          }
        )
        .then(response => {
          if (response.data.length < 2) {
            context.commit('event_modalOnOff', '재접속바랍니다');
          } else {
            context.commit('customerlogin', response);
          }
        });
    },
    talk_update(context, payload) {
      var send;
      send = { text: payload, index: this.state.talk_index };
      axios.post('/Talkupdate', send).then(response => {
        context.commit('table_sync', response.data[0].table);
      });
    },
    orderlist_update(context, payload) {
      var send = { index: this.state.customer_id, payload: payload };
      axios.post('/Orderlist', send).then(response => {
        context.commit(
          'table_sync',
          response.data[0].table[this.state.customer_id - 1]
        );
      });
    },
    review_update(context, payload) {
      console.log(payload);
      axios.post('/Review', payload).then(response => {
        console.log(response);
        context.commit('menulistSync', response.data[0].menu);
      });
    },
    owner_customer_update(context, payload) {
      console.log('실시간업데이트');
      context.commit('customer_idsync', payload);
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
