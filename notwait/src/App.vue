<template>
  <div class="base-frame">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
div {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* width: 100vw;
  height: calc(var(--vh, 100vh) * 100); */
  /* overflow: hidden; */
  /* touch-action: none; */
}

.base-frame {
  width: 100vw;
  height: calc(var(--vh, 100vh) * 100);
  background-color: #2b2b2b;
}
</style>
