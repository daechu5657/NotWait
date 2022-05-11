<template>
  <div class="wrap">
    <div class="table-number">{{ $route.params.id }}번테이블</div>
    <div class="list">
      <div class="menu-list">
        <p>메뉴판</p>
        <div class="menu-list-top">
          <p>메뉴1 닭볶음탕 16000원</p>
          <button>담기</button>
        </div>
        <div class="menu-list-bottom">
          <div class="menu-list-bottom-basket"></div>
          <button>주문</button>
        </div>
      </div>
      <div class="bill-list">
        <div class="bill-list-top">계산서</div>
        <div class="bill-list-middle">주문내역</div>
        <div class="bill-list-bottom">총금액</div>
      </div>
    </div>
    <div class="counter">
      <div class="talk-counter"></div>
      <div class="call-counter"></div>
    </div>
  </div>
</template>

<script>
let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty('--vh', `${vh}px`);
export default {
  data() {
    return {
      modal: 0,
      menu: 0,
      bill: 0,
    };
  },
};
</script>

<style>
.wrap {
  width: 100vw;
  background-color: #898989;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);
}
.table-number {
  width: 100%;
  height: calc(var(--vh, 1vh) * 5);
  border: 1px solid;
  /* margin: 1--vh 0; */
  text-align: center;
  line-height: calc(var(--vh, 1vh) * 5);
}
.list {
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 80);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.menu-list {
  width: 20vw;
  height: calc(var(--vh, 1vh) * 80);
  border: 1px solid;
  position: relative;
  left: 5.5px;
}
.menu-list-top {
  width: 5vw;
  height: calc(var(--vh, 1vh) * 70);
  border: 1px solid;
  /* margin: 1vh 0; */
  left: 20px;
  position: relative;
}
.menu-list > p {
  width: 100%;
  height: calc(var(--vh, 1vh) * 2);
  border: 1px solid;
}
.bill-list {
  width: 20vw;
  height: calc(var(--vh, 1vh) * 80);
  border: 1px solid;
  position: relative;
  right: 5.5px;
}
.bill-list-top {
  width: inherit;
  height: calc(var(--vh, 1vh) * 6);
  border: 1px solid;
}
.bill-list-middle {
  width: inherit;
  height: calc(var(--vh, 1vh) * 60);
  border: 1px solid;
  /* margin: 2vh 0; */
}
.bill-list-bottom {
  width: inherit;
  height: calc(var(--vh, 1vh) * 10);
  border: 1px solid;
}
.counter {
  width: 100%;
  height: calc(var(--vh, 1vh) * 15);
  /* margin: 1--vh 0; */
  border: 1px solid;
}
</style>
