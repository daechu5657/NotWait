<template>
  <p class="event_modal" v-if="$store.state.event_modal == 1" @click="off">
    {{ $store.state.event_text }}
  </p>
</template>

<script>
export default {
  methods: {
    off() {
      this.$store.commit('customer_modalOnOff', 'close');
      this.$store.commit('event_modalOnOff');
    },
  },
};
</script>

<style>
.event_modal {
  position: absolute;
  width: calc(var(--vh, 1vh) * 10);
  height: calc(var(--vh, 1vh) * 10);
  top: 0;
  left: 0;
  background-color: bisque;
}
</style>
