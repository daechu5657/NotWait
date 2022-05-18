<template>
  <div class="code-wrap" v-if="$store.state.login_modal == 0">
    <input type="text" v-model="send" />
    <span @click="submit">제출</span>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      send: '',
    };
  },
  methods: {
    submit() {
      axios
        .post(
          '/Login',
          { code: this.send },
          { maxContentLength: 100000000, maxBodyLength: 1000000000 }
        )
        .then(response => {
          this.$store.commit('login', response);
        });
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
  background: #233a3b;
}
</style>
