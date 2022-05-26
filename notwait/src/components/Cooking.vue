<template>
  <div class="cooking-wrap">
    <div class="cooking-0" v-if="$store.state.table.cook == 1">
      <p>Not Ordered</p>
    </div>
    <div class="cooking-1" v-if="$store.state.table.cook == 0">
      <div class="cook-img"></div>
      <p>{{ $store.state.table.time }} Minutes Left..</p>
    </div>
    <div class="cooking-2" v-if="$store.state.table.cook == 1">
      <p>
        Cooking Done <br />
        We Will Bring It Soon
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.cooking-wrap {
  position: absolute;
  width: 60vw;
  height: calc(var(--vh, 1vh) * 13);
  left: 20vw;
  top: calc(var(--vh, 1vh) * 58);
  border-radius: 24px;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 0px 1px, #21211f 0px 0px 0px 1px inset;
}
.cooking-0 {
  width: 60vw;
  height: inherit;
  position: absolute;
  top: 0;
  text-align: center;
  line-height: calc(var(--vh, 1vh) * 13);
  font-weight: 700;
  color: #21211f;
}
.cooking-1 {
  width: 60vw;
  height: inherit;
  position: absolute;
  top: 0;
  text-align: center;
  font-weight: 700;
  color: #21211f;
  line-height: calc(var(--vh, 1vh) * 20);
  background-color: transparent;
  border-radius: 24px;
  overflow: hidden;
}
.cook-img {
  background-image: url('../assets/cooking.svg');
  width: 10vw;
  height: calc(var(--vh, 1vh) * 6);
  position: absolute;
  left: 27vw;
  top: calc(var(--vh, 1vh) * 1.5);
  animation: move 0.5s infinite linear;
}
@keyframes move {
  0% {
    transform: translateY(calc(var(--vh, 1vh) * 0));
  }
  25% {
    transform: translateY(calc(var(--vh, 1vh) * 0.5));
  }
  50% {
    transform: translateY(calc(var(--vh, 1vh) * 0));
  }
  75% {
    transform: translateY(calc(var(--vh, 1vh) * -0.5));
  }
  100% {
    transform: translateY(calc(var(--vh, 1vh) * 0));
  }
}
.cooking-2 {
  width: 60vw;
  height: inherit;
  position: absolute;
  top: 0;
  text-align: center;
  line-height: calc(var(--vh, 1vh) * 6);
  font-weight: 700;
  color: #21211f;
}
</style>
