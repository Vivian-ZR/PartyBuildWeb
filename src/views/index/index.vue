<template>
  <div>
    <nav class="index-nva">
      <div class="index-nva-title">智慧党建平台</div>   
      <div class="index-nva-right" v-on:click="login = true">
        <div class="index-nav-login">登录</div>      
        <img class="index-nav-icon" src="../../assets/images/userAvatar/userWhite.png" alt="UserIcon">
      </div>               
    </nav>
    <index-login v-if="login" :login="login" @return-login="returnLogin"></index-login>
    <div class="index-body">
      <img :src="IndexImgUrl" alt="IndexImg" class="index-body-img">
      <div class="index-body-contine">
        <!-- 轮播图 -->
        <index-swiper :listImg="IndexlistImgSwiper"></index-swiper>
        <!-- 文章链接 -->
        <div class="index-block">
          <index-block
            v-for="item in indexBlockDatas"
            :key="item.id"
            :title="item.theme"
            :PDurl="item.url"
            :article="item.result"
          ></index-block>
        </div>
      </div>
    </div>    
    
  </div>
</template>

<script>
import PDswiper from '../common/swiper.vue';
import block from '../home/block.vue';
import PDlogin from './login.vue';
import { getNewsMap, getNewsThemeList } from '../../api/api';
export default {
  name: 'Index',
  data () {
    return {
      IndexImgUrl: require("../../assets/images/icons/bodyTitle.png"),
      indexBlock: '',
      login: false,

      // 轮播图
      IndexlistImgSwiper: [],
      // 文章数据
      indexBlockDatas: [],
      

    }
  },
  components: {
    'index-swiper': PDswiper,
    'index-block': block,
    'index-login': PDlogin
  },
  mounted() {
    getNewsMap().then(res => {
      this.IndexlistImgSwiper = res.data;
    });
    getNewsThemeList().then(res => {
      this.indexBlockDatas = res.data.slice(0,6);
    })
  },
  methods: {
    returnLogin (val) {
      this.login = val;
    }
  }
}
</script>

<style>
.index-nva {
  width: 100%;
  height: 40px;
  background-color: rgba(197, 1, 5, 1);
}
.index-nva-title {
  float: left;
  color: rgba(255, 255, 255, 1);
  margin-left: 32px;
  line-height: 40px;
  font-family:STXingkai;
  font-size:  24px;
  font-weight: 400;
}
.index-nva-right {
  float: right;
  height: 40px;
  width: 100px;
  margin-right: 80px;
  cursor: pointer;
}
.index-nva-right:hover {
  background:rgba(160,2,9,1);
}
.index-nav-login {
  float: right;
  color: aliceblue;
  line-height: 40px;
  cursor: pointer;
  margin-right: 17px;
}
.index-nav-icon {
  float: right;
  width: 25px;
  margin-top: 7px;
  margin-right: 8px;
}
.index-body {
  width: 54.4%;
  margin: auto;
}
.index-body-img {
  width: 100%;
  margin-top: 20px;
}
.index-body-contine {
  width: 100%;
  height: 500px;
  margin-top: 20px;
}
.index-swiper {
  width: 100%;
  height: 347px;
}
.index-block {
  width: 100%;
  height: 380px;
  margin-top: 20px;
}
</style>
