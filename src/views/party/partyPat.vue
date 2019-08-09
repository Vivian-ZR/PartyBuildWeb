<template>
  <div>
    <!-- top信息栏 -->
    <user-nav :nvaTitleOut="true" 
    :nvaTitleOneOut="'党费管理'" 
    :nvaTitleTwoOutOne="'党费列表'" 
    :nvaTitleTwoOutTwo="'党费概况'" 
    :nvaTitleTwoOutThree="'党费缴纳'" 
    :nvaTitleTwoOutStyle="'navTitleThree'"
    :navTitleOneRouter="'/partymessage'"
    :navTitleTwoRouter="'/partySurvey'">
    </user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="partyMessage" :partyOut="true"></user-aside>

    <div class="user-message-add-body">
      <div class="user-message-add-from">
        <h1 class="party-pat-title">党费缴纳</h1>
        <p class="party-pat-p1">尊敬的<span>张三</span>本次党费缴纳金额为<span>1250</span>元。</p>
        <span class="party-pat-span">选择缴费方式：</span>
        <select class="party-pat-select" name="" id="">
          <option value="">支付宝</option>
          <option value="">微信</option>
        </select>
        <div class="party-pat-qrcode-border">
          <img :src="rqcode" class="party-pat-qrcode">
        </div>
        <button class="party-pat-button">确认缴费</button>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from './../common/partyNav'
import partyAside from './../common/partyAside'
export default {
  name: 'partyPat',
  data () {
    return {
      rqcode: require('../../assets/images/icons/rqcode.png')
    }
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside
  }
}
</script>

<style>
.party-pat-title {
  display: block;
  font-size:24px;
  font-weight:500;
  text-align: center;
  padding-top: 50px;
}
.party-pat-p1 {
  display: block;
  font-size:16px;
  font-weight:400;
  color:rgba(68,68,68,1);
  padding-left: 50px;
  padding-top: 50px;
  margin-bottom: 40px;
}
.party-pat-span {
  font-size:16px;
  font-weight:400;
  color:rgba(68,68,68,1);
  padding-left: 110px;
}
.party-pat-select {
  width:150px;
  height:26px;
  cursor: pointer;
  background:rgba(255,255,255,1);
  border:1px solid rgba(170,170,170,1);
  border-radius:4px;
}
.party-pat-qrcode-border {
  width:250px;
  height:250px;
  margin: 50px auto;
  border:1px solid rgba(170,170,170,1);
}
.party-pat-qrcode {  
  width: 200px;
  height: 200px;
  margin: 25px 25px;
  border:1px solid rgba(170,170,170,1);
}
.party-pat-button {
  display: block;
  margin: 100px auto;
  width: 300px;
  height: 35px;
  color: rgba(255,255,255,1);
  background:rgba(240,70,74,1);
  border-radius:5px;
  cursor: pointer;
}
.party-pat-button:hover {
  background:rgba(220,58,62,1);
}
</style>
