<template>
  <div class="CustomerTalk-wrap">
    <div class="CustomerTalk-top" id="scroll">
      <div
        :class="`CustomerTalk-top-repeat${a.index}`"
        v-for="(a, i) in $store.state.table.talk"
        :key="i"
      >
        <span :class="`repeat${a.index}`">{{ a.text }}</span>
      </div>
    </div>
    <div class="CustomerTalk-bottom">
      <div
        class="CustomerTalk-bottom-left"
        @click="$store.commit('talk_modalOnOff', 0)"
      >
        <!-- &lt; -->
        &rarr;
      </div>
      <div class="CustomerTalk-bottom-right">
        <input
          class="CustomerTalk-bottom-input"
          type="text"
          v-model="send"
          spellcheck="false"
          @keyup.enter="data"
        />
        <div class="CustomerTalk-bottom-send" @click="data">&gt;</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      send: '',
    };
  },
  methods: {
    data() {
      this.$store.dispatch('customer_talk_update', this.send);
      this.send = '';
    },
  },
  computed: {
    scroll() {
      return this.$store.state.table.talk;
    },
  },
  watch: {
    scroll: {
      deep: true,
      handler() {
        var a = document.getElementById('scroll');
        setTimeout(() => {
          a.scrollTop = a.scrollHeight;
        }, 100);
      },
    },
  },
  mounted() {
    this.$nextTick(function () {
      var a = document.getElementById('scroll');
      a.scrollTop = a.scrollHeight;
    });
  },
};
</script>

<style>
.CustomerTalk-wrap {
  position: absolute;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  z-index: 1;
  font-family: Abel, sans-serif;
}
.CustomerTalk-top {
  position: relative;
  left: 5vw;
  top: calc(var(--vh, 1vh) * 2);
  width: 90vw;
  height: calc(var(--vh, 1vh) * 83);
  overflow: scroll;
  overflow-x: hidden;
  padding: 5vw 0;
  font-size: 4vw;
  border-top: 1px dotted #21211f;
  border-bottom: 1px dotted #21211f;
}
.CustomerTalk-top::-webkit-scrollbar {
  display: none;
}
.CustomerTalk-bottom {
  position: relative;
  top: calc(var(--vh, 1vh) * 4);
  left: 5vw;
  width: 90vw;
  height: calc(var(--vh, 1vh) * 11);
  border-radius: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.CustomerTalk-bottom-right {
  position: relative;
  width: 70vw;
  height: calc(var(--vh, 1vh) * 6);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px dotted #21211f;
}
.CustomerTalk-bottom-input {
  width: 60vw;
  height: calc(var(--vh, 1vh) * 6);
  background-color: transparent;
  outline: none;
  border: none;
  text-align: center;
  border-right: 1px dotted #21211f;
}
.CustomerTalk-bottom-send {
  width: 20vw;
  height: calc(var(--vh, 1vh) * 6);
  font-size: 6vw;
  line-height: calc(var(--vh, 1vh) * 6);
  text-align: center;
}
.CustomerTalk-bottom-left {
  position: relative;
  width: 15vw;
  height: calc(var(--vh, 1vh) * 6);
  font-size: 6vw;
  line-height: calc(var(--vh, 1vh) * 6);
  text-align: center;
  border: 1px dotted #21211f;
}
.CustomerTalk-top-repeat0 {
  position: relative;
  margin: 2vw 0;
  width: 80vw;
  left: 5vw;
  display: inline-flex;
  justify-content: start;
}
.CustomerTalk-top-repeat1 {
  position: relative;
  margin: 2vw 0;
  width: 80vw;
  left: 5vw;
  display: inline-flex;
  justify-content: flex-end;
}
.repeat1 {
  position: relative;
  padding: 0 2vw;
  text-align: center;
  word-break: break-all;
  border-bottom: 1px dotted #21211f;
}
.repeat0 {
  position: relative;
  padding: 0 2vw;
  text-align: center;
  word-break: break-all;
  border-bottom: 1px dotted #21211f;
}
</style>
