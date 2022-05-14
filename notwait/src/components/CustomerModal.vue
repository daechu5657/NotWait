<template>
  <div class="CustomerModal-wrap" v-if="$store.state.customer_modal == 1">
    <div class="CustomerModal-wrap-top">
      <p>1{{ $store.state.menulist }}</p>
      <div
        class="CustomerModal-wrap-top-menulist"
        v-for="(a, i) in $store.state.menulist"
        :key="i"
      >
        <p>{{ $store.state.menulist[i].menuname }}</p>
        <p>{{ $store.state.menulist[i].price }}</p>
      </div>
    </div>
    <div
      class="CustomerModal-wrap-bottom"
      @click="$store.commit('customer_modalOnOff', 'close')"
    ></div>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style>
.CustomerModal-wrap {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 91);
  position: absolute;
  top: calc(var(--vh, 1vh) * 5);
}
.CustomerModal-wrap-top {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 80);
  background-color: cadetblue;
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
