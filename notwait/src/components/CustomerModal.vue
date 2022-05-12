<template>
  <div class="CustomerModal-wrap" v-if="modal == 1">
    <div class="CustomerModal-wrap-top"></div>
    <div class="CustomerModal-wrap-bottom" @click="xbtn"></div>
  </div>
</template>

<script>
export default {
  methods: {
    xbtn() {
      this.$emit('modaloff');
    },
  },
  props: {
    modal: Number,
    menu: Number,
    bill: Number,
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
.CustomerModal-wrap-top {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 80);
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
