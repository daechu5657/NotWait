<template>
  <transition name="talk">
    <div class="CustomerTalk-wrap" v-if="$store.state.talk_modal == 1">
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
          &lt;
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
  </transition>
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
    // scroll() {
    //   var a = document.getElementById('scroll');
    //   a.scrollTop = a.scrollHeight;
    //   console.log(1);
    // },
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
}
.CustomerTalk-top {
  position: relative;
  left: 5vw;
  top: calc(var(--vh, 1vh) * 2);
  width: 90vw;
  height: calc(var(--vh, 1vh) * 83);
  /* display: flex;
  flex-direction: column; */
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 24px;
  padding: 5vw 0;
  font-size: 4vw;
  box-shadow: 0 2px 8px -2px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
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
  box-shadow: 0 2px 8px -2px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  border-radius: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.CustomerTalk-bottom-input {
  width: 60vw;
  height: calc(var(--vh, 1vh) * 6);
  border-radius: 24px;
  background-color: #83838369;
  outline: none;
  border: none;
  text-align: center;
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
  box-shadow: 0 2px 8px -2px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  border-radius: 24px;
  font-size: 6vw;
  line-height: calc(var(--vh, 1vh) * 6);
  text-align: center;
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
  border-radius: 24px;
  padding: 0 2vw;
  margin-right: 2vw;
  text-align: center;
  word-break: break-all;
  box-shadow: 0 2px 8px -2px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
}
.repeat0 {
  position: relative;
  border-radius: 24px;
  padding: 0 2vw;
  margin-left: 2vw;
  text-align: center;
  word-break: break-all;
  box-shadow: 0 2px 8px -2px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%);
  /* text-decoration: underline;
  text-decoration-color: #6c804b69;
  text-decoration-thickness: 1.5vw;
  text-decoration-line: line-through; */
}

.talk-enter-active {
  animation: side 0.3s 0s 1 ease;
}
.talk-leave-active {
  animation: side 0.3s 0s 1 ease reverse;
}
@keyframes side {
  0% {
    transform: translateY(calc(var(--vh, 1vh) * 100));
  }
  100% {
    transform: translateY(0);
  }
}
</style>
