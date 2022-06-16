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
        <div class="repeat-contents">
          <div class="repeat-menuname">
            <p>Name</p>
            <input
              type="text"
              spellcheck="false"
              class="Menuname"
              placeholder="Menuname"
              v-model="send[index].menuname"
            />
          </div>
          <div class="repeat-menutext">
            <p>Text</p>
            <input
              type="text"
              spellcheck="false"
              class="Menusubtext"
              placeholder="Menusubtext"
              v-model="send[index].menusubtext"
            />
          </div>
          <div class="repeat-price">
            <p>Price</p>
            <input
              type="text"
              spellcheck="false"
              class="Menuprice"
              placeholder="Menuprice"
              v-model="send[index].price"
            />
          </div>
          <div class="repeat-btn">
            <label for="file">Upload</label>
            <input
              type="file"
              spellcheck="false"
              class="Menuimg"
              @change="img($event, index)"
              id="file"
            />
            <span @click="del(index)">Delete</span>
          </div>
        </div>
      </div>
    </div>
    <div class="MenuList-btn">
      <span class="pushbtn" @click="push">+</span>
      <span @click="modify">Apply</span>
      <span @click="$store.commit('menulist_modalOnOff')">close</span>
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
    img(e, index) {
      console.log(e);
      let 파일 = e.target.files[0];
      function readFile(file, onLoadCallback) {
        var reader = new FileReader();
        reader.onload = onLoadCallback;
        reader.readAsDataURL(file);
      }
      readFile(파일, e => {
        this.send[index].img = e.target.result;
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
  height: 76vh;
  top: 12vh;
  left: 30vw;
  background-color: #f0f0f0;
  z-index: 1;
  border: 1px dotted rgba(33, 33, 31, 0.5019607843137255);
  font-family: Abel, sans-serif;
}
.MenuList-contents {
  position: relative;
  width: 40vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
}
.MenuList-contents::-webkit-scrollbar {
  display: none;
}
.MenuList-contents-repeat {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 2vh 0;
}
.repeat-contents {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.Menuname {
  width: 7vw;
  height: 2vh;
  text-align: center;
  background-color: #f0f0f0;
  margin: 0.5vh 0;
  outline: none;
  border: 1px dotted #21211f;
}
.Menusubtext {
  width: 22vw;
  height: 2vh;

  text-align: center;
  background-color: #f0f0f0;
  margin: 0.5vh 0;
  border: 1px dotted #21211f;
}
.Menuprice {
  width: 3vw;
  height: 2vh;

  text-align: center;
  background-color: #f0f0f0;
  margin: 0.5vh 0;
  border: 1px dotted #21211f;
}
.Menuname:focus {
  border: 0;
  outline: none;
}
.Menusubtext:focus {
  border: 0;
  outline: none;
}
.Menuprice:focus {
  border: 0;
  outline: none;
}
.img {
  width: 10vw;
  height: 10vw;
  border-radius: 25%;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}
.Menuimg {
  display: none;
}
.repeat-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.repeat-btn > label {
  transition: all 0.3s ease;
  border: 1px dotted #21211f00;
}
.repeat-btn > label:hover {
  padding: 0 0.5vw;
  border: 1px dotted #21211f;
}
.repeat-btn > span {
  transition: all 0.3s ease;
  border: 1px dotted #21211f00;
}
.repeat-btn > span:hover {
  padding: 0 0.5vw;
  border: 1px dotted #21211f;
}
.pushbtn {
  position: absolute;
  width: 2vw;
  height: 2vw;
  text-align: center;
  line-height: 2vw;
  font-size: 1vw;
  top: 67vh;
  left: 37vw;
  border: 1px dotted #21211f00;
}
.pushbtn:hover {
  border: 1px dotted #21211f;
}
.MenuList-btn {
  width: inherit;
  height: 6vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.MenuList-btn > span {
  transition: all 0.3s ease;
  border: 1px dotted #21211f00;
}
.MenuList-btn > span:hover {
  border: 1px dotted #21211f;
}
</style>
