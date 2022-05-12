<template>
  <div class="MenuList-wrap" v-if="$store.state.menulist_modal == 1">
    <div class="MenuList-contents">
      <div
        class="MenuList-contents-repeat"
        v-for="(text, index) in send.length"
        :key="index"
      >
        <input
          type="text"
          spellcheck="false"
          class="Menuname"
          v-model="send[index].menuname"
        />
        <input
          type="text"
          spellcheck="false"
          class="Menuprice"
          v-model="send[index].price"
        />
        <span @click="del(index)">삭제</span>
      </div>
    </div>
    <div class="MenuList-btn">
      <span @click="push">추가</span>
      <span @click="modify">수정</span>
      <span>닫기</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      send: [{ menuname: '', price: '' }],
    };
  },
  methods: {
    push() {
      this.send.push({ menuname: '', price: '' });
    },
    del(index) {
      this.send.splice(index, 1);
    },
    modify() {
      axios.post('/Menuset', this.send).then(response => {
        this.$store.commit('menulistUpdate', response);
      });
    },
  },
  computed: {
    check_menulist() {
      return this.$store.state.menulist;
    },
  },
  watch: {
    check_menulist(val) {
      this.send = val;
    },
  },
};
</script>

<style>
.MenuList-wrap {
  position: absolute;
  width: 40vw;
  height: 90vh;
  top: 5vh;
  left: 30vw;
  background-color: #433b3e;
}
.MenuList-contents {
  position: relative;
  width: 40vw;
  height: 80vh;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
