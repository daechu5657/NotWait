<template>
  <transition name="loading">
    <div
      class="login-percentage"
      v-if="$store.state.loading_modal == 1"
      @click="$store.commit('loading_modalOnOff')"
    >
      <div class="progressbar-total">
        <div class="progressbar-ing" :style="ing" ref="qwer"></div>
      </div>
      <transition name="notice">
        <div class="notice" v-if="$store.state.percentage == 100">
          #Dalha_min
        </div>
      </transition>
      <transition name="noticebottom">
        <div class="noticebottom" v-if="delay == 1">Tap</div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      delay: 0,
    };
  },
  computed: {
    num() {
      return this.$store.state.percentage * 0.9;
    },
    ing() {
      return `
       width: ${this.num}vw`;
    },
  },
  watch: {
    num(val) {
      if (val == 90) {
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
.login-percentage {
  position: absolute;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #f0f0f0;
  z-index: 10;
}
.progressbar-total {
  position: absolute;
  width: 90vw;
  height: calc(var(--vh, 1vh) * 1);
  background-color: #ebebe9;
  border-radius: 30px;
  left: 5vw;
  top: calc(var(--vh, 1vh) * 49);
}
.progressbar-ing {
  position: absolute;
  width: 0vw;
  height: calc(var(--vh, 1vh) * 1);
  background-color: #21211f;
  border-radius: 30px;
  transition: 0.5s ease-out;
}
.notice {
  width: 100vw;
  position: absolute;
  text-align: center;
  top: calc(var(--vh, 1vh) * 38);
  font-size: 10vw;
  color: #21211f;
  font-weight: 700;
}

.noticebottom {
  width: 100vw;
  position: absolute;
  text-align: center;
  top: calc(var(--vh, 1vh) * 91);
  font-size: 4vw;
  color: #21211f91;
  font-weight: 300;
}

/* vue transition */
.notice-enter-from {
  opacity: 0;
  top: calc(var(--vh, 1vh) * 44);
}
.notice-enter-active {
  transition: 0.7s ease-in-out;
}
.notice-enter-to {
  opacity: 1;
  top: calc(var(--vh, 1vh) * 38);
}

.noticebottom-enter-from {
  opacity: 0;
}
.noticebottom-enter-active {
  transition: 0.7s ease-in-out;
}
.noticebottom-enter-to {
  opacity: 1;
}
.noticebottom-leave-from {
  opacity: 1;
}
.noticebottom-leave-active {
  transition: 0.7s ease-in-out;
}
.noticebottom-leave-to {
  opacity: 0;
}

.loading-leave-from {
  opacity: 1;
}
.loading-leave-active {
  transition: all 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
}
.loading-leave-to {
  opacity: 1;
  transform: translatex(-100vw);
}
</style>
