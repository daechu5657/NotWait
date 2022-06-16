<template>
  <div class="owner-table-wrap" v-if="$store.state.table_modal == 1">
    <div class="owner-table-wrap-top-logo">#Dalha_min</div>
    <div class="owner-table-wrap-top-middle">
      <div
        class="owner-table-wrap-top-t"
        v-if="$store.state.table_modal == 1"
        id="bill"
      >
        <p
          class="owner-table-order-nothing"
          v-if="
            $store.state.table[$store.state.table_index].orderlist.length == 0
          "
        >
          nothing
        </p>
        <div
          class="owner-table-order"
          v-for="(a, i) in $store.state.table[$store.state.table_index]
            .orderlist"
          :key="i"
          :class="{
            blink:
              $store.state.blink[$store.state.table_index].table_order[i]
                .order == 1,
          }"
          @click="
            $store.state.blink[$store.state.table_index].table_order[
              i
            ].order = 0
          "
        >
          <div
            class="owner-table-wrap-top-table"
            v-for="(a, index) in $store.state.table[$store.state.table_index]
              .orderlist[i]"
            :key="index"
          >
            <p class="owner-table-menuname">
              {{ a.menuname }}
            </p>
            <p class="owner-table-number">
              {{ a.number }}
            </p>
            <p class="owner-table-price">
              {{ Number(a.price) * Number(a.number) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="owner-table-wrap-top-bottom"
      @click="$store.commit('table_modalOnOff')"
    >
      X
    </div>
    <div
      class="owner-table-middle-total"
      v-bind:class="{
        topoff:
          $store.state.table[$store.state.table_index].orderlist.length != 0,
      }"
    >
      <p>Total</p>
      <p>{{ totalbill }}</p>
    </div>
    <p
      class="owner-clear"
      @click="this.$store.dispatch('orderlist_talk_clear')"
    >
      clear
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalbill: 0,
    };
  },
  methods: {},
  created() {
    var n1 =
      this.$store.state.table[this.$store.state.table_index].orderlist.length;
    var f;
    var s;
    this.totalbill = 0;
    for (f = 0; f < n1; f++) {
      var n2 =
        this.$store.state.table[this.$store.state.table_index].orderlist[f]
          .length;
      var contents =
        this.$store.state.table[this.$store.state.table_index].orderlist[f];
      for (s = 0; s < n2; s++) {
        this.totalbill +=
          parseInt(contents[s].price) * parseInt(contents[s].number);
      }
    }
  },
  beforeUpdate() {
    var n1 =
      this.$store.state.table[this.$store.state.table_index].orderlist.length;
    var f;
    var s;
    this.totalbill = 0;
    for (f = 0; f < n1; f++) {
      var n2 =
        this.$store.state.table[this.$store.state.table_index].orderlist[f]
          .length;
      var contents =
        this.$store.state.table[this.$store.state.table_index].orderlist[f];
      for (s = 0; s < n2; s++) {
        this.totalbill +=
          parseInt(contents[s].price) * parseInt(contents[s].number);
      }
    }
  },
};
</script>

<style>
.owner-table-wrap {
  position: absolute;
  width: 50vw;
  height: 80vh;
  background-color: #f0f0f0;
  top: 10vh;
  left: 25vw;
  z-index: 1;
  border: 1px dotted #21211f80;
}
.owner-table-wrap-top-logo {
  position: relative;
  font-size: 3vw;
  color: #21211f;
  font-weight: 700;
  text-align: center;
  width: 40vw;
  height: 10vh;
  line-height: 10vh;
  border-bottom: 1px dotted #21211f;
  left: 5vw;
}
.owner-table-wrap-top-middle {
  position: relative;
  width: 50vw;
  height: 60vh;
  overflow: scroll;
  overflow-x: hidden;
  font-family: Abel, sans-serif;
}
.owner-table-wrap-top-t {
  position: relative;
  display: flex;
  flex-direction: column;
  width: inherit;
  height: inherit;
}
.owner-table-wrap-top-middle::-webkit-scrollbar {
  display: none;
}
.owner-table-middle-top {
  position: relative;
  border-top: 1px dotted #21211f;
  width: 40vw;
  left: 5vw;
}
.owner-table-order {
  position: relative;
  border-bottom: 1px dotted #21211f;
  width: 40vw;
  left: 5vw;
}
.owner-table-wrap-top-table {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2vh 0;
}
.owner-table-menuname {
  width: 20vw;
}
.owner-table-middle-total {
  width: 40vw;
  left: 5vw;
  position: relative;
  height: 10vh;
  line-height: 10vh;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: Abel, sans-serif;
}
.owner-table-wrap-top-bottom {
  position: absolute;
  top: 1vh;
  font-size: 0.8vw;
  right: 1vw;
  font-family: Abel, sans-serif;
  transition: all 0.3s ease;
  border: 1px dotted #21211f00;
}
.owner-table-wrap-top-bottom:hover {
  border: 1px dotted #21211f;
  padding: 0 0.5vw;
}
.owner-table-price {
  width: 3vw;
  text-align: right;
}
.owner-clear {
  position: absolute;
  top: 1vh;
  left: 1vw;
  font-size: 0.8vw;
  font-family: Abel, sans-serif;
  transition: all 0.3s ease;
  border: 1px dotted #21211f00;
}
.owner-clear:hover {
  border: 1px dotted #21211f;
  padding: 0 0.5vw;
}
.owner-table-order-nothing {
  font-size: 2vw;
  text-align: center;
  position: relative;
  margin: auto 0;
}
</style>
