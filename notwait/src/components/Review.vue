<template>
  <div class="review-wrap" v-if="$store.state.review_modal == 1">
    <p
      v-if="$store.state.menulist[$store.state.review_index].review.length == 0"
    >
      리뷰없음
    </p>
    <div
      class="review-repeat"
      v-for="(a, i) in $store.state.menulist[$store.state.review_index].review"
      :key="i"
    >
      <p>
        {{ $store.state.menulist[$store.state.review_index].review[i].text }}
      </p>
      <p>
        {{ $store.state.menulist[$store.state.review_index].review[i].value }}
      </p>
    </div>
    <div class="review-write">
      <input
        type="text"
        class="review-input"
        placeholder="리뷰쓰기"
        v-model="send.text"
      />
      <input type="text" class="review-value" v-model="send.value" />
      <button @click="$store.dispatch('review_update', send)">작성</button>
    </div>
    <button @click="$store.commit('review_modalOnOff')">닫기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      send: {
        menuname:
          this.$store.state.menulist[this.$store.state.review_index].menuname,
        text: '',
        value: '',
      },
    };
  },
};
</script>

<style>
.review-wrap {
  position: absolute;
  width: calc(var(--vh, 1vh) * 30);
  height: calc(var(--vh, 1vh) * 30);
  top: 0;
  left: 0;
  background-color: #6f677cd9;
}
</style>
