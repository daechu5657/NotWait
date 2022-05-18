<template>
  <div class="wrap">
    <div class="table-number">{{ $route.params.id }}번테이블</div>
    <div class="list">
      <div class="menu-list">
        <p @click="$store.commit('customer_modalOnOff', 'menu')">메뉴판</p>
      </div>
      <div class="bill-list">
        <div
          class="bill-list-top"
          @click="$store.commit('customer_modalOnOff', 'bill')"
        >
          주문내역
        </div>
      </div>
    </div>
    <div class="counter">
      <div class="talk-counter" @click="$store.commit('talk_modalOnOff', 1)">
        요청사항
      </div>
      <div class="call-counter">호출</div>
    </div>
    <CustomerModal />
    <CustomerTalk />
    <EventModal />
  </div>
</template>

<script>
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
import CustomerModal from './CustomerModal.vue';
import CustomerTalk from './CustomerTalk.vue';
import EventModal from './EventModal.vue';
// import axios from 'axios';
export default {
  data() {
    return {};
  },
  components: {
    CustomerModal: CustomerModal,
    CustomerTalk: CustomerTalk,
    EventModal: EventModal,
  },
  methods: {},
  created() {
    this.$store.dispatch('customer_login', this.$route.params.id);
    this.$store.dispatch('owner_customer_update', this.$route.params.id);
  },
};
</script>

<style>
.wrap {
  width: 100vw;
  background-color: #898989;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);
}
.table-number {
  width: 100%;
  height: calc(var(--vh, 1vh) * 5);
  border: 1px solid;
  /* margin: 1--vh 0; */
  text-align: center;
  line-height: calc(var(--vh, 1vh) * 5);
}
.list {
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 80);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.menu-list {
  width: 40vw;
  height: calc(var(--vh, 1vh) * 80);
  position: relative;
  left: 5.5px;
}
.menu-list > p {
  width: 100%;
  height: calc(var(--vh, 1vh) * 2);
  border: 1px solid;
}

.menu-list-top > span {
  height: calc(var(--vh, 1vh) * 2);
  font-size: 3vw;
}

.bill-list {
  width: 40vw;
  height: calc(var(--vh, 1vh) * 80);
  position: relative;
  right: 5.5px;
}
.bill-list-top {
  width: inherit;
  height: calc(var(--vh, 1vh) * 6);
  border: 1px solid;
}
.counter {
  width: 100%;
  height: calc(var(--vh, 1vh) * 15);
  border: 1px solid;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
