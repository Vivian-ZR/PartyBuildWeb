<template>
  <div class="meeting-add">
    <div class="meeting-add-title">
      <div class="meeting-add-theme">会议详情</div>
      <div class="meeting-add-return">
        <i @click="closeDetails()" class="meeting-add-iconfont iconfont">&#xe7fc;</i>
      </div>
    </div>
    <div class="meeting-add-centont">
      <div class="meeting-add-centont-info">
        <span>会议名：</span>
        <input
          v-model="meetingName"
          class="meeting-add-centont-info-input"
          type="text"
          readonly="readonly"
        />
        <span>会议时间：</span>
        <input v-model="meetingDate" readonly="readonly" style="width: 300px" class="meeting-add-centont-info-input" />
      </div>
      <div class="meeting-add-centont-info">
        <span>会议主题：</span>
        <input v-model="meetingTheme" readonly="readonly" class="meeting-add-centont-info-input" type="text" />
      </div>
      <div class="meeting-add-centont-info">
        <span>签到时间：</span>
        <input type="text" v-model="meetingLoginIn" class="meeting-login-in" readonly="readonly" />
        <span>签到范围：</span>
        <input v-model="meetingDistance" readonly="readonly" class="meeting-add-centont-info-input" />
      </div>
      <div class="meeting-add-centont-info">
        <span>会议地点：</span>
        <input
          v-model="keyword"
          placeholder="发布地址"
          class="meeting-add-centont-addres"
          type="text"
          readonly="readonly"
        />
      </div>
      <div class="meeting-add-map-people">
        <baidu-map
          :center="positionMap"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
          id="mapID"
          class="map meeting-add-map"
        >
          <!--类型-->
          <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"></bm-map-type>
          <!--定位-->
          <bm-geolocation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-geolocation>
          <!-- 添加小红点 -->
          <bm-marker :position="positionMap" :dragging="true">
            <bm-label
              content="会议地点"
              :labelStyle="{color: 'red', fontSize : '24px'}"
              :offset="{width: -35, height: 30}"
            ></bm-label>
          </bm-marker>
        </baidu-map>
        <div class="meeting-add-people">
          <span>参加人员：</span>
          <div class="meeting-add-table-user">
            <table class="meeting-add-table">
              <tr class="meeting-add-user-org-th">
                <th class="meeting-add-th-right">组织</th>
                <th class="meeting-add-th-left">姓名</th>
              </tr>
              <tr v-for="item in userList" :key="item.id" class="meeting-add-user-users-td">
                <td>{{ item.party_branch_name }}</td>
                <td>{{ item.party_member_name }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BaiduMap,
  BmMapType,
  BmGeolocation,
  BmMarker,
  BmLabel
} from "vue-baidu-map/components";
import { getMeetingDetails } from '../../api/api'
import { formatDate } from '../common/js/date'
export default {
  name: "meetingDetails",
  components: {
    BaiduMap,
    BmMapType,
    BmGeolocation,
    BmMarker,
    BmLabel
  },
  props: {
    meetingDetailsID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      meetingName: "", // 会议名称
      meetingDate: "", // 会议时间
      meetingDateStart: "", // 会议开始时间
      meetingDateEnd: "",   // 会议结束时间
      meetingTheme: "", // 会议主题
      meetingLoginIn: "",    // 会议时间
      meetingLoginInStart: "", // 会议签到开始时间
      meetingLoginInEnd: "",  // 会议签到结束时间
      meetingDistance: "", // 会议签到范围
      keyword: "", // 会议地点
      userList: "", // 会议参加人员

      positionMap: { lng: 116.404, lat: 39.915 },
      location: "", // 地区
      zoom: 12.8, // 放大比例
    };
  },
  mounted() {
    window.console.log(this.meetingDetailsID);
    getMeetingDetails({
      meetingId: this.meetingDetailsID
    }).then(res => {
      window.console.log(res);
      if(res.code === 200) {
        this.meetingName = res.data[0].meetingList[0].meeting_name;
        this.meetingDateStart = new Date(res.data[0].meetingList[0].meeting_start_time);
        this.meetingDateEnd = new Date(res.data[0].meetingList[0].meeting_end_time);
        this.meetingDate = formatDate(this.meetingDateStart, 'yyyy-MM-dd hh:mm:ss') + '-' + formatDate(this.meetingDateEnd, 'yyyy-MM-dd hh:mm:ss');
        this.meetingTheme = res.data[0].meetingList[0].meeting_theme;
        this.meetingLoginInStart = new Date(res.data[0].meetingList[0].sign_start_time);
        this.meetingLoginInEnd = new Date(res.data[0].meetingList[0].sign_end_time);
        this.meetingLoginIn = formatDate(this.meetingLoginInStart, 'yyyy-MM-dd hh:mm:ss') + '-' + formatDate(this.meetingLoginInEnd, 'yyyy-MM-dd hh:mm:ss');
        this.meetingDistance = res.data[0].meetingList[0].punch_range;
        this.positionMap.lat = parseFloat(res.data[0].meetingList[0].y);
        this.positionMap.lng = parseFloat(res.data[0].meetingList[0].x);
        this.keyword = res.data[0].meetingList[0].meeting_location;
        this.userList = res.data[0].meetingPersonList;
      } else if (res.code == 401) {
        alert("请登录！");
        this.$store.commit('logout');
        this.$router.push({name: "Index"});
      } 
    })
  },
  methods: {
    closeDetails() {
      window.console.log(666);
      this.$parent.closeDetails();
    }
  }
};
</script>

<style>
.meeting-login-in {
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
  height: 26px;
  width: 300px;
  padding-left: 10px;
}
</style>

