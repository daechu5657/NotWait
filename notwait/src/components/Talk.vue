<template>
  <div class="talk-wrap" v-if="$store.state.talk_modal == 1">
    <div class="talk-top">
      <p
        v-for="(a, i) in $store.state.table[$store.state.talk_index].talk"
        :key="i"
      >
        {{ a }}
      </p>
    </div>
    <div class="talk-bottom">
      <input class="talk-bottom-input" type="text" v-model="send" />
      <button @click="$store.dispatch('talk_update', send)">전송</button>
    </div>
    <button @click="$store.commit('talk_modalOnOff')">닫기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      send: '',
    };
  },
};
</script>

<style>
.talk-wrap {
  position: absolute;
  width: 50vw;
  height: 50vh;
  background-color: #6c6c6c;
  top: 25vh;
  left: 25vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.talk-top {
  position: relative;
  width: 45vw;
  height: 40vh;
  border: 1px solid;
}
.talk-bottom {
  position: relative;
  width: 45vw;
  height: 7vh;
}
.talk-bottom-input {
  width: 40vw;
  height: 7vh;
}
</style>
