<template>
  <!-- 轮播图 -->
    <div ref="swiperBox" @mouseenter="stopPlay" @mouseleave="play">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide class="slides" v-for='item in listImg' :key='item.id'>          
          <img class="swiper-image" :src="item.img" alt="swiper-image">
          <div @click="goNewsContent(item.content)" class="swiper-title">{{ item.title }}</div>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>  
    </div>

</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
require("swiper/dist/css/swiper.css")
export default {
  name: 'PDswiper',
  data () {
    return {
      // 轮播图设置
      swiperOption: {
        // 设置自动播放
        autoplay: {
          delay: 2000,
          disableOnInteraction: false  // 用户操作swiper之后，是否禁止autoplay
        },
        // 设置循环播放
        // loop: true,
        // 设置循环方向 水平 horizontal  垂直：vertical
        direction: 'horizontal', 
        // 设置分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true,  // 点击分页器的指示点分页器会控制Swiper切换
          type: "bullets",  // 分页器样式类型，bullets圆点 fraction progressbar  custom
        },
        // 设置前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }      
      }
    }
  },
  props: {
    listImg: {
      type: Array,
      required: true
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    mySwiper () {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    stopPlay () { // 鼠标悬停停止移动
      this.mySwiper.autoplay.stop()
    },
    play () {  // 鼠标移出
      this.mySwiper.autoplay.start();
    },
    goNewsContent(url) {
      let tempwindow = window.open("_blank");
      tempwindow.location = url;
    }
  }
}
</script>

<style>
.swiper-container {
  height: 350px;
}
.swiper-image {
  width: 100%;
  overflow: hidden;
}
.swiper-title {
  position: absolute;
  width: 100%;
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  top: 300px;
  color: rgba(255, 255, 255, 1);
  font-size: 23px;
  line-height: 50px;
  padding-left: 20px;
  cursor: pointer;
}
</style>
