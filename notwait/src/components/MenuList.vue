<template>
  <div class="MenuList-wrap" v-if="$store.state.menulist_modal == 1">
    <div class="MenuList-contents">
      <div
        class="MenuList-contents-repeat"
        v-for="(text, index) in send.length"
        :key="index"
      >
        <div
          class="img"
          :style="{ backgroundImage: `url('${send[index].img}')` }"
        ></div>
        <input
          type="text"
          spellcheck="false"
          class="Menuname"
          placeholder="Menuname"
          v-model="send[index].menuname"
        />
        <input
          type="text"
          spellcheck="false"
          class="Menusubtext"
          placeholder="Menusubtext"
          v-model="send[index].menusubtext"
        />
        <input
          type="text"
          spellcheck="false"
          class="Menuprice"
          placeholder="Menuprice"
          v-model="send[index].price"
        />
        <input type="file" spellcheck="false" class="Menuimg" @change="img" />
        <span @click="del(index)">삭제</span>
      </div>
    </div>
    <div class="MenuList-btn">
      <span @click="push">추가</span>
      <span @click="modify">수정</span>
      <span @click="$store.commit('menulist_modalOnOff')">닫기</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      send: [
        {
          menuname: '',
          menusubtext: '',
          price: '',
          img: '',
          review: [],
        },
      ],
    };
  },
  methods: {
    push() {
      this.send.push({
        menuname: '',
        menusubtext: '',
        price: '',
        img: '',
        review: [],
      });
    },
    del(index) {
      this.send.splice(index, 1);
    },
    modify() {
      axios.post('/Menuset', this.send).then(response => {
        this.$store.commit('menulistUpdate', response);
      });
    },
    img(e) {
      let 파일 = e.target.files[0];
      function readFile(file, onLoadCallback) {
        var reader = new FileReader();
        reader.onload = onLoadCallback;
        reader.readAsDataURL(file);
      }
      readFile(파일, e => {
        this.send[this.send.length - 1].img = e.target.result;
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

.img {
  width: 10vw;
  height: 10vw;
  border-radius: 25%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
