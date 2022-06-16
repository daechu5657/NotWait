<template>
  <div class="talk-wrap" v-if="$store.state.talk_modal == 1">
    <div class="talk-top" id="scroll">
      <p class="talk-top-number">{{ $store.state.talk_index + 1 }}</p>
      <div
        :class="`talk-top-repeat${a.index}`"
        v-for="(a, i) in $store.state.table[$store.state.talk_index].talk"
        :key="i"
      >
        <span
          :class="`talk-repeat${a.index}`"
          @click="
            $store.state.blink[$store.state.talk_index].talk_order[i].order = 0
          "
        >
          <p
            class="talk-contents"
            :class="{
              blink:
                $store.state.blink[$store.state.talk_index].talk_order[i]
                  .order == 1,
            }"
          >
            {{ a.text }}
          </p>
        </span>
      </div>
    </div>
    <div class="talk-bottom">
      <input
        class="talk-bottom-input"
        type="text"
        v-model="send"
        @keyup.enter="data"
      />
      <div class="talk-bottom-btn">
        <p @click="data">Send</p>
        <p @click="$store.commit('talk_modalOnOff')">Close</p>
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
      this.$store.dispatch('talk_update', this.send);
      this.send = '';
    },
  },
  computed: {
    scroll() {
      return this.$store.state.table[this.$store.state.talk_index].talk;
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
.talk-wrap {
  position: absolute;
  width: 40vw;
  height: 70vh;
  background-color: #f0f0f0;
  top: 15vh;
  left: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
  font-family: Abel, sans-serif;
  border: 1px dotted #21211f80;
}
.talk-top {
  position: relative;
  width: 30vw;
  height: 55vh;
  overflow: scroll;
  overflow-x: hidden;
  margin: 1vh 0;
  border-top: 1px dotted #21211f;
  border-bottom: 1px dotted #21211f;
  padding: 1vh 0;
}
.talk-top::-webkit-scrollbar {
  display: none;
}
.talk-bottom {
  position: relative;
  width: 40vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.talk-bottom-input {
  width: 25vw;
  height: 7vh;
  outline: none;
  background-color: #f0f0f0;
  text-align: center;
  border: 1px dotted #21211f;
}
.talk-bottom-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 5vw;
  height: 7vh;
  text-align: center;
}
.talk-bottom-btn > P {
  width: 3vw;
  font-size: 1vw;
  background-color: #f0f0f0;
  transition: all 0.3s ease;
  border-bottom: 1px dotted #21211f00;
  margin-left: 1vw;
}
.talk-bottom-btn > P:hover {
  border-bottom: 1px dotted #21211f;
  padding: 0 0.5vw;
}
.talk-top-number {
  position: fixed;
  width: 1vw;
  height: 1vw;
  left: 31vw;
  font-size: 1vw;
  text-align: center;
  line-height: 1vw;
  border-bottom: 1px dotted #21211f;
}
.talk-top-repeat1 {
  position: relative;
  width: 30vw;
  display: inline-flex;
  justify-content: start;
  margin: 0.5vw 0 0.5vw 0vw;
}
.talk-top-repeat0 {
  position: relative;
  width: 30vw;
  display: inline-flex;
  justify-content: flex-end;
  margin: 0.5vw 0;
}
.talk-repeat1 {
  position: relative;
  padding: 0 1vw;
  margin-right: 2vw;
  text-align: center;
  word-break: break-all;
  font-size: 0.8vw;
  border-bottom: 1px dotted #21211f;
  font-weight: 300;
}
.talk-repeat0 {
  position: relative;
  padding: 0 1vw;
  margin-left: 2vw;
  text-align: center;
  word-break: break-all;
  font-size: 0.8vw;
  border-bottom: 1px dotted #21211f;
  font-weight: 300;
}
.talk-contents {
  padding: 0 1vw;
}
</style>
