<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'课程'"
      :nvaTitleTwoOutOne="'课程列表'"
      :nvaTitleTwoOutTwo="'我的课程'"
      :nvaTitleTwoOutThree="'课程管理'"
      :nvaTitleTwoOutStyle="'navTitleOne'"
      :navTitleTwoRouter="'/mystudyClass'"
      :navTitleThreeRouter="'/studyClassMessage'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="studyClass" :studyOut="true"></user-aside>

    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <div class="class-video-nav">
          <router-link class="class-video-return" to="/classDetails">章节一</router-link>
          <span>\</span>
          <span>课时一</span>
        </div>
        <video-player
          class="video-player vjs-custom-skin class-video-map4"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
        <div class="class-video-info">
          <span>课程信息</span>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;党课是以上课讲授的形式进行党的基本知识教育。是中国共产党对党员和申请入党的积极分子进行教育的重要方式。党的各级组织通过党课，定期向党员和入党积极分子宣传党的路线、方针、政策；进行党性、党纪和党的基本知识教育。</p>
          <span>课时列表:</span>
          <div class="class-video-class-hous">
            <span>章节一:</span>
            <span>&nbsp;&nbsp;一抓到底正风纪</span>
            <div class="class-video-class-hous-mp4">
              <div>课时一:&nbsp;&nbsp;&nbsp;&nbsp;一抓到底正风纪</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
export default {
  name: "classvideo",
  data() {
    return {
      selectChoise: ["题名", "主题"],
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "http://47.101.221.57:10085/0001.mp4",
            type: "video/mp4"
          }
        ],
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      video: "47.101.221.57:10085/0001.mp4"
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    videoPlayer
  }
};
</script>

<style>
.class-video-nav {
  padding-top: 30px;
  margin-left: 30px;
}
.class-video-nav span,
.class-video-return {
  display: inline-block;
  font-size: 18px;
  margin: 0 10px;
  color: rgba(68, 68, 68, 1);
}
.class-video-return:hover {
  color: red;
}
.class-video-map4 {
  float: left;
  width: calc(70% - 50px);
  height: 400px;
  margin-top: 30px;
  margin-left: 30px;
}
.class-video-info {
  float: left;
  width: calc(30% - 30px);
  height: 500px;
  margin-top: 10px;
  margin-left: 20px;
}
.class-video-info p {
  line-height: 20px;
}
.class-video-info span {
  display: inline-block;
  font-size: 18px;
  margin: 20px 0;
}
.class-video-class-hous {
  margin-left: 10px;
}
.class-video-class-hous-mp4 {
  margin-left: 10px;
  cursor: pointer;
}
.class-video-class-hous-mp4:hover {
  color: red;
}
</style>

