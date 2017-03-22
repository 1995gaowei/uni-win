<template>
  <div id="app">
    <nav1></nav1>
    <router-view></router-view>
  </div>
</template>

<script>
import nav1 from './components/Nav'
export default {
  name: 'app',
  components: {
    nav1
  }
}
</script>
