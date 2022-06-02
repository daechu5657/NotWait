<template>
  <div class="Owner-wrap">
    <div class="Owner-top">
      <div class="Owner-top-table">
        <p>테이블</p>
        <div
          class="Owner-top-table-repeat"
          v-bind:id="'box' + (index + 1)"
          v-for="(a, index) in $store.state.table"
          :key="index"
          @mousedown="move(index)"
        >
          {{ index + 1 }}번
        </div>
      </div>
      <div class="Owner-top-btn">
        <span
          @click="
            $store.dispatch('table_update', {
              value: 0,
              index: $store.state.table.length,
            })
          "
          >좌석제거</span
        >
        <span
          @click="
            $store.dispatch('table_update', {
              value: 1,
              index: $store.state.table.length,
            })
          "
          >좌석늘리기</span
        >
      </div>
    </div>
    <div class="Owner-bottom">
      <div class="Owner-bottom-communication">
        <p>실시간소통</p>
        <div
          class="Owner-bottom-communication-repeat"
          v-for="(a, i) in $store.state.table"
          :key="i"
          @click="$store.commit('talk_modalOnOff', i)"
        >
          {{ i + 1 }}번
        </div>
      </div>
      <div class="Owner-bottom-cancel">주문취소건</div>
      <div class="Owner-bottom-btn">
        <span @click="$store.commit('menulist_modalOnOff')">메뉴판설정</span>
        <span>qr코드 생성</span>
      </div>
    </div>
    <MenuList />
    <transition name="code">
      <Code v-if="$store.state.login_modal == 0" />
    </transition>
    <Talk />
    <Ownereventmodal />
  </div>
</template>

<script>
import MenuList from './MenuList.vue';
import Code from './Code.vue';
import Talk from './Talk.vue';
import Ownereventmodal from './Ownereventmodal.vue';
export default {
  data() {
    return {
      index: 0,
    };
  },
  components: {
    MenuList: MenuList,
    Code: Code,
    Talk: Talk,
    Ownereventmodal: Ownereventmodal,
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
  created() {
    this.$store.dispatch('customer_owner_update');
  },
};
</script>

<style>
.Owner-wrap {
  width: 100%;
  height: 100%;
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
.Owner-top-table > p {
  position: absolute;
  left: 48vw;
}
.Owner-top-table-repeat {
  width: 5vw;
  height: 5vw;
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
  display: flex;
  flex-direction: row;
}
.Owner-bottom-communication > p {
  position: absolute;
  left: 48vw;
}
.Owner-bottom-communication-repeat {
  position: relative;
  width: 5vw;
  height: 5vw;
  background-color: #ffebcd8f;
  border-radius: 50%;
  text-align: center;
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
.code-leave-active {
  animation: codeout 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}
@keyframes codeout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translatex(-100vw);
  }
}
</style>
