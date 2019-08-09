<template>
  <article>
    <div class="article-left">
      <img :src="bodyImgUrl" alt="bodytitleImage" class="bodytitleImage">            
      <div class="essay">  
        <!-- 轮播图 -->  
        <div class="body-swiper">
          <index-swiper :listImg="listImg"></index-swiper>
        </div>  
        <!-- 文章链接 -->
        <div class="body-block">
          <body-block 
            v-for="item in indexBlockDatas" 
            :key="item.id" 
            :title="item.theme" 
            :PDurl="item.url"
            :article="item.result"
          ></body-block>
        </div>
      </div>
    </div>
    <!-- 快捷入口 -->
    <div class="article-right">
      <body-entry 
        v-for="item in bodyEntryData" 
        :key="item.id" 
        :entryNav="item.entryNav"
        :entryImgUrl="item.entryImgUrl"
        :jumpNav="item.url"
      ></body-entry>
      <div class="body-entry-button">添加新快捷通道</div>
    </div>
  </article>
</template>

<script>
import PDswiper from '../common/swiper.vue';
import block from './block';
import entry from './entry.vue';
import { getNewsMap, getNewsThemeList } from '../../api/api';
export default {
  name: 'Homebody',
  data () {
    return {
      bodyImgUrl: require("../../assets/images/icons/bodyTitle.png"),
      // 轮播图数据
      listImg: [],
      // 文章数据
      indexBlockDatas: [],
      // entryData 
      bodyEntryData: [
        {
          entryNav: "新闻汇总",
          entryImgUrl: require("../../assets/images/icons/nav_classroom.png"),
          url: "/newslist"
        },
        {
          entryNav: "课堂",
          entryImgUrl: require("../../assets/images/icons/nav_classroom.png"),
          url: "/studyClass"
        },
        {
          entryNav: "思想汇报",
          entryImgUrl: require("../../assets/images/icons/nav_classroom.png"),
          url: "/reportList"
        },
        {
          entryNav: "公告信息",
          entryImgUrl: require("../../assets/images/icons/nav_classroom.png"),
          url: "/democratic"
        },
        {
          entryNav: "计划总结",
          entryImgUrl: require("../../assets/images/icons/nav_classroom.png"),
          url: "/planSummary"
        },
        {
          entryNav: "文件资料柜",
          entryImgUrl: require("../../assets/images/icons/nav_classroom.png"),
          url: "/documentCabinet"
        },
        {
          entryNav: "通讯录",
          entryImgUrl: require("../../assets/images/icons/nav_classroom.png"),
          url: "/mailList"
        }
      ]
    }
  },
  components: {
    "body-block": block,
    "body-entry": entry,
    "index-swiper": PDswiper
  },
  mounted() {
    getNewsMap().then(res => {
      this.listImg = res.data;
    });
    getNewsThemeList().then(res => {
      this.indexBlockDatas = res.data.slice(0,6);
    })        
  }
}
</script>

<style>
article {
  float: left;
  background: url("../../assets/images/icons/background.png");
  width: calc(100% - 200px);
  height: 1020px;
}
.article-left {
  float: left;
  width: 70%;
  height: 1020px;
}
.article-right {
  float: left;
  width: calc(30% - 70px);
  margin-left: 40px;
  margin-top: 20px;
  /* height: 970px; */
  background: rgba(255, 255, 255, 1);
}
.bodytitleImage {
  float: left;
  width: 100%;
  height: 18%;
  margin-top: 20px;
  margin-left: 20px;
}
.essay {
  float: left;
  width: 100%;
  height: calc(78% - 40px);
  background: rgba(255, 255, 255, 1);
  margin-left: 20px;
  margin-top: 20px;
  padding-top: 10px;
}
.body-swiper {
  width: calc(100% - 40px);
  height: 350px;
  padding-left: 20px;
  padding-top: 10px;
}
.body-block {
  width: calc(100% - 40px);
  height: 350px;
  margin: 20px;
}
.body-entry-button {
  float: left;
  height: 50px;
  width: 70%;
  border: 1px solid #999;
  border-radius: 3px;
  font-size: 1.6vmax;
  text-align: center;
  line-height: 50px;
  margin-left: 15%;
  margin-top: 10px;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
