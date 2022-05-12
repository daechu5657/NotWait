<template>
  <div class="Owner-wrap">
    <div class="Owner-top">
      <div class="Owner-top-table">테이블</div>
      <div class="Owner-top-btn">
        <span>좌석제거</span> <span>좌석늘리기</span>
      </div>
    </div>
    <div class="Owner-bottom">
      <div class="Owner-bottom-communication">실시간소통</div>
      <div class="Owner-bottom-cancel">주문취소건</div>
      <div class="Owner-bottom-btn">
        <span @click="$store.commit('menulist_modalOnOff')">메뉴판설정</span>
        <span>qr코드 생성</span>
      </div>
    </div>
    <MenuList />
    <Code />
  </div>
</template>

<script>
import MenuList from './MenuList.vue';
import Code from './Code.vue';
export default {
  data() {
    return {};
  },
  components: {
    MenuList: MenuList,
    Code: Code,
  },
  props: {},
  methods: {},
};
</script>

<style>
.Owner-wrap {
  width: 100vw;
  height: 100vh;
  background-color: #6d6575;
}
.Owner-top {
  position: relative;
  width: 98vw;
  height: 48vh;
  border: 1px solid;
  left: 1vw;
  top: 1vh;
}
.Owner-top-table {
  position: relative;
  width: 96vw;
  height: 39vh;
  border: 1px solid;
  left: 1vw;
  top: 1vh;
}
.Owner-top-btn {
  position: relative;
  width: 96vw;
  height: 6vh;
  top: 2vh;
  left: 1vw;
  border: 1px solid;
}
.Owner-bottom {
  position: relative;
  width: 98vw;
  height: 48vh;
  border: 1px solid;
  left: 1vw;
  top: 2vh;
  bottom: 1vh;
}
.Owner-bottom-communication {
  position: relative;
  width: 96vw;
  height: 20vh;
  left: 1vw;
  top: 1vh;
  border: 1px solid;
}
.Owner-bottom-cancel {
  position: relative;
  width: 96vw;
  height: 20vh;
  left: 1vw;
  top: 2vh;
  border: 1px solid;
}
.Owner-bottom-btn {
  position: relative;
  width: 96vw;
  height: 4vh;
  border: 1px solid;
  top: 3vh;
  left: 1vw;
}
</style>
