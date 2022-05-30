<template>
  <div class="CustomerModal-wrap" id="animate">
    <div class="top-decoration" id="top-deco">|&nbsp;|</div>
    <transition name="menu">
      <div class="menulist" v-if="$store.state.customer_menu == 1">
        <div
          class="CustomerModal-wrap-top-m"
          v-if="$store.state.customer_menu == 1"
        >
          <div
            class="CustomerModal-wrap-top-menulist"
            v-for="(a, i) in $store.state.menulist"
            :key="i"
          >
            <div
              class="CustomerModal-wrap-top-menulist-img"
              :style="{
                backgroundImage: `url('${$store.state.menulist[i].img}')`,
              }"
            ></div>
            <div class="CustomerModal-wrap-top-menulist-bottom">
              <p class="menuname">{{ $store.state.menulist[i].menuname }}</p>
              <p class="menusubtext">
                {{ $store.state.menulist[i].menusubtext }}
              </p>
              <p class="menuprice">
                {{ $store.state.menulist[i].price }} &nbsp;Won
              </p>
            </div>
            <div
              class="review"
              @click="$store.commit('review_modalOnOff', i)"
            ></div>
            <div class="basketpush" @click="push(i)">+</div>
          </div>
        </div>
        <div
          class="CustomerModal-wrap-footer"
          v-if="$store.state.customer_menu == 1"
        >
          <div class="footer-items">
            <p class="not-items" v-if="orderlist.length == 0">Nothing</p>
            <div
              class="CustomerModal-wrap-top-basket"
              v-for="(a, i) in orderlist"
              :key="i"
            >
              <div class="basket-del" v-if="delN == 1" @click="delbasket(i)">
                -
              </div>
              <p class="basket-menuname">{{ orderlist[i].menuname }}</p>
              <p class="basket-price">
                {{ orderlist[i].price * orderlist[i].number }}&nbsp;Won
              </p>
              <div class="basket-picker">
                <div class="basket-up" @click="up(i)">△</div>
                <div class="basket-number">{{ orderlist[i].number }}</div>
                <div class="basket-down" @click="down(i)">▽</div>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <div class="delstring" @click="del">{{ delS }}</div>
            <div class="footer-total-price">{{ totalprice }}&nbsp; Won</div>
            <div @click="submit">Order</div>
            <div @click="$store.commit('customer_modalOnOff', 'close')">
              Close
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="menu">
      <div class="bill" v-if="$store.state.customer_bill == 1">
        <div class="CustomerModal-wrap-top-logo">#Dalha_min</div>
        <div class="CustomerModal-wrap-top-middle">
          <div
            class="CustomerModal-wrap-top-t"
            v-if="$store.state.customer_bill == 1"
            id="bill"
          >
            <div
              class="CustomerModal-wrap-top-table"
              v-for="(a, i) in $store.state.table.orderlist"
              :key="i"
            >
              <p class="orderlist-menuname">
                {{ $store.state.table.orderlist[i].menuname }}
              </p>
              <p class="orderlist-number">
                {{ $store.state.table.orderlist[i].number }}
              </p>
              <p class="orderlist-price">
                {{
                  Number($store.state.table.orderlist[i].price) *
                  Number($store.state.table.orderlist[i].number)
                }}
              </p>
            </div>
            <div
              class="middle-total"
              v-bind:class="{
                topoff: $store.state.table.orderlist.length == 0,
              }"
            >
              <p>Total</p>
              <p>{{ totalbill }}</p>
            </div>
          </div>
        </div>
        <div
          class="CustomerModal-wrap-top-bottom"
          @click="$store.commit('customer_modalOnOff', 'close')"
        >
          Close
        </div>
      </div>
    </transition>
    <transition name="review">
      <Review v-if="$store.state.review_modal == 1" />
    </transition>
  </div>
</template>

<script>
import Review from './Review.vue';
export default {
  data() {
    return {
      orderlist: [],
      totalprice: 0,
      delN: 0,
      delS: 'Del Off',
      totalbill: 0,
    };
  },
  components: {
    Review: Review,
  },
  methods: {
    push(i) {
      var overlap = this.$store.state.menulist[i].menuname;
      var result = 0;
      for (let i = 0; i < this.orderlist.length; i++) {
        const menuname = this.orderlist[i].menuname;
        if (menuname == overlap) {
          result = 1;
        }
      }
      if (result != 1) {
        this.orderlist.push({
          menuname: this.$store.state.menulist[i].menuname,
          price: this.$store.state.menulist[i].price,
          number: 1,
        });
      }
    },
    up(i) {
      this.orderlist[i].number++;
    },
    down(i) {
      if (this.orderlist[i].number == 1) {
        this.orderlist[i].number = 1;
      } else {
        this.orderlist[i].number--;
      }
    },
    del() {
      if (this.delN == 0) {
        this.delN = 1;
        this.delS = 'Del On';
      } else {
        this.delN = 0;
        this.delS = 'Del Off';
      }
    },
    submit() {
      this.$store.dispatch('orderlist_update', this.orderlist);
      this.$store.commit('event_modalOnOff', 'Order completed');
      this.orderlist = [];
    },
    delbasket(i) {
      this.orderlist.splice(i, 1);
    },
  },
  computed: {
    modal() {
      return this.$store.state.customer_modal;
    },
    billtotal() {
      return this.$store.state.table.orderlist;
    },
  },
  watch: {
    modal(val) {
      var doc = document.getElementById('animate');
      var doc1 = document.getElementById('top-deco');
      if (val == 1) {
        doc.classList.add('start');
      } else {
        doc.classList.remove('start');
        doc1.classList.add('end-deco');
        setTimeout(() => {
          doc1.classList.remove('end-deco');
        }, 400);
      }
    },
    orderlist: {
      deep: true,
      handler() {
        var n = this.orderlist.length;
        var i;
        this.totalprice = 0;
        for (i = 0; i < n; i++) {
          this.totalprice +=
            parseInt(this.orderlist[i].price) *
            parseInt(this.orderlist[i].number);
        }
      },
    },
    billtotal: {
      deep: true,
      handler() {
        var n = this.$store.state.table.orderlist.length;
        var i;
        this.totalbill = 0;
        for (i = 0; i < n; i++) {
          this.totalbill +=
            parseInt(this.$store.state.table.orderlist[i].price) *
            parseInt(this.$store.state.table.orderlist[i].number);
        }
      },
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');
.CustomerModal-wrap {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 4);
  position: absolute;
  top: calc(var(--vh, 1vh) * 96);
  z-index: 1;
}
.top-decoration {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 4);
  position: relative;
  background-color: #f0f0f0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  /* border: 1px solid rgba(0, 0, 0, 0.381); */
  text-align: center;
  font-size: 3vw;
  color: rgba(0, 0, 0, 0.381);
  font-weight: 900;
  line-height: calc(var(--vh, 1vh) * 4);
  top: 1px;
}
.CustomerModal-wrap-top-m {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 65);
  position: relative;
  background-color: #f0f0f0;
  overflow: scroll;
  /* border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid; */
}
.CustomerModal-wrap-top-menulist {
  position: relative;
  width: 90vw;
  height: calc(var(--vh, 1vh) * 10);
  background-color: #e4e4e400;
  border-radius: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  left: 5vw;
  margin-bottom: 5vw;
  box-shadow: 0 2px 8px -2px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  top: 3px;
}
.CustomerModal-wrap-top-menulist-img {
  width: calc(var(--vh, 1vh) * 9);
  height: calc(var(--vh, 1vh) * 9);
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}
.menuname {
  font-size: 3vw;
  font-weight: 900;
  color: #21211f;
}
.menusubtext {
  font-size: 2vw;
  font-weight: 300;
  color: #5a5a58;
}
.menuprice {
  font-size: 2.5vw;
  font-weight: 900;
  color: #21211f;
}
.CustomerModal-wrap-top-menulist-bottom {
  width: 40vw;
  height: calc(var(--vh, 1vh) * 9);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.CustomerModal-wrap-footer {
  position: fixed;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 31);
  background-color: #e6e6e6;
  overflow: scroll;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 30px 1px,
    rgb(9 30 66 / 8%) 0px 0px 0px 1px;
}
.footer-items {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 25);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}
.not-items {
  text-align: center;
  font-size: 4vw;
  color: #97979675;
  margin: auto;
}
.CustomerModal-wrap-top-basket {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 96vw;
  left: 2vw;
  padding: 0 3vw;
  position: relative;
  margin: 2vw 0;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  border-radius: 24px;
  transition: 0.5s ease;
}
.basket-del {
  width: 30px;
  height: 20px;
  background-color: #c51e1e;
  border-radius: 50%;
  font-size: 6vw;
  text-align: center;
  line-height: 20px;
  margin: 0 1vw;
}
.basket-menuname {
  width: 80vw;
  font-size: 4vw;
}
.basket-price {
  font-size: 3.5vw;
}
.basket-number {
  font-size: 3.5vw;
}
.basket-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 4vw;
}
.basket-up {
  font-size: 4.5vw;
}
.basket-down {
  font-size: 4.5vw;
}
.footer-bottom {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 6);
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 3vw;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px,
    rgb(9 30 66 / 8%) 0px 0px 0px 1px;
}
.delstring {
  width: 15vw;
}
.footer-total-price {
  width: 35vw;
}
.basketpush {
  font-size: 6vw;
  font-weight: 300;
  color: #21211f;
  width: 5vw;
}
.review {
  background-image: url('../assets/review.png');
  width: 5vw;
  height: calc(var(--vh, 1vh) * 3);
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  top: calc(var(--vh, 1vh) * 0.3);
}
.basket-img {
  width: calc(var(--vh, 1vh) * 10);
  height: calc(var(--vh, 1vh) * 10);
  border-radius: 25%;
  background-repeat: no-repeat;
  background-position: center;
}
.CustomerModal-wrap-top-t {
  width: inherit;
  height: inherit;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

.CustomerModal-wrap-top-t {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.CustomerModal-wrap-top-t::-webkit-scrollbar {
  display: none;
}
.CustomerModal-wrap-top-table {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5vw 0;
}

.menu-leave-active {
  animation: down 0.4s 0s 1 ease;
  animation-fill-mode: backwards;
}
.start {
  animation: up 0.4s 0s 1 ease;
  animation-fill-mode: forwards;
}
.end-deco {
  animation: down-deco 0.4s 0s 1 ease;
  animation-fill-mode: backwards;
}
@keyframes up {
  0% {
    height: calc(var(--vh, 1vh) * 0);
    transform: translateY(0);
  }
  100% {
    height: calc(var(--vh, 1vh) * 100);
    transform: translateY(calc(var(--vh, 1vh) * -96));
  }
}
@keyframes down {
  0% {
    height: calc(var(--vh, 1vh) * 100);
    transform: translateY(calc(var(--vh, 1vh) * -96));
  }
  100% {
    height: calc(var(--vh, 1vh) * 0);
    transform: translateY(0);
  }
}
@keyframes down-deco {
  0% {
    transform: translateY(calc(var(--vh, 1vh) * -96));
  }
  100% {
    transform: translateY(0);
  }
}
.review-enter-active {
  animation: review 0.3s 0s 1 ease;
}
.review-leave-active {
  animation: review 0.3s 0s 1 ease reverse;
}
@keyframes review {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.CustomerModal-wrap-top-logo {
  position: relative;
  left: 10vw;
  font-size: 10vw;
  color: #21211f;
  font-weight: 700;
  text-align: center;
  width: 80vw;
  height: calc(var(--vh, 1vh) * 10);
  line-height: calc(var(--vh, 1vh) * 10);
}
.CustomerModal-wrap-top-middle {
  position: relative;
  left: 10vw;
  font-size: 3vw;
  font-family: Abel, sans-serif;
  width: 80vw;
  height: calc(var(--vh, 1vh) * 80);
  border-top: 1px dotted #21211f;
}
.bill {
  background-color: #f0f0f0;
}
.CustomerModal-wrap-top-bottom {
  position: absolute;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 6);
  text-align: center;
  line-height: calc(var(--vh, 1vh) * 6);
  font-size: 3vw;
}
.orderlist-menuname {
  width: 60vw;
  text-align: left;
}
.orderlist-number {
  width: 5vw;
  text-align: center;
}
.orderlist-price {
  width: 15vw;
  text-align: right;
}
.middle-total {
  width: 80vw;
  height: calc(var(--vh, 1vh) * 7);
  line-height: calc(var(--vh, 1vh) * 7);
  position: relative;
  border-top: 1px dotted #21211f;
  border-bottom: 1px dotted #21211f;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.topoff {
  border-top: 0;
}
</style>
