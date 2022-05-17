<template>
  <div class="CustomerTalk-wrap" v-if="$store.state.talk_modal == 1">
    <div class="CustomerTalk-top">
      <div
        class="CustomerTalk-top-repeat"
        v-for="(a, i) in $store.state.table.talk"
        :key="i"
      >
        {{ a }}
      </div>
    </div>
    <div class="CustomerTalk-bottom">
      <input class="CustomerTalk-bottom-input" type="text" />
      <button>전송</button>
    </div>
    <button @click="$store.commit('talk_modalOnOff', 0)">닫기</button>
  </div>
</template>

<script>
export default {};
</script>

<style>
.CustomerTalk-wrap {
  position: absolute;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #3d806994;
  display: flex;
  flex-direction: column;
}
.CustomerTalk-top {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 90);
}
</style>
