<template>
  <div class="CustomerModal-wrap" v-if="$store.state.customer_modal == 1">
    <div
      class="CustomerModal-wrap-top-m"
      v-if="$store.state.customer_menu == 1"
    >
      <div
        class="CustomerModal-wrap-top-menulist"
        v-for="(a, i) in $store.state.menulist"
        :key="i"
      >
        <p>{{ $store.state.menulist[i].menuname }}</p>
        <p>{{ $store.state.menulist[i].menusubtext }}</p>
        <p>{{ $store.state.menulist[i].price }}</p>
        <div
          class="CustomerModal-wrap-top-menulist-img"
          :style="{ backgroundImage: `url('${$store.state.menulist[i].img}')` }"
        ></div>
        <button @click="$store.commit('review_modalOnOff', i)">
          리뷰보고 쓰기
        </button>
        <button @click="push(i)">장바구니추가</button>
      </div>
      <p>-------line--------</p>
      <div
        class="CustomerModal-wrap-top-basket"
        v-for="(a, i) in orderlist"
        :key="i"
      >
        <p>{{ orderlist[i].menuname }}</p>
        <div class="basket-picker">
          <div class="basket-up" @click="up(i)">up</div>
          <div class="basket-number">{{ orderlist[i].number }}</div>
          <div class="basket-down" @click="down(i)">down</div>
        </div>
      </div>
      <button @click="submit">주문</button>
      <button @click="refresh">장바구니 초기화</button>
    </div>
    <div
      class="CustomerModal-wrap-top-t"
      v-if="$store.state.customer_bill == 1"
    >
      <div
        class="CustomerModal-wrap-top-table"
        v-for="(a, i) in $store.state.table.orderlist"
        :key="i"
      >
        <p>{{ $store.state.table.orderlist[i].menuname }}</p>
        <p>{{ $store.state.table.orderlist[i].number }}</p>
        <p>
          {{
            Number($store.state.table.orderlist[i].price) *
            Number($store.state.table.orderlist[i].number)
          }}
        </p>
      </div>
    </div>
    <div
      class="CustomerModal-wrap-bottom"
      @click="$store.commit('customer_modalOnOff', 'close')"
    ></div>
    <Review />
  </div>
</template>

<script>
import Review from './Review.vue';
export default {
  data() {
    return {
      orderlist: [],
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
      }
      this.orderlist[i].number--;
    },
    refresh() {
      this.orderlist = [];
    },
    submit() {
      this.$store.dispatch('orderlist_update', this.orderlist);
      this.$store.commit('event_modalOnOff', '주문이 완료되었습니다');
      this.orderlist = [];
    },
  },
};
</script>

<style>
.CustomerModal-wrap {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 91);
  position: absolute;
  top: calc(var(--vh, 1vh) * 5);
}
.CustomerModal-wrap-top-m {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 80);
  background-color: cadetblue;
}
.CustomerModal-wrap-top-menulist-img {
  width: calc(var(--vh, 1vh) * 10);
  height: calc(var(--vh, 1vh) * 10);
  border-radius: 25%;
  background-repeat: no-repeat;
  background-position: center;
}
.basket-img {
  width: calc(var(--vh, 1vh) * 10);
  height: calc(var(--vh, 1vh) * 10);
  border-radius: 25%;
  background-repeat: no-repeat;
  background-position: center;
}
.CustomerModal-wrap-top-t {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 80);
  background-color: cadetblue;
}
.CustomerModal-wrap-top-table {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.CustomerModal-wrap-bottom {
  position: relative;
  width: 18vw;
  height: 18vw;
  background-color: #c4abab;
  border-radius: 50%;
  left: 41vw;
}
</style>
