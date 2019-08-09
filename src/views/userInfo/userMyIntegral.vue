<template>
  <div>
    <nav class="my-integral-nav">
      <router-link class="my-integral-return" to="/userinfo">&lt; 我的信息</router-link>
      <span class="my-integral-title">我的积分</span>
    </nav>

    <div class="my-integral-body">
      <div class="my-integral-body-article">
        <div class="user-myintegral-body">
          <img
            class="user-myintegral-background"
            src="../../assets/images/icons/user_background.png"
            alt
          />
          <div class="user-myintegral-info">
            <img class="user-myintegral-icon" :src="userIcon" />
            <div class="user-myintegral-info-meeting">
              <router-link to class="userinfo-info-title">会议</router-link>
              <div class="userinfo-info-number">
                <span class="userinfo-info-number-size">2</span>
              </div>
            </div>
            <div class="user-myintegral-info-news">
              <router-link to="/userNewsList" class="userinfo-info-title">我的消息</router-link>
              <div class="userinfo-info-number">
                <span class="userinfo-info-number-size">0</span>
              </div>
            </div>
            <div class="user-myintegral-info-integral">
              <router-link to="/userMyIntegral" class="userinfo-info-title">我的积分</router-link>
              <div class="userinfo-info-number">
                <span class="userinfo-info-number-size">0</span>
                <div class="serinfo-info-number-update">
                  <img src="../../assets/images/icons/update.png" alt />
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="user-myintegral-content-today">
          <div>
            <div class="user-message-add-icon"></div>
            <span class="user-message-add-user-title">今日积分</span>
            <span class="myintegral-solid"></span>
          </div>
          <div class="user-message-content-today-news">
            <div class="user-message-content-today-news-left">
              <div class="myintegral-dotted"></div>
              <div class="user-message-content-today-news-title">登录</div>
              <div class="user-message-content-today-news-contents">每日首次登录获得1积分</div>
            </div>
            <div class="user-message-content-today-news-right">
              <span>1</span>/
              <span>1</span>分
            </div>
          </div>
          <div class="user-message-content-today-news">
            <div class="user-message-content-today-news-left">
              <div class="myintegral-dotted"></div>
              <div class="user-message-content-today-news-title">文章阅读</div>
              <div class="user-message-content-today-news-contents">每日首次登录获得1积分</div>
            </div>
            <div class="user-message-content-today-news-right">
              <span>1</span>/
              <span>1</span>分
            </div>
          </div>
          <div class="user-message-content-today-news">
            <div class="user-message-content-today-news-left">
              <div class="myintegral-dotted"></div>
              <div class="user-message-content-today-news-title">文献阅读</div>
              <div class="user-message-content-today-news-contents">每日首次登录获得1积分</div>
            </div>
            <div class="user-message-content-today-news-right">
              <span>1</span>/
              <span>1</span>分
            </div>
          </div>
          <div class="user-message-content-today-news">
            <div class="user-message-content-today-news-left">
              <div class="myintegral-dotted"></div>
              <div class="user-message-content-today-news-title">文献阅读</div>
              <div class="user-message-content-today-news-contents">每日首次登录获得1积分</div>
            </div>
            <div class="user-message-content-today-news-right">
              <span>1</span>/
              <span>1</span>分
            </div>
          </div>
          <div class="user-message-content-today-news">
            <div class="user-message-content-today-news-left">
              <div class="myintegral-dotted"></div>
              <div class="user-message-content-today-news-title">文献阅读</div>
              <div class="user-message-content-today-news-contents">每日首次登录获得1积分</div>
            </div>
            <div class="user-message-content-today-news-right">
              <span>1</span>/
              <span>1</span>分
            </div>
          </div>
        </div>

        <div class="user-myintegral-content-today">
          <div>
            <div class="user-message-add-icon"></div>
            <span class="user-message-add-user-title">历史积分</span>
            <span class="myintegral-solid"></span>
          </div>
          <div class="user-myintegral-content-table">
            <table class="user-myintegral-table">
              <tr>
                <th>时间</th><th class="user-myintegral-special">积分数</th><th>获得途径</th>
              </tr>
              <tr class="user-myintegral-table-tr">
                <td>2019-6-19/09:23</td><td>1</td><td>有效文献阅读</td>
              </tr>
              <tr class="user-myintegral-table-tr">
                <td>2019-6-19/09:23</td><td>1</td><td>有效文献阅读</td>
              </tr>
              <tr class="user-myintegral-table-tr">
                <td>2019-6-19/09:23</td><td>1</td><td>有效文献阅读</td>
              </tr>
              <tr class="user-myintegral-table-tr">
                <td>2019-6-19/09:23</td><td>1</td><td>有效文献阅读</td>
              </tr>
              <tr class="user-myintegral-table-tr">
                <td>2019-6-19/09:23</td><td>1</td><td>有效文献阅读</td>
              </tr>
              <tr class="user-myintegral-table-tr">
                <td>2019-6-19/09:23</td><td>1</td><td>有效文献阅读</td>
              </tr>
              <tr class="user-myintegral-table-tr">
                <td>2019-6-19/09:23</td><td>1</td><td>有效文献阅读</td>
              </tr>
              <tr class="user-myintegral-table-tr">
                <td>2019-6-19/09:23</td><td>1</td><td>有效文献阅读</td>
              </tr>
              <tr class="user-myintegral-table-tr">
                <td>2019-6-19/09:23</td><td>1</td><td>有效文献阅读</td>
              </tr>
              <tr class="user-myintegral-table-tr">
                <td>2019-6-19/09:23</td><td>1</td><td>有效文献阅读</td>
              </tr>
            </table>
            <div class="user-myintegral-table-footer">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userMyIntegral",
  data() {
    return {
      userIcon: require("../../assets/images/userAvatar/userhead.png"),
      classUrl: require("../../assets/images/icons/class2.png")
    };
  }
};
</script>

<style>
.my-integral-nav {
  width: 100%;
  height: 60px;
  box-shadow: 3px 4px 4px 0px rgba(86, 86, 86, 0.1);
}
.my-integral-body {
  width: 100%;
  /* height: 1100px; */
  margin: 0 auto;
  padding-bottom: 50px;
  background: url("../../assets/images/icons/background.png");
}
.my-integral-body-article {
  width: 54.4%;
  /* height: 1100px; */
  margin: 0 auto;
  padding-bottom: 30px;
  background-color: rgba(255, 255, 255, 1);
}
.my-integral-return {
  color: rgba(68, 68, 68, 1);
  font-size: 20px;
  line-height: 60px;
  margin-left: 40px;
}
.my-integral-return:hover {
  color: rgba(220, 58, 62, 1);
}
.my-integral-title {
  float: right;
  color: rgba(68, 68, 68, 1);
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
  margin-right: 40px;
}
.user-myintegral-body {
  overflow: hidden;
  height: 196px;
  width: 100%;
}
.user-myintegral-background {
  width: 100%;
  height: 196px;
}
.user-myintegral-info {
  position: relative;
  top: -196px;
  height: 196px;
  width: 100%;
}
.user-myintegral-icon {
  position: relative;
  left: 60px;
  top: 30px;
}
.user-myintegral-info-integral,
.user-myintegral-info-meeting,
.user-myintegral-info-news {
  float: right;
  width: 200px;
  height: 80px;
  margin-top: 60px;
}
.user-myintegral-info-news {
  border-left: 2px solid rgba(255, 255, 255, 1);
  border-right: 2px solid rgba(255, 255, 255, 1);
}
.user-myintegral-content-today {
  padding-top: 20px;
}
.myintegral-solid {
  display: inline-block;
  position: relative;
  top: -28px;
  left: 100px;
  width: 70%;
  height: 1px;
  background-color: rgba(186, 186, 186, 1);
}
.user-message-content-today-news {
  width: 75%;
  height: 80px;
  margin: 0 auto;
}
.user-message-content-today-news-left {
  float: left;
  height: 70px;
  width: 85%;
}
.user-message-content-today-news-right {
  float: right;
  height: 70px;
  width: 15%;
  font-size: 18px;
  font-weight: 400;
  color: rgba(68, 68, 68, 1);
  text-align: center;
  line-height: 50px;
}
.myintegral-dotted {
  width: 100%;
  border-bottom: 1px dashed rgba(186, 186, 186, 1);
  margin-top: 25px;
}
.user-message-content-today-news-title {
  font-size: 18px;
  font-weight: 400;
  color: rgba(68, 68, 68, 1);
  display: inline-block;
  padding-right: 30px;
  background-color: rgba(255, 255, 255, 1);
  height: 50px;
  line-height: 50px;
  position: relative;
  top: -25px;
}
.user-message-content-today-news-contents {
  position: relative;
  top: -25px;
  color: rgba(153, 153, 153, 1);
}
.user-myintegral-content-table {
  width: 75%;
  height: 430px;
  margin: 0 auto;
  margin-bottom: 50px;
}
.user-myintegral-table {
  border-left: 5px solid rgba(186,186,186,1);
  border-right: 5px solid rgba(186,186,186,1);
}
.user-myintegral-table th {
  font-size:18px;
  background:rgba(186,186,186,1);
  border-top: 5px solid rgba(186,186,186,1);
  border-bottom: 5px solid rgba(186,186,186,1);
  color: rgba(255, 255, 255, 1);
}
.user-myintegral-special {
  border-left: 3px solid rgba(255,255,255,1);
  border-right: 3px solid rgba(255,255,255,1);
}
.user-myintegral-table-tr {
  background: rgba(255, 255, 255, 1);
  font-size:16px;
  color:rgba(68,68,68,1);
}
.user-myintegral-table-tr:hover {
  background:rgba(223,223,223,1);
}
.user-myintegral-table-footer {
  width: calc(100% - 1px);
  height: 40px;
  background: rgba(186,186,186,1);
}
</style>
