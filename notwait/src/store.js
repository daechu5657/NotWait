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
        state.review_modal = 0;
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
      state.table.push({ orderlist: [], talk: [], index: payload, cook: 0 });
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
        if (state.review_modal == 1) {
          state.review_modal = 0;
        } else {
          state.review_modal = 1;
        }
      } else {
        if (state.review_modal == 1) {
          state.review_modal = 0;
        } else {
          state.review_modal = 1;
        }
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
      state.menulist = payload.menu;
    },
    table_sync(state, payload) {
      state.table = payload;
    },
    talk_sync(state, payload) {
      state.table.talk.push(payload[0]);
    },
    owner_talk_sync(state, payload) {
      var index = payload.index;
      var contents = Object.values(payload.data);
      console.log(contents);
      state.table[index].talk.push(contents[0]);
    },
    review_sync(state, payload) {
      var n = Object.keys(payload).toString();
      let index = n.substr(5, 1);
      state.menulist[index].review.push(Object.values(payload)[0]);
    },
    orderlist_sync(state, payload) {
      var length = Object.values(payload).length;
      var num;
      for (num = 0; num < length; num++) {
        state.table.orderlist.push(Object.values(payload)[num]);
      }
    },
    cook_sync(state, payload) {
      state.table.cook = Object.values(payload);
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
    talk_update(commit, payload) {
      var send;
      send = { text: payload, index: this.state.talk_index, talkindex: 0 };
      axios.post('/Talkupdate', send);
      // axios.post('/Talkupdate', send).then(response => {
      //   context.commit('table_sync', response.data[0].table);
      // });
    },
    customer_talk_update(commit, payload) {
      var send;
      send = { text: payload, index: this.state.customer_id - 1, talkindex: 1 };
      axios.post('/Talkupdate', send);
      // axios.post('/Talkupdate', send).then(response => {
      //   context.commit(
      //     'table_sync',
      //     response.data[0].table[this.state.customer_id - 1]
      //   );
      // });
    },
    orderlist_update(commit, payload) {
      var send = { index: this.state.customer_id, payload: payload };
      axios.post('/Orderlist', send);
      // axios.post('/Orderlist', send).then(response => {
      //   context.commit(
      //     'table_sync',
      //     response.data[0].table[this.state.customer_id - 1]
      //   );
      // });
    },
    review_update(commit, payload) {
      axios.post('/Review', payload);
    },
    owner_customer_update(context, payload) {
      console.log('실시간업데이트');
      context.commit('customer_idsync', payload);
      var eventSource = new EventSource(`/Sync/${payload}`);
      eventSource.addEventListener('test', function (e) {
        var 문서 = JSON.parse(e.data);
        var n = Object.keys(문서).toString();
        let alpha = n.substr(0, 4);
        if (alpha == 'menu') {
          let vet = n.substr(7, 6);
          if (vet == 'review') {
            console.log('리뷰');
            context.commit('review_sync', 문서);
          } else {
            console.log('메뉴리스트');
            context.commit('menulistSync', 문서);
          }
        } else if (alpha == 'tabl') {
          let vet = n.substr(8, 4);
          if (vet == 'talk') {
            console.log('톡');
            context.commit('talk_sync', Object.values(문서));
          } else if (vet == 'orde') {
            console.log('주문');
            context.commit('orderlist_sync', 문서);
          } else if (vet == 'cook') {
            console.log('요리상태');
            context.commit('cook_sync', 문서);
          }
        }
      });
    },
    customer_owner_update(context) {
      console.log('실시간업데이트오너');
      var eventSource = new EventSource('/Owner/Sync');
      eventSource.addEventListener('test', function (e) {
        var 문서 = JSON.parse(e.data);
        var n = Object.keys(문서.data).toString();
        let alpha = n.substr(8, 3);
        if (alpha == 'tal') {
          context.commit('owner_talk_sync', 문서);
        } else if (alpha == 'ord') {
          console.log(문서);
        }
      });
    },
  },
});

export default store;
