<template>
  <div class="meeting-add">
    <div class="meeting-add-title">
      <div class="meeting-add-theme">修改会议</div>
    </div>
    <div class="meeting-add-centont">
      <div class="meeting-add-centont-info">
        <span>会议名：</span>
        <input v-model="meetingName" class="meeting-add-centont-info-input" type="text" />
        <span>会议时间：</span>
        <meeting-date 
          v-model="meetingDate" 
          range 
          type="datetime"
          format="YYYY-MM-DD HH:mm:ss" 
          id="meetingEditeDate"
        ></meeting-date>

      </div>
      <div class="meeting-add-centont-info">
        <span>会议主题：</span>
        <input v-model="meetingTheme" class="meeting-add-centont-info-input" type="text" />
      </div>
      <div class="meeting-add-centont-info">
        <span>签到时间：</span>
        <meeting-sing-in
          v-model="meetingLoginIn"
          id="meetingLoginIn"
          range
          type="datetime"
          lang="en"
          format="YYYY-MM-DD HH:mm:ss"
        ></meeting-sing-in>
        <span>签到范围：</span>
        <select v-model="meetingDistance" name id>
          <option value="100">0-100m</option>
          <option value="200">0-200m</option>
          <option value="300">0-300m</option>
          <option value="400">0-400m</option>
          <option value="500">0-500m</option>
        </select>
      </div>
      <div class="meeting-add-centont-info">
        <span>会议地点：</span>
        <input v-model="keyword" placeholder="发布地址" class="meeting-add-centont-addres" type="text" />
      </div>
      <div class="meeting-add-map-people">
        <baidu-map
          :center="positionMap"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
          id="mapID"
          class="map meeting-add-map"
          @click="getPoint"
        >
          <!-- 关键字检索 -->
          <bm-local-search
            :keyword="keyword"
            zoom="12.8"
            style="display: none"
            :auto-viewport="true"
            :location="location"
          ></bm-local-search>
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
          <span @click="meetingAddUser = true" class="meeting-add-people-add">添加人员</span>
          <div class="meeting-add-table-user">
            <table class="meeting-add-table">
              <tr class="meeting-add-user-org-th">
                <th class="meeting-add-th-right">组织</th>
                <th class="meeting-add-th-left">姓名</th>
              </tr>
              <tr v-for="item in userList" :key="item.id" class="meeting-add-user-users-td">
                <td>{{ item.party_branch_name }}</td>
                <td>
                  {{ item.party_member_name }}
                  <i 
                    @click="deleteUser(item.ids)"
                    class="meeting-add-table-icon iconfont"
                  >&#xe7fc;</i>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <button @click="closeEdite" class="user-message-info-button meeting-add-button-1">取消</button>
      <button @click="ReleaseMeeting" class="user-message-info-button meeting-add-button-2">发布</button>
    </div>

    <meeting-add-user v-if="meetingAddUser" :meetingAddUser="meetingAddUser"></meeting-add-user>
  </div>
</template>

<script>
import {
  BaiduMap,
  BmMapType,
  BmGeolocation,
  BmMarker,
  BmLocalSearch,
  BmLabel
} from "vue-baidu-map/components";
import meetingAddUser from "./meetingAddUser";
import myDatepicker from "vue2-datepicker";
import { formatDate } from '../common/js/date'
import { getMeetingDetails, updateModifyMeeting } from "../../api/api"
export default {
  name: "meetingEdite",
  components: {
    BaiduMap,
    BmMapType,
    BmGeolocation,
    BmMarker,
    BmLocalSearch,
    BmLabel,
    "meeting-date": myDatepicker,
    "meeting-sing-in": myDatepicker,
    "meeting-add-user": meetingAddUser
  },
  props: {
    meetingID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      meetingAddUser: false, // 添加用户组件
      keyword: "",            // 会议地点
      positionMap: { lng: 116.404, lat: 39.915 },
      location: "", // 地区
      zoom: 12.8, // 放大比例

      meetingPostion: {},       // 会议坐标
      meetingName: "",          // 会议名称
      meetingTheme: "",         // 会议主题
      meetingDate: "",          // 会议时间
      meetingLoginIn: "",       // 会议签到时间
      meetingDistance: "",      // 会议签到范围      
      userList: ""              // 会议参加人员
    };
  },
  mounted() {
    window.console.log(this.meetingID);
    getMeetingDetails({
      meetingId: this.meetingID
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
    getPoint(e) {
      this.positionMap.lng = e.point.lng;
      this.positionMap.lat = e.point.lat;
    },
    MeetingAddUser(val) {
      this.meetingAddUser = val;
    },
    closeEdite() {
      this.$parent.closeEdite();
    },
    addUserList: function(list) {
      this.userList = list;
      window.console.log(this.userList);
    },
    deleteUser: function(id) {
      let user_ids = id;
      for (let i = 0; i < this.userList.length; i++) {
        window.console.log(this.userList[i].ids);
        if (this.userList[i].ids === user_ids) {
          this.userList.splice(i--, 1);
        }
      }
    },    
    ReleaseMeeting: function() {
      window.console.log(666);
      if(this.meetingName == "") {
        alert("请填写会议名！");
      }else if(this.meetingDate == "") {
        alert("请选择会议时间！");
      }else if(this.meetingTheme == "") {
        alert("请填写会议主题！");
      }else if(this.meetingLoginIn == "") {
        alert("请选择签到时间！");
      }else if(this.meetingDistance == "") {
        alert("请选择签到范围!");
      }else if(this.keyword == "") {
        alert("请选择会议地点");
      }else if(this.userList == "") {
        alert("请选择参加会议人员");
      }else {
        let userString = '';
        let meetingStartTime = formatDate(new Date(this.meetingDate[0]), 'yyyy-MM-dd hh:mm:ss');
        window.console.log(meetingStartTime);
        let meetingEndTime = formatDate(new Date(this.meetingDate[1]), 'yyyy-MM-dd hh:mm:ss');
        let signStartTime = formatDate(new Date(this.meetingLoginIn[0]), 'yyyy-MM-dd hh:mm:ss');
        let signEndTime = formatDate(new Date(this.meetingLoginIn[1]), 'yyyy-MM-dd hh:mm:ss');
        for(let s of this.userList) {
          if(userString.length === 0) {
            userString = userString + s.ids;
          } else {
            userString = userString + ',' + s.ids;
          }          
        }        
        window.console.log(userString);
        updateModifyMeeting({
          id: this.meetingID,
          y: this.positionMap.lat,
          x: this.positionMap.lng,
          meetingName: this.meetingName,
          meetingStartTime: meetingStartTime,
          meetingEndTime: meetingEndTime,
          meetingTheme: this.meetingTheme,
          meetingLocation: this.keyword,
          punchRange: this.meetingDistance,
          punchType: '手机打卡',
          meetingAnnex: '***',
          annexName: '***',
          meetingSummary: '****',
          meetingStatus: '2',
          signStartTime: signStartTime,
          signEndTime: signEndTime,
          partMemberIds: userString
        }).then(res => {
          window.console.log(res);
          if (res.code == 200) {
            alert("会议修改成功！");
            this.$parent.updateTable();
            this.$parent.closeEdite();
          } else if (res.code == 401) {
            alert("请登录！");
            this.$store.commit("logout");
            this.$router.push({ name: "Index" });
          }          
        })
      }
    }
  }
};
</script>

<style>
.meeting-add {
  position: fixed;
  width: 1200px;
  height: 650px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 8px 1px rgba(86, 86, 86, 0.1);
  border-radius: 4px;
  left: calc(50% - 600px);
  top: 5%;
}
.meeting-add-title {
  width: 100%;
  height: 45px;
  border-radius: 4px 4px 0 0;
  background: rgba(197, 1, 5, 1);
}
.meeting-add-theme {
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}
.meeting-add-return {
  float: right;
  height: 45px;
  width: 45px;
  cursor: pointer;
  margin-top: -45px;
}
.meeting-add-return:hover {
  background-color: rgba(160, 2, 9, 1);
  border-radius: 0 4px 0 0;
}
.meeting-add-iconfont {
  float: right;
  height: 45px;
  font-size: 30px !important;
  color: rgba(255, 255, 255, 1);
  margin-top: 8px;
  margin-right: 8px;
  cursor: pointer;
}
.meeting-add-centont {
  width: 100%;
  height: 585px;
  padding-top: 20px;
}
.meeting-add-centont-info {
  width: 90%;
  margin: 5px auto;
  height: 40px;
}
.meeting-add-centont-info span {
  display: inline-block;
  font-size: 18px;
  color: rgba(68, 68, 68, 1);
  width: 90px;
  margin-left: 20px;
}
.meeting-add-centont-info-input,
.meeting-add-centont-info select {
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
  height: 26px;
  width: 190px;
  padding-left: 10px;
}
.meeting-add-centont-addres {
  display: inline-block;
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
  height: 26px;
  width: 190px;
  padding-left: 10px;
  width: 500px !important;
  z-index: 100;
}
.meeting-add-map-people {
  width: 90%;
  height: 310px;
  margin: 0 auto;
}
.meeting-add-map {
  float: left;
  width: 50%;
  height: 310px;
}
/deep/ .anchorBL {
  display: none;
}
.meeting-add-button-1 {
  background: rgba(240, 70, 74, 1);
}
.meeting-add-button-1:hover {
  background: rgba(220, 58, 62, 1);
}
.meeting-add-button-2 {
  background: rgba(100, 163, 241, 1);
}
.meeting-add-button-2:hover {
  background: rgba(92, 151, 224, 1);
}
#meetingEditeDate {
  width: 360px;
}
#meetingLoginIn {
  width: 360px;
}
.meeting-add-people {
  float: left;
  width: calc(50% - 20px);
  height: 310px;
  font-size: 18px;
  padding-left: 20px;
}
.meeting-add-table-user {
  width: 100%;
  height: 280px;
  overflow-y: auto;
  border: 5px solid rgba(170, 170, 170, 1);
}
.meeting-add-table {
  color: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
.meeting-add-th-right {
  border-right: 1px solid rgba(255, 255, 255, 1);
}
.meeting-add-th-left {
  border-left: 1px solid rgba(255, 255, 255, 1);
}
.meeting-add-table-icon {
  float: right;
  padding-right: 20px;
}
.meeting-add-table-icon:hover {
  color: rgba(220, 58, 62, 1);
}
.meeting-add-people-add {
  float: right;
  margin-top: -20px;
  width: 100px;
  height: 24px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 5px;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
}
.meeting-add-people-add:hover {
  background: rgba(232, 232, 232, 1);
}
</style>

