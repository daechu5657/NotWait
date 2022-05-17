<template>
  <div class="wrap">
    <div class="table-number">{{ $route.params.id }}번테이블</div>
    <div class="list">
      <div class="menu-list">
        <p>메뉴판</p>
        <div
          class="menu-list-top"
          @click="$store.commit('customer_modalOnOff', 'menu')"
        >
          <span>메뉴1 닭볶음탕 16000원</span>
        </div>
        <div class="menu-list-bottom">
          <div class="menu-list-bottom-basket">
            <span>음식명</span>
            <input type="text" name="" placeholder="수량" />
            <button>삭제</button>
          </div>
          <button>장바구니 초기화</button>
          <button>주문</button>
        </div>
      </div>
      <div class="bill-list">
        <div
          class="bill-list-top"
          @click="$store.commit('customer_modalOnOff', 'bill')"
        >
          계산서
        </div>
        <div class="bill-list-middle">주문내역</div>
        <div class="bill-list-bottom">총금액</div>
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
  </div>
</template>

<script>
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
import CustomerModal from './CustomerModal.vue';
import CustomerTalk from './CustomerTalk.vue';
// import axios from 'axios';
export default {
  data() {
    return {};
  },
  components: {
    CustomerModal: CustomerModal,
    CustomerTalk: CustomerTalk,
  },
  methods: {},
  created() {
    this.$store.dispatch('customer_login', this.$route.params.id);
    this.$store.dispatch('owner_customer_update', this.$route.params.id);
    // var eventSource = new EventSource(`/Sync/${this.$route.params.id}`);
    // eventSource.addEventListener('test', function (e) {
    //   console.log(JSON.parse(e.data));
    // });
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
  border: 1px solid;
  position: relative;
  left: 5.5px;
}
.menu-list > p {
  width: 100%;
  height: calc(var(--vh, 1vh) * 2);
  border: 1px solid;
}
.menu-list-top {
  width: 40vw;
  height: calc(var(--vh, 1vh) * 40);
  border: 1px solid;
  position: relative;
  display: flex;
  flex-direction: column;
}

.menu-list-top > span {
  height: calc(var(--vh, 1vh) * 2);
  font-size: 3vw;
}

.menu-list-bottom-basket {
  height: calc(var(--vh, 1vh) * 35);
  width: inherit;
  border: 1px solid;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.menu-list-bottom-basket > span {
  height: calc(var(--vh, 1vh) * 2);
}
.menu-list-bottom-basket > input {
  width: 7vw;
  height: calc(var(--vh, 1vh) * 2);
}
.menu-list-bottom-basket > button {
  height: calc(var(--vh, 1vh) * 2);
}

.bill-list {
  width: 40vw;
  height: calc(var(--vh, 1vh) * 80);
  border: 1px solid;
  position: relative;
  right: 5.5px;
}
.bill-list-top {
  width: inherit;
  height: calc(var(--vh, 1vh) * 6);
  border: 1px solid;
}
.bill-list-middle {
  width: inherit;
  height: calc(var(--vh, 1vh) * 60);
  border: 1px solid;
  /* margin: 2vh 0; */
}
.bill-list-bottom {
  width: inherit;
  height: calc(var(--vh, 1vh) * 10);
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
