<template>
  <div class="Owner-wrap">
    <div class="Owner-top">
      <div class="Owner-top-table">
        <div
          class="Owner-top-table-repeat"
          v-bind:id="'box' + (i + 1)"
          v-for="(a, i) in $store.state.table"
          :key="i"
          @mousedown="move(i)"
        >
          {{ i + 1 }}번
        </div>
      </div>
      <div class="Owner-top-btn">
        <span @click="$store.dispatch('table_update', 0)">좌석제거</span>
        <span @click="$store.dispatch('table_update', 1)">좌석늘리기</span>
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
  methods: {
    move(i) {
      dragElement(document.getElementById(`box${i + 1}`));

      function dragElement(elmnt) {
        var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
        elmnt.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
          elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
        }
        function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }
    },
  },
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

.Owner-top-table-repeat {
  width: 100px;
  height: 100px;
  background-color: #7fffd44d;
  border-radius: 50%;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
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
