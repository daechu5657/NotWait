<template>
  <transition name="blur">
    <p class="event_modal" v-if="$store.state.event_modal == 1" @click="off">
      {{ $store.state.event_text }}
    </p>
  </transition>
</template>

<script>
export default {
  methods: {
    off() {
      this.$store.commit('customer_modalOnOff', 'close');
      this.$store.commit('event_modalOnOff');
      if (this.$store.state.event_text == 'Please reconnect') {
        location.reload();
      }
    },
  },
};
</script>

<style>
.event_modal {
  position: absolute;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #0000006b;
  z-index: 100;
  backdrop-filter: blur(2px);
  text-align: center;
  line-height: calc(var(--vh, 1vh) * 100);
  font-size: 6vw;
  font-weight: 900;
  color: #f0f0f0;
}
.blur-enter-active {
  animation: blur 0.4s 0s 1 ease;
}
@keyframes blur {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
