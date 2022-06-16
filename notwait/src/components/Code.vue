<template>
  <div class="code-wrap" v-if="$store.state.login_modal == 0">
    <input
      class="code-input"
      type="password"
      v-model="send"
      spellcheck="false"
      @keyup.enter="$store.dispatch('owner_login', this.send)"
    />
    <span class="code-submit" @click="$store.dispatch('owner_login', this.send)"
      >Login</span
    >
    <transition name="code-loading">
      <div
        class="code-loading-wrap"
        v-if="$store.state.owner_loading_modal == 1"
      >
        <p
          @click="$store.state.login_modal = 1"
          v-if="$store.state.percentage == 100"
          class="code-loading-phrases"
        >
          Hello &nbsp;{{ $store.state.code }}
        </p>
        <div class="code-loading-total">
          <div class="code-loading-ing" :style="ing"></div>
        </div>
        <transition name="code-loading-notice">
          <p
            class="code-loading-notice"
            v-if="delay == 1"
            @click="$store.state.login_modal = 1"
          >
            Click
          </p>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      send: '',
      delay: 0,
    };
  },
  methods: {},
  computed: {
    ing() {
      return `
       width: ${this.$store.state.percentage * 0.6}vw`;
    },
    num() {
      return this.$store.state.percentage;
    },
  },
  watch: {
    num(val) {
      if (val == 100) {
        setInterval(() => {
          this.delay = 1;
          setTimeout(() => {
            this.delay = 0;
          }, 700);
        }, 1400);
      }
    },
  },
};
</script>

<style>
.code-wrap {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  background-color: #f0f0f0;
  z-index: 10;
  overflow: hidden;
}
.code-input {
  width: 10vw;
  height: 3vh;
  position: absolute;
  left: 45vw;
  top: 49vh;
  outline: none;
  background-color: #f0f0f0;
  text-align: center;
  font-size: 1.5vw;
  color: #21211f;
  border-bottom: 2px dotted #21211f;
  border-top: 0;
  border-left: 0;
  border-right: 0;
}
.code-submit {
  position: absolute;
  width: 6vw;
  height: 3vh;
  font-size: 1vw;
  left: 47vw;
  top: 53vh;
  text-align: center;
  line-height: 3vh;
  transition: all 0.3s;
  border: 1px dotted #21211f00;
}
.code-submit:hover {
  border: 1px dotted #21211f;
  padding: 0 1vw;
  left: 46vw;
}
.code-loading-wrap {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #ebebe9;
}
.code-loading-enter-to {
  opacity: 1;
}
.code-loading-enter-active {
  transition: 0.5s all ease;
}
.code-loading-enter-from {
  opacity: 0;
}
.code-loading-total {
  position: absolute;
  width: 60vw;
  height: 1vh;
  background-color: #cacaca;
  border-radius: 30px;
  left: 20vw;
  top: 49.5vh;
}
.code-loading-ing {
  position: absolute;
  width: 0vw;
  height: 1vh;
  background-color: #21211f;
  border-radius: 30px;
  transition: 0.5s ease-out;
}
.code-loading-phrases {
  position: absolute;
  width: 100vw;
  height: 100vh;
  text-align: center;
  line-height: 90vh;
  font-size: 4vw;
  animation: loadingup 0.7s cubic-bezier(0.215, 0.61, 0.355, 1);
  /* animation-fill-mode: forwards; */
}
@keyframes loadingup {
  0% {
    opacity: 0;
    transform: translateY(3vh);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.code-loading-notice {
  position: absolute;
  width: 100vw;
  font-size: 1.5vw;
  color: #21211f91;
  text-align: center;
  line-height: 192vh;
}

.code-loading-notice-enter-from {
  opacity: 0;
}
.code-loading-notice-enter-active {
  transition: 0.7s ease-in-out;
}
.code-loading-notice-enter-to {
  opacity: 1;
}
.code-loading-notice-leave-from {
  opacity: 1;
}
.code-loading-notice-leave-active {
  transition: 0.7s ease-in-out;
}
.code-loading-notice-leave-to {
  opacity: 0;
}
</style>
