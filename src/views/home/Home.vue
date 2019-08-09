<template>
  <div>
    <!-- top信息栏 -->
    <home-nav></home-nav>
    <!-- 侧边导航栏 -->
    <home-aside page="home"></home-aside>
    <!-- 主体 -->
    <home-body></home-body>        
  </div>
</template>

<script>
import partyNav from './../common/partyNav.vue'
import partyAside from './../common/partyAside.vue'
import body from './body.vue'


export default {
  name: "Home",
  components: {
    "home-nav": partyNav,
    "home-aside": partyAside,
    "home-body": body
  }
}
</script>
