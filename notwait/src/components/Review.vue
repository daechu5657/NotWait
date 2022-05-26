<template>
  <div class="review-wrap" v-if="$store.state.review_modal == 1">
    <div class="review-top">
      <p class="review-menuname">
        {{ $store.state.menulist[$store.state.review_index].menuname }}
      </p>
      <div class="review-top-right">
        <p class="totalstar">★</p>
        <p class="totalvalue">{{ totalvalue }}</p>
      </div>
    </div>
    <div class="review-repeat-wrap">
      <p
        class="review-nothing"
        v-if="
          $store.state.menulist[$store.state.review_index].review.length == 0
        "
      >
        Nothing
      </p>
      <div
        class="review-repeat"
        v-for="(a, i) in $store.state.menulist[$store.state.review_index]
          .review"
        :key="i"
      >
        <p class="review-repeat-text">
          {{ $store.state.menulist[$store.state.review_index].review[i].text }}
        </p>
        <div class="review-repeat-right">
          <p class="review-repeat-star">★</p>
          <p class="review-repeat-value">
            {{
              $store.state.menulist[$store.state.review_index].review[i].value /
              2
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="review-write">
      <input
        type="text"
        class="review-input"
        placeholder="Contents"
        v-model="send.text"
      />
      <!-- <input type="text" class="review-value" v-model="send.value" /> -->
      <div class="star">
        <p class="star-back">★★★★★</p>
        <p class="star-color" style="width: 0">★★★★★</p>
        <p class="star-score">{{ this.send.value / 2 }}</p>
        <input
          class="star-picker"
          type="range"
          step="1"
          min="0"
          max="10"
          v-model="send.value"
        />
        <div class="star-write" @click="$store.dispatch('review_update', send)">
          Write
        </div>
        <div class="star-close" @click="$store.commit('review_modalOnOff')">
          Close
        </div>
      </div>
    </div>
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
        value: 0,
      },
      totalvalue: 0,
    };
  },
  watch: {
    send: {
      deep: true,
      handler() {
        document.querySelector('.star-color').style.width = `${
          this.send.value * 2
        }vw`;
      },
    },
  },
  mounted() {
    var length =
      this.$store.state.menulist[this.$store.state.review_index].review.length;
    var i;
    for (i = 0; i < length; i++) {
      this.totalvalue += parseInt(
        this.$store.state.menulist[this.$store.state.review_index].review[i]
          .value
      );
    }
    this.totalvalue = this.totalvalue / length / 2;
    if (length == 0) {
      this.totalvalue = 0;
    }
  },
};
</script>

<style>
.review-wrap {
  position: absolute;
  width: 80vw;
  height: calc(var(--vh, 1vh) * 40);
  top: calc(var(--vh, 1vh) * 20);
  left: 10vw;
  background-color: #f0f0f0;
  /* backdrop-filter: blur(4px); */
  border-radius: 24px;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px,
    rgb(9 30 66 / 8%) 0px 0px 0px 1px;
}
.review-repeat-wrap {
  width: 80vw;
  height: calc(var(--vh, 1vh) * 23);
  overflow: scroll;
}
.review-nothing {
  text-align: center;
  width: 80vw;
  height: calc(var(--vh, 1vh) * 23);
  line-height: calc(var(--vh, 1vh) * 23);
  font-size: 4vw;
  color: rgba(151, 151, 150, 0.4588235294117647);
}
.review-repeat {
  width: 70vw;
  height: calc(var(--vh, 1vh) * 5);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 24px;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px,
    rgb(9 30 66 / 8%) 0px 0px 0px 1px;
  left: 5vw;
  position: relative;
  line-height: calc(var(--vh, 1vh) * 5);
  margin: 2vw 0;
}
.review-top {
  width: 70vw;
  height: calc(var(--vh, 1vh) * 5);
  position: relative;
  left: 5vw;
  margin: 3vw 0;
  text-align: center;
  line-height: calc(var(--vh, 1vh) * 5);
  border-radius: 24px;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px,
    rgb(9 30 66 / 8%) 0px 0px 0px 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #00000012;
}

.review-menuname {
  width: 60vw;
}
.review-top-right {
  width: 10vw;
  display: flex;
  flex-direction: row;
  margin-right: 5vw;
}
.totalstar {
  width: 5vw;
}
.totalvalue {
  width: 5vw;
}

.review-repeat-text {
  width: 60vw;
  margin-left: 5vw;
}
.review-repeat-right {
  width: 10vw;
  margin-right: 5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.review-repeat-star {
  width: 5vw;
}
.review-repeat-value {
  width: 5vw;
  text-align: center;
}
.review-write {
  position: relative;
  width: 80vw;
  height: calc(var(--vh, 1vh) * 8);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.review-input {
  width: 70vw;
  height: calc(var(--vh, 1vh) * 3);
  position: relative;
  left: 5vw;
  outline: none;
  border: 0;
  border-radius: 24px;
  text-align: center;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px,
    rgb(9 30 66 / 8%) 0px 0px 0px 1px;
  background-color: #f8f8f8;
}
.review-input::placeholder {
  color: rgba(151, 151, 150, 0.4588235294117647);
  font-size: 3vw;
}
.star {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.star-back {
  position: relative;
  width: 20vw;
  height: calc(var(--vh, 1vh) * 3);
  color: rgba(151, 151, 150, 0.4588235294117647);
  left: 6vw;
}
.star-color {
  width: 0;
  height: calc(var(--vh, 1vh) * 3);
  position: absolute;
  left: 6vw;
  color: #21211f;
  overflow: hidden;
  pointer-events: none;
}
.star-score {
  font-size: 3.5vw;
  text-align: center;
  width: 10vw;
  height: calc(var(--vh, 1vh) * 3);
  line-height: calc(var(--vh, 1vh) * 3);
}
.star-picker {
  width: 20vw;
  position: absolute;
  height: calc(var(--vh, 1vh) * 3);
  left: 3vw;
  opacity: 0;
}
.star-write {
  font-size: 3.5vw;
  text-align: center;
  width: 15vw;
  height: calc(var(--vh, 1vh) * 3);
  line-height: calc(var(--vh, 1vh) * 3);
  position: relative;
  left: 3vw;
}
.star-close {
  position: relative;
  font-size: 3.5vw;
  text-align: center;
  width: 15vw;
  height: calc(var(--vh, 1vh) * 3);
  line-height: calc(var(--vh, 1vh) * 3);
  right: 5vw;
}
</style>
