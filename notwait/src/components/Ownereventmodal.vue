<template>
  <transition name="owner_event_modal">
    <p
      class="owner_event_modal"
      v-if="$store.state.owner_event_modal == 1"
      @click="off"
    >
      {{ $store.state.owner_event_text }}
    </p>
  </transition>
</template>

<script>
export default {
  methods: {
    off() {
      this.$store.commit('owner_event_modalOnOff');
      location.reload();
    },
  },
};
</script>

<style>
.owner_event_modal {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: transparent;
  z-index: 100;
  backdrop-filter: blur(2px);
  text-align: center;
  line-height: 100vh;
  font-size: 6vw;
  font-weight: 900;
  color: #f0f0f0;
  background-color: #0000006b;
}
.owner_event_modal-enter-active {
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
