<template>
  <div class="Owner-wrap">
    <div class="Owner-top">
      <div class="Owner-top-table">
        <div class="Owner-top-btn">
          <span
            @click="
              $store.dispatch('table_update', {
                value: 1,
                index: $store.state.table.length,
              })
            "
            >+</span
          >
          <p>Table</p>
          <span
            @click="
              $store.dispatch('table_update', {
                value: 0,
                index: $store.state.table.length,
              })
            "
            >-</span
          >
        </div>
        <div
          class="Owner-top-table-repeat"
          v-bind:id="'box' + (index + 1)"
          v-for="(a, index) in $store.state.table"
          :key="index"
          :class="{ blink: $store.state.blink[index].table == 1 }"
        >
          <div class="Owner-top-table-repeat-contents" @click="tableon(index)">
            Table&nbsp;{{ index + 1 }}
          </div>

          <div
            class="callOn"
            v-if="$store.state.table[index].call == 1"
            @click="$store.dispatch('call_update', { index: index })"
          >
            call
          </div>
        </div>
      </div>
    </div>
    <div class="Owner-bottom">
      <div class="Owner-bottom-communication">
        <p>Talk</p>
        <div
          class="Owner-bottom-communication-repeat"
          v-for="(a, i) in $store.state.table"
          :key="i"
          @click="talkon(i)"
          :class="{ blink: $store.state.blink[i].talk == 1 }"
        >
          Table&nbsp;{{ i + 1 }}
        </div>
      </div>
      <div class="Owner-bottom-cook">
        <p>Cooking State</p>
        <div class="Owner-bottom-cook-items">
          <div
            class="Owner-bottom-cook-repeat"
            v-for="(a, i) in $store.state.table"
            :key="i"
            @click="state(i)"
            :class="{
              blink: $store.state.table[i].cook == 1,
              complete: $store.state.table[i].cook == 2,
            }"
          >
            State &nbsp;{{ $store.state.table[i].cook }} <br />
            <p>Table&nbsp;{{ i + 1 }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="Owner-side-setting"
      @mouseover="setting = 1"
      @mouseleave="setting = 0"
      v-bind:class="{
        settingOn: setting == 1,
      }"
    >
      <p>🞷</p>
      <transition name="setting">
        <div class="Owner-side-setting-contents" v-if="setting == 1">
          <p @click="$store.commit('menulist_modalOnOff')">MenuSet</p>
          <p @click="$store.state.qr_modal = 1">QR</p>
        </div>
      </transition>
    </div>

    <div class="Owner-side-tip" @mouseover="tip = 1" @mouseleave="tip = 0">
      <p>?</p>
      <transition name="tip">
        <div class="Owner-side-tip-contents" v-if="tip == 1">
          <p>State</p>
          <p><b>0</b> -> Not ordered</p>
          <p><b>1</b> -> Order coming in / Cooking</p>
          <p><b>2</b> -> Cook done</p>
          <p>If you click on the table the state will change</p>
          <p>Please change the state according to the order of progress</p>
        </div>
      </transition>
    </div>
    <transition name="menulist">
      <MenuList />
    </transition>
    <transition name="code">
      <Code v-if="$store.state.login_modal == 0" />
    </transition>
    <transition name="ownertalk">
      <Talk v-if="$store.state.talk_modal == 1" />
    </transition>
    <Ownereventmodal />
    <transition name="table"
      ><Table v-if="$store.state.table_modal == 1" />
    </transition>
    <transition name="table">
      <QR v-if="$store.state.qr_modal == 1" />
    </transition>
  </div>
</template>

<script>
import MenuList from './MenuList.vue';
import Code from './Code.vue';
import Talk from './Talk.vue';
import Ownereventmodal from './Ownereventmodal.vue';
import Table from './Table.vue';
import QR from './Qr.vue';
export default {
  data() {
    return {
      index: 0,
      tip: 0,
      setting: 0,
    };
  },
  components: {
    MenuList: MenuList,
    Code: Code,
    Talk: Talk,
    Ownereventmodal: Ownereventmodal,
    Table: Table,
    QR: QR,
  },
  props: {},
  methods: {
    talkon(i) {
      this.$store.commit('talk_modalOnOff', i);
      this.$store.state.blink[i].talk = 0;
    },
    tableon(index) {
      this.$store.commit('table_modalOnOff', index);
      this.$store.state.blink[index].table = 0;
    },
    state(i) {
      this.$store.dispatch('cook_update', { index: i });
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
  background-color: #f0f0f0;
  color: #21211f;
  overflow: hidden;
}
.Owner-top {
  position: relative;
  width: 98vw;
  height: 48vh;
  left: 1vw;
  top: 1vh;
}
.Owner-top-table {
  position: relative;
  width: 96vw;
  height: 45vh;
  /* box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px; */
  box-shadow: 0 1px 1px rgb(0 0 0 / 40%), 0 0 1px 1px rgb(0 0 0 / 36%);
  left: 1vw;
  top: 1vh;
  background-color: transparent;
  border-radius: 24px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  grid-row-gap: 1vw;
  overflow: scroll;
  overflow-x: hidden;
}
.Owner-top-table::-webkit-scrollbar {
  display: none;
}
.Owner-top-table-repeat {
  position: relative;
  width: 10vw;
  height: 10vw;
  background-color: transparent;
  border-radius: 24px;
  text-align: center;
  line-height: 10vw;
  top: 7vh;
  left: 0;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px,
    rgba(0, 0, 0, 0.13) 0px 0px 1px 1px;
  font-family: Abel, sans-serif;
  font-size: 1vw;
  transition: all 0.2s ease-in-out;
}

.Owner-top-table-repeat:hover {
  top: 6vh;
}
.Owner-top-btn {
  position: fixed;
  width: 10vw;
  font-size: 1.5vw;
  font-weight: bold;
  top: 3vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 24px;
  z-index: 1;
  background-color: #0000002e;
  padding: 0 1vw;
  transition: all 0.2s ease-in-out;
}
.Owner-top-btn > span {
  transition: all 0.2s ease-in-out;
}
.Owner-top-btn > span:hover {
  font-size: 1.8vw;
}
.Owner-bottom {
  position: relative;
  width: 98vw;
  height: 51vh;
  left: 1vw;
}
.Owner-bottom-communication {
  position: relative;
  width: 96vw;
  height: 30vh;
  left: 1vw;
  top: 1vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  grid-row-gap: 1vw;
  border-radius: 24px;
  /* box-shadow: 0 1px 1px rgb(9 30 66 / 25%), 0 0 1px 1px rgb(9 30 66 / 13%); */
  box-shadow: 0 1px 1px rgb(0 0 0 / 40%), 0 0 1px 1px rgb(0 0 0 / 36%);
  overflow: scroll;
  overflow-x: hidden;
}
.Owner-bottom-communication::-webkit-scrollbar {
  display: none;
}
.Owner-bottom-communication > p {
  position: fixed;
  top: 50vh;
  font-size: 1.5vw;
  font-weight: bold;
  z-index: 1;
  border-radius: 24px;
  padding: 0 1vw;
  background-color: #0000002e;
}
.Owner-bottom-communication-repeat {
  position: relative;
  top: 7vh;
  width: 10vw;
  height: 5vw;
  border-radius: 24px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px,
    rgba(0, 0, 0, 0.13) 0px 0px 1px 1px;
  line-height: 5vw;
  font-family: Abel, sans-serif;
  font-size: 1vw;
  transition: all 0.2s ease-in-out;
}
.Owner-bottom-communication-repeat:hover {
  top: 6vh;
}
.Owner-bottom-cook {
  position: relative;
  width: 96vw;
  height: 17vh;
  left: 1vw;
  top: 3vh;
  border-radius: 24px;
  /* box-shadow: 0 1px 1px rgb(9 30 66 / 25%), 0 0 1px 1px rgb(9 30 66 / 13%); */
  box-shadow: 0 1px 1px rgb(0 0 0 / 40%), 0 0 1px 1px rgb(0 0 0 / 36%);
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.Owner-bottom-cook > p {
  position: fixed;
  font-size: 1.5vw;
  font-weight: bold;
  border-radius: 24px;
  background-color: #0000002e;
  text-align: center;
  padding: 0 1vw;
  top: 82vh;
}
.Owner-bottom-cook-items {
  position: relative;
  top: 4vh;
  width: 96vw;
  height: 13vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.Owner-bottom-cook-repeat {
  position: relative;
  top: 0vh;
  width: 5vw;
  height: 4vw;
  border-radius: 24px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px,
    rgba(0, 0, 0, 0.13) 0px 0px 1px 1px;
  text-align: center;
  font-size: 1vw;
  line-height: 2vw;
  font-family: Abel, sans-serif;
  transition: all 0.2s ease-in-out;
}
.Owner-bottom-cook-repeat:hover {
  top: -1vh;
}
.Owner-bottom-cook-repeat > p {
  background-color: #00000040;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 24px;
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
.Owner-side-setting {
  position: absolute;
  width: 3vw;
  height: 3vw;
  top: 4vh;
  right: 3vw;
  text-align: center;
  line-height: 3vw;
  font-size: 1.5vw;
  font-weight: bold;
  transition: all 0.5s ease;
  border: 1px dotted #21211f;
  backdrop-filter: blur(5px);
  background-color: #00000017;
}
.Owner-side-setting-contents {
  position: relative;
  height: 67vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 1vw;
  text-align: center;
}
.Owner-side-setting-contents > p {
  width: 3vw;
  height: 3vw;
  font-size: 0.5vw;
  transition: all 0.2s ease-in-out;
  position: relative;
  left: 0;
  background-color: transparent;
  text-decoration-line: underline;
  text-decoration-color: #21211f00;
  text-decoration-thickness: 0.15vw;
}
.Owner-side-setting-contents > p:hover {
  text-decoration-color: #21211f64;
}
.setting-enter-active {
  animation: setting 0.3s ease;
}
.setting-leave-active {
  animation: setting 0.3s ease reverse;
}
@keyframes setting {
  0% {
    opacity: 0;
    height: 0vh;
  }
  100% {
    opacity: 1;
    height: 67vh;
  }
}
.settingOn {
  height: 73vh;
}
.Owner-side-tip > p {
  position: absolute;
  width: 2vw;
  height: 2vw;
  top: 82vh;
  text-align: center;
  font-weight: 700;
  font-size: 1.5vw;
  right: 3vw;
  line-height: 2vw;
  border: 1px dotted #21211f;
  backdrop-filter: blur(5px);
  background-color: #00000017;
}
.Owner-side-tip-contents {
  position: absolute;
  width: 21vw;
  height: 14vh;
  top: 66.5vh;
  right: 0.5vw;
  font-size: 0.7vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1vh 1vw;

  border: 1px dotted #21211f;
  backdrop-filter: blur(5px);
  background-color: #00000017;
}
.tip-enter-active {
  animation: tip 0.3s ease;
}
.tip-leave-active {
  animation: tip 0.3s ease reverse;
}
@keyframes tip {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.ownertalk-enter-active {
  animation: tip 0.3s ease;
}
.ownertalk-leave-active {
  animation: tip 0.3s ease reverse;
}
.menulist-enter-active {
  animation: tip 0.3s ease;
}
.menulist-leave-active {
  animation: tip 0.3s ease reverse;
}
.table-enter-active {
  animation: tip 0.3s ease;
}
.table-leave-active {
  animation: tip 0.3s ease reverse;
}
.blink {
  animation: blink 1.5s ease-in-out infinite;
}
@keyframes blink {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: #ffc10075;
  }
  100% {
    background-color: transparent;
  }
}
.complete {
  background-color: #23ff002e;
}
.callOn {
  position: absolute;
  width: 2vw;
  height: 3vw;
  background-color: #ef9f9f;
  text-align: center;
  line-height: 3vw;
  top: 2vh;
  left: -2vw;
  animation: call 0.5s ease-in-out infinite;
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
}
@keyframes call {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
