<template>
  <div
    class="wrap"
    oncontextmenu="return false"
    ondragstart="return false"
    onselectstart="return false"
  >
    <div class="top-contents">
      <div class="top-name">#Dalha_min</div>
      <div class="table-number">Table &nbsp;{{ $route.params.id }}</div>
    </div>
    <div class="top-contents-sub">
      <div class="sub-text">
        Welcome<br />
        To #Dalha_min<br />
        Your special sweet day
      </div>
      <a class="insta" href="https://www.instagram.com/dalha_min/"></a>
    </div>
    <div class="contents-slider" ref="slider">
      <div class="contents-slider-inner" ref="inner" style="left: 0vw">
        <div class="menu-list">
          <p @click="$store.commit('customer_modalOnOff', 'menu')">Menu</p>
        </div>
        <div class="bill-list">
          <p @click="$store.commit('customer_modalOnOff', 'bill')">OrderList</p>
        </div>
        <div class="talk" @click="$store.commit('talk_modalOnOff', 1)">
          <p>Talk</p>
        </div>
        <div class="call"><p>Call</p></div>
      </div>
    </div>

    <CustomerModal />
    <CustomerTalk />
    <EventModal />
    <Cooking />
    <transition name="loading">
      <Loading />
    </transition>
  </div>
</template>

<script>
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
import CustomerModal from './CustomerModal.vue';
import CustomerTalk from './CustomerTalk.vue';
import EventModal from './EventModal.vue';
import Loading from './Loading.vue';
import Cooking from './Cooking.vue';
// import axios from 'axios';

export default {
  data() {
    return {};
  },
  components: {
    CustomerModal: CustomerModal,
    CustomerTalk: CustomerTalk,
    EventModal: EventModal,
    Loading: Loading,
    Cooking: Cooking,
  },
  methods: {},
  mounted() {
    let slider = this.$refs.slider;
    let innerslider = this.$refs.inner;
    let pressed = false;
    let startx; // eslint-disable-line no-unused-vars
    let x;
    let length;
    let innerleft = 0;
    slider.addEventListener('touchstart', e => {
      pressed = true;
      startx = e.touches[0].screenX - innerslider.offsetLeft;
      slider.style.cursor = 'grabbing';
      length = e.touches[0].clientX;
    });
    slider.addEventListener('touchend', () => {
      slider.style.cursor = 'default';
      pressed = false;
      if (x != 0) {
        if (x - length > 100) {
          if (parseInt(innerslider.style.left) == 0) {
            innerslider.style.left = '0vw';
            x = 0;
          } else {
            innerleft += 70;
            innerslider.style.left = `${innerleft}vw`;
            x = 0;
          }
        } else if (x - length < -100) {
          if (parseInt(innerslider.style.left) == -210) {
            innerslider.style.left = '-210vw';
            x = 0;
          } else {
            innerleft -= 70;
            innerslider.style.left = `${innerleft}vw`;
            x = 0;
          }
        }
      }
    });
    slider.addEventListener('touchmove', e => {
      if (!pressed) return;
      e.preventDefault();
      x = e.touches[0].clientX;
    });
  },
  created() {
    this.$store.dispatch('customer_login', this.$route.params.id);
    this.$store.dispatch('owner_customer_update', this.$route.params.id);
  },
};
</script>

<style>
.wrap {
  width: 100vw;
  background-color: #f0f0f0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);
}
.top-contents {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 5vw;
  top: calc(var(--vh, 1vh) * 2);
  position: relative;
  letter-spacing: 0.25vw;
}
.top-name {
  position: relative;
  text-align: center;
  font-size: 4vw;
  font-weight: 700;
}
.table-number {
  position: relative;
  text-align: center;
  font-size: 2.5vw;
  font-weight: 300;
  line-height: 5.5vw;
}

.top-contents-sub {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: calc(var(--vh, 1vh) * 7);
  position: relative;
  line-height: calc(var(--vh, 1vh) * 2.5);
}

.sub-text {
  position: relative;
  font-size: 2.5vw;
  font-weight: 300;
  letter-spacing: 0.1vw;
  text-align: right;
  padding-right: 4vw;
}
.insta {
  position: relative;
  width: 50vw;
  height: calc(var(--vh, 1vh) * 9);
  /* background-color: rgb(61, 82, 156); */
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  border-radius: 20px;
  background-image: url('../assets/insta.jpg');
  background-position: 52% 42%;
}

.mid-contents-wrap {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 37);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  top: calc(var(--vh, 1vh) * 30);
}
.contents-slider {
  position: absolute;
  overflow: hidden;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 16);
  top: calc(var(--vh, 1vh) * 26);
}
.contents-slider-inner {
  position: absolute;
  top: 0;
  left: 0vw;
  width: 300vw;
  height: 100%;
  transition: 0.3s ease;
  display: flex;
  flex-direction: row;
}
.menu-list {
  width: 60vw;
  height: calc(var(--vh, 1vh) * 14);
  position: relative;
  background-image: url('../assets/menu.jpg');
  background-size: cover;
  background-position: 53% 42%;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px,
    rgb(9 30 66 / 8%) 0px 0px 0px 1px;
  border-radius: 24px;
  text-align: center;
  line-height: calc(var(--vh, 1vh) * 14);
  cursor: pointer;
  margin-left: 20vw;
  margin-right: 10vw;
}

.menu-list > p {
  width: 100%;
  height: 100%;
  font-weight: 700;
  color: #ffffffe3;
  backdrop-filter: blur(10px);
  border-radius: 24px;
}

.bill-list {
  width: 60vw;
  height: calc(var(--vh, 1vh) * 14);
  position: relative;
  background-image: url('../assets/orderlist.jpg');
  background-size: cover;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px,
    rgb(9 30 66 / 8%) 0px 0px 0px 1px;
  border-radius: 24px;
  text-align: center;
  line-height: calc(var(--vh, 1vh) * 14);
  cursor: pointer;
  margin-right: 10vw;
}
.bill-list > p {
  width: 100%;
  height: 100%;
  font-weight: 700;
  color: #ffffffe3;
  backdrop-filter: blur(10px);
  border-radius: 24px;
}
.talk {
  width: 60vw;
  height: calc(var(--vh, 1vh) * 14);
  position: relative;
  background-image: url('../assets/talk.jpg');
  background-size: cover;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px,
    rgb(9 30 66 / 8%) 0px 0px 0px 1px;
  border-radius: 24px;
  text-align: center;
  line-height: calc(var(--vh, 1vh) * 14);
  cursor: pointer;
}

.talk > p {
  width: 100%;
  height: 100%;
  font-weight: 700;
  color: #ffffffe3;
  backdrop-filter: blur(10px);
  border-radius: 24px;
}

.call {
  width: 60vw;
  height: calc(var(--vh, 1vh) * 14);
  position: relative;
  background-image: url('../assets/call.jpg');
  background-size: cover;
  background-position: 50% 30%;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px,
    rgb(9 30 66 / 8%) 0px 0px 0px 1px;
  border-radius: 24px;
  text-align: center;
  line-height: calc(var(--vh, 1vh) * 15);
  cursor: pointer;
  margin-left: 10vw;
  margin-right: 10vw;
}
.call > p {
  width: 100%;
  height: 100%;
  font-weight: 700;
  color: #ffffffe3;
  backdrop-filter: blur(10px);
  border-radius: 24px;
}
</style>
