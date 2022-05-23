<template>
  <div class="CustomerModal-wrap" id="animate">
    <div class="top-decoration" id="top-deco"></div>
    <transition name="menu">
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
            :style="{
              backgroundImage: `url('${$store.state.menulist[i].img}')`,
            }"
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
        <button @click="$store.commit('customer_modalOnOff', 'close')">
          닫기
        </button>
      </div>
    </transition>
    <transition name="menu">
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
          <p>{{ $store.state.table.orderlist[i].menuname }}</p>
          <p>{{ $store.state.table.orderlist[i].number }}</p>
          <p>
            {{
              Number($store.state.table.orderlist[i].price) *
              Number($store.state.table.orderlist[i].number)
            }}
          </p>
        </div>
        <button @click="$store.commit('customer_modalOnOff', 'close')">
          닫기
        </button>
      </div>
    </transition>
    <Review v-if="$store.state.customer_modal == 1" />
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
  computed: {
    modal() {
      return this.$store.state.customer_modal;
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
  },
};
</script>

<style>
.CustomerModal-wrap {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 4);
  position: absolute;
  top: calc(var(--vh, 1vh) * 96);
}
.top-decoration {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 4);
  background-color: aquamarine;
  position: relative;
}
.CustomerModal-wrap-top-m {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 96);
  background-color: cadetblue;
  position: relative;
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
  height: calc(var(--vh, 1vh) * 96);
  background-color: cadetblue;
  position: relative;
}
.CustomerModal-wrap-top-table {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.menu-leave-active {
  animation: down 0.4s 0s 1 ease;
}
.start {
  animation: up 0.4s 0s 1 ease;
  animation-fill-mode: forwards;
}
.end-deco {
  animation: down-deco 0.4s 0s 1 ease;
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
</style>
