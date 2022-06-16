<template>
  <div class="qrcode-wrap">
    <div class="qrcode-repeat-wrap" id="print">
      <div
        class="qrcode-repeat"
        v-for="(a, i) in $store.state.table.length"
        :key="i"
      >
        <qrcode-vue :value="value + (i + 1)" />
        <p>Table&nbsp;{{ i + 1 }}</p>
      </div>
    </div>
    <div class="qrcode-btn">
      <p @click="print">Print</p>
      <p @click="$store.state.qr_modal = 0">Close</p>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import printJS from 'print-js';
export default {
  data() {
    return {
      value: 'http://localhost:8080/Customer/',
    };
  },
  components: {
    QrcodeVue: QrcodeVue,
  },
  methods: {
    print() {
      printJS({
        printable: 'print',
        type: 'html',
        targetStyles: ['*'],
      });
    },
  },
};
</script>

<style>
.qrcode-wrap {
  position: absolute;
  width: 40vw;
  height: 70vh;
  background-color: #f0f0f0;
  top: 15vh;
  left: 30vw;
  z-index: 1;
  border: 1px dotted rgba(33, 33, 31, 0.5019607843137255);
  font-family: Abel, sans-serif;
}
.qrcode-repeat-wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  position: relative;
  width: 40vw;
  height: 65vh;
}
.qrcode-repeat-wrap::-webkit-scrollbar {
  display: none;
}
.qrcode-repeat {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 10vw;
  margin: 1vh 0;
}
.qrcode-btn {
  position: relative;
  width: 40vw;
  height: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.qrcode-btn > p {
  border: 1px dotted rgba(33, 33, 31, 0);
  transition: all 0.3s ease;
}
.qrcode-btn > p:hover {
  border: 1px dotted rgba(33, 33, 31, 1);
}
</style>
