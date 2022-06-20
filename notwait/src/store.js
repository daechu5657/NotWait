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
      owner_event_modal: 0,
      event_text: '',
      owner_event_text: '',
      review_modal: 0,
      review_index: 0,
      loading_modal: 1,
      owner_loading_modal: 0,
      table_modal: 0,
      table_index: 0,
      qr_modal: 0,
      //index
      talk_index: 0,
      customer_id: 0,
      //etc
      percentage: 0,
      blink: [],
    };
  },
  mutations: {
    menulistUpdate(state, payload) {
      state.menulist = payload.data[0].menu;
    },
    login(state, payload) {
      state.code = payload.data[0]._id;
      state.menulist = payload.data[0].menu;
      state.table = payload.data[1].table;
      var length = payload.data[1].table.length;
      let i;
      let v;
      for (i = 0; i < length; i++) {
        var length1 = state.table[i].orderlist.length;
        var length2 = state.table[i].talk.length;
        state.blink.push({
          table: 0,
          talk: 0,
          table_order: [],
          talk_order: [],
        });
        for (v = 0; v < length1; v++) {
          state.blink[i].table_order.push({ order: 0 });
        }
        for (v = 0; v < length2; v++) {
          state.blink[i].talk_order.push({ order: 0 });
        }
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
      state.table.push({
        orderlist: [],
        talk: [{ text: 'Welcome to #Dalha_min', index: 0 }],
        index: payload,
        cook: 0,
        call: 0,
      });
      state.blink.push({ table: 0, talk: 0, table_order: [], talk_order: [] });
    },
    table_del(state) {
      state.table.pop();
      state.blink.pop();
    },
    event_modalOnOff(state, payload) {
      if (state.event_modal == 1) {
        state.event_modal = 0;
      } else {
        state.event_text = payload;
        state.event_modal = 1;
      }
    },
    owner_event_modalOnOff(state, payload) {
      if (state.owner_event_modal == 1) {
        state.owner_event_modal = 0;
      } else {
        state.owner_event_text = payload;
        state.owner_event_modal = 1;
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
    owner_login_percentage(state, payload) {
      state.percentage = payload;
      state.owner_loading_modal = 1;
    },
    table_modalOnOff(state, payload) {
      if (state.table_modal == 1) {
        state.table_modal = 0;
      } else if (state.table_modal == 0) {
        state.table_index = payload;
        state.table_modal = 1;
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
      state.table[index].talk.push(contents[0]);
      if (contents[0].index == 1) {
        state.blink[index].talk = 1;
        state.blink[index].talk_order.push({ order: 1 });
      } else if (contents[0].index == 0) {
        state.blink[index].talk_order.push({ order: 0 });
      }
    },
    owner_orderlist_sync(state, payload) {
      if (state.table[payload.index].orderlist.length == 0) {
        state.table[payload.index].orderlist.push(
          Object.values(Object.values(payload.data)[0])[0]
        );
        state.blink[payload.index].table_order.push({ order: 1 });
        state.blink[payload.index].table = 1;
      } else {
        state.blink[payload.index].table_order.push({ order: 1 });
        state.blink[payload.index].table = 1;

        state.table[payload.index].orderlist.push(
          Object.values(payload.data)[0]
        );
      }
    },
    owner_cook_sync(state, payload) {
      state.table[payload.index].cook = Object.values(payload.data)[0];
    },
    review_sync(state, payload) {
      var n = Object.keys(payload).toString();
      let index = n.substr(5, 1);
      state.menulist[index].review.push(Object.values(payload)[0]);
    },
    orderlist_sync(state, payload) {
      var firstlength = Object.values(Object.values(payload)[0]).length;
      var length = Object.values(payload).length;
      var num;
      if (state.table.orderlist.length == 0) {
        for (num = 0; num < firstlength; num++) {
          state.table.orderlist.push(
            Object.values(Object.values(payload)[0])[num]
          );
        }
      } else {
        for (num = 0; num < length; num++) {
          state.table.orderlist.push(Object.values(payload)[num]);
        }
      }
    },
    cook_sync(state, payload) {
      state.table.cook = Object.values(payload);
    },
    owner_clear(state) {
      state.table[state.table_index].orderlist = [];
      state.table[state.table_index].talk = [
        { text: 'Welcome to #Dalha_min', index: 0 },
      ];
      state.table[state.table_index].call = 0;
      state.table[state.table_index].cook = 0;
      state.blink[state.table_index].table = 0;
      state.blink[state.table_index].talk = 0;
      state.blink[state.table_index].table_order = [];
      state.blink[state.table_index].talk_order = [{ order: 0 }];
    },
    clear(state) {
      state.table.orderlist = [];
      state.table.talk = [{ text: 'Welcome to #Dalha_min', index: 0 }];
      state.table.cook = 0;
      state.table.call = 0;
    },
    owner_call(state, payload) {
      if (Object.values(Object.values(payload.data))[0] == 1) {
        state.table[payload.index].call = 1;
      } else if (Object.values(Object.values(payload.data))[0] == 0) {
        state.table[payload.index].call = 0;
      }
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
    owner_login(context, payload) {
      axios
        .post(
          '/Login',
          { code: payload },
          {
            onDownloadProgress: ProgressEvent => {
              let percentage =
                (ProgressEvent.loaded * 100) / ProgressEvent.total;
              let percentcompleted = Math.round(percentage);
              context.commit('owner_login_percentage', percentcompleted);
            },
          }
        )
        .then(response => {
          if (response.data.length < 2) {
            context.commit('owner_event_modalOnOff', 'Please reconnect');
          } else if (response.data == 'Wrong information') {
            context.commit('owner_event_modalOnOff', 'Wrong information');
          } else if (response.data == 'Period is over') {
            context.commit('owner_event_modalOnOff', 'Period is over');
          } else {
            context.commit('login', response);
          }
        });
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
            context.commit('event_modalOnOff', 'Please reconnect');
          } else {
            context.commit('customerlogin', response);
          }
        });
    },
    talk_update(commit, payload) {
      var send;
      send = { text: payload, index: this.state.talk_index, talkindex: 0 };
      axios.post('/Talkupdate', send);
    },
    customer_talk_update(commit, payload) {
      var send;
      send = { text: payload, index: this.state.customer_id - 1, talkindex: 1 };
      axios.post('/Talkupdate', send);
    },
    orderlist_update(commit, payload) {
      var send = { index: this.state.customer_id, payload: payload };
      axios.post('/Orderlist', send);
    },
    orderlist_talk_clear() {
      axios.post('/Orderlist_talk_clear', { index: this.state.table_index });
    },
    review_update(commit, payload) {
      axios.post('/Review', payload);
    },
    cook_update(commit, payload) {
      if (this.state.table[payload.index].cook == 0) {
        axios.post('/Cook', { index: payload.index, cook: 1 });
      } else if (this.state.table[payload.index].cook == 1) {
        axios.post('/Cook', { index: payload.index, cook: 2 });
      } else if (this.state.table[payload.index].cook == 2) {
        axios.post('/Cook', { index: payload.index, cook: 0 });
      }
    },
    call_update(commit, payload) {
      if (payload != undefined) {
        axios.post('/Call_del', { index: payload.index });
      } else {
        axios.post('/Call', { index: this.state.customer_id - 1 });
      }
    },
    owner_customer_update(context, payload) {
      context.commit('customer_idsync', payload);
      var eventSource = new EventSource(`/Sync/${payload}`);
      eventSource.addEventListener('test', function (e) {
        var 문서 = JSON.parse(e.data);
        var n = Object.keys(문서).toString();
        let alpha = n.substr(0, 4);
        var val = Object.keys(문서);

        if (alpha == 'menu') {
          let vet = n.substr(7, 6);
          if (vet == 'review') {
            context.commit('review_sync', 문서);
          } else {
            context.commit('menulistSync', 문서);
          }
        } else if (alpha == 'tabl') {
          let vet = n.substr(8, 4);
          if (vet == 'talk') {
            if (Object.values(문서)[0][0] != undefined) {
              context.commit('clear');
            } else {
              context.commit('talk_sync', Object.values(문서));
            }
          } else if (vet == 'orde') {
            if (val.length == 2 || Object.values(문서)[0].length == 0) {
              context.commit('clear');
            } else {
              context.commit('orderlist_sync', 문서);
            }
          } else if (vet == 'cook') {
            context.commit('cook_sync', 문서);
          }
        }
      });
    },
    customer_owner_update(context) {
      var eventSource = new EventSource('/Owner/Sync');
      eventSource.addEventListener('test', function (e) {
        var 문서 = JSON.parse(e.data);
        var n = Object.keys(문서.data).toString();
        var val = Object.keys(문서.data);
        let alpha = n.substr(0, 4);
        if (alpha == 'tabl') {
          let vet = n.substr(8, 4);
          if (vet == 'talk') {
            if (Object.values(문서.data)[0][0] != undefined) {
              context.commit('owner_clear');
            } else {
              context.commit('owner_talk_sync', 문서);
            }
          } else if (vet == 'orde') {
            if (val.length == 2 || Object.values(문서.data)[0].length == 0) {
              context.commit('owner_clear');
            } else {
              context.commit('owner_orderlist_sync', 문서);
            }
          } else if (vet == 'cook') {
            context.commit('owner_cook_sync', 문서);
          } else if (vet == 'call') {
            context.commit('owner_call', 문서);
          }
        }
      });
    },
  },
});

export default store;
