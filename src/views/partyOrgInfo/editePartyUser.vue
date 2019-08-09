<template>
  <div>
    <!-- top信息栏 -->
    <user-nav
      :nvaTitleOut="true"
      :nvaTitleOneOut="'电子档案'"
      :nvaTitleTwoOutOne="'组织档案'"
      :nvaTitleTwoOutTwo="'人员档案'"
      :nvaTitleTwoOutStyle="'navTitleTwo'"
      :navTitleOneRouter="'/eleArchives'"
    ></user-nav>
    <!-- 侧边导航栏 -->
    <user-aside page="elecFiles" :partyInfoOut="true"></user-aside>

    <div class="user-message-body">
      <i class="iconfont user-message-add-return-icon">&#xe7ec;</i>
      <router-link to="/eleUser" class="user-message-add-return">返回党员列表</router-link>
      <div class="user-message-add-user">
        <div>
          <div class="user-message-add-icon"></div>
          <span class="user-message-add-user-title">档案编辑</span>
        </div>
        <div class="add-patry-user-title">党员信息编辑</div>
        <div class="add-patry-user-icon"></div>
        <div class="add-party-user-info">
          <div class="add-party-user-span">
            <span>用户照片：</span>
            <img :src="userImage" class="add-party-user-image" />
            <input @change="postUserImage" type="file" class="add-party-user-image-icon" />
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>姓名：</span>
              <input class="add-party-user-name" type="text" v-model="userName" placeholder="请输入姓名" />
            </div>
            <div class="add-party-user-span-div">
              <span>参加工作日期：</span>
              <my-datepicker
                v-model="joinDate"
                class="add-party-join-date"
                format="YYYY-MM-DD"
                confirm
              ></my-datepicker>
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>性别：</span>
              <select v-model="gender" class="add-party-user-select-sex">
                <option value>请选性别</option>
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>
            <div class="add-party-user-span-div">
              <span>党支部名称：</span>
              <select
                v-model="organizationId"
                @change="getPositionlist(organizationId)"
                class="add-party-user-select"
              >
                <option value>请选择组织</option>
                <option
                  v-for="item in orglist"
                  :key="item.id"
                  :value="item.id"
                >{{ item.organization_name }}</option>
              </select>
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>民族：</span>
              <input
                v-model="nationality"
                class="add-party-user-nation"
                type="text"
                placeholder="请输入民族"
              />
            </div>
            <div class="add-party-user-span-div">
              <span>现工作职务：</span>
              <input
                class="add-party-user-ID"
                v-model="currentJob"
                type="text"
                placeholder="请输入您的党内职务"
              />
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>出生日期：</span>
              <my-datepicker v-model="birthDate" format="YYYY-MM-DD" confirm></my-datepicker>
            </div>
            <div class="add-party-user-span-div">
              <span>入党日期：</span>
              <my-datepicker v-model="partyDate" format="YYYY-MM-DD" confirm></my-datepicker>
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>籍贯：</span>
              <input
                class="add-party-user-ID"
                type="text"
                v-model="birthplace"
                placeholder="请输入您的籍贯"
              />
            </div>
            <div class="add-party-user-span-div">
              <span>岗位层级：</span>
              <input
                class="add-party-user-ID"
                type="text"
                v-model="postLevel"
                placeholder="请输入您岗位层级"
              />
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>居民身份证：</span>
              <input
                class="add-party-user-ID"
                type="text"
                v-model="identityCard"
                placeholder="请输入您的身份证"
              />
            </div>
            <div class="add-party-user-span-div">
              <span>用工形式：</span>
              <input
                class="add-party-user-ID"
                type="text"
                v-model="employmentForm"
                placeholder="请输入您的用工形式"
              />
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>联系电话：</span>
              <input class="add-party-user-ID" type="text" v-model="phone" placeholder="请输入您的联系电话" />
            </div>
            <div class="add-party-user-span-div">
              <span>党内职务：</span>
              <select v-model="positionId" class="add-party-user-select">
                <option value>无职位</option>
                <option
                  v-for="item in positionlist"
                  :key="item.id"
                  :value="item.id"
                >{{ item.postion_name }}</option>
              </select>
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>毕业学校：</span>
              <input class="add-party-user-ID" type="text" v-model="school" placeholder="请输入您的毕业学校" />
            </div>
            <div class="add-party-user-span-div">
              <span>现工作区域：</span>
              <input
                class="add-party-user-ID"
                v-model="currentWorkArea"
                type="text"
                placeholder="请输入您的工作区域"
              />
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>所学专业：</span>
              <input class="add-party-user-ID" type="text" v-model="Major" placeholder="请输入您的专业" />
            </div>

            <div class="add-party-user-span-div">
              <span>组织关系所在地：</span>
              <input
                class="add-party-user-ID"
                type="text"
                v-model="organizationLocation"
                placeholder="请输入您的组织关系地"
              />
            </div>
          </div>
          <div class="add-party-user-span">
            <div class="add-party-user-span-div1 add-party-user-span-div">
              <span>邮箱：</span>
              <input class="add-party-user-ID" type="text" v-model="mailbox" placeholder="请输入您的邮箱" />
            </div>
            <div class="add-party-user-span-div">
              <span>最高学历：</span>
              <input
                class="add-party-user-ID"
                type="text"
                v-model="highestEducation"
                placeholder="请输入您的最高学历"
              />
            </div>
          </div>
        </div>
        <button @click="clickReturn" class="user-message-info-button add-party-user-button1">取消</button>
        <button @click="SaveParty" class="user-message-info-button add-party-user-button2">创建</button>
      </div>
    </div>
  </div>
</template>

<script>
import partyNave from "./../common/partyNav";
import partyAside from "./../common/partyAside";
import myDatepicker from "vue2-datepicker";
import {
  getOrglist,
  getOrgPosition,
  postUpdatePartyMember,
  getPartyMember
} from "../../api/api";
export default {
  name: "editePartyUser",
  data() {
    return {
      partyUserId: this.$route.query.id,
      userImage: require("../../assets/images/icons/usericon.png"),
      orglist: [], // 组织列表
      positionlist: [], // 职位列表

      userImagePath: "", // 党员头像的地址
      userName: "", // 用户名
      joinDate: "", // 用户参加工作日期
      gender: "", // 性别
      organizationId: "", // 组织ID
      organizationName: "", // 组织名
      nationality: "", // 民族
      currentJob: "", // 现工作职务
      birthDate: "", // 用户出生日期
      partyDate: "", // 用户入党日期
      birthplace: "", // 籍贯
      postLevel: "", // 岗位层级
      identityCard: "", // 身份证号
      employmentForm: "", // 用工形式
      phone: "", // 联系电话
      positionId: "", // 职位id
      partyPosition: "", // 党内职务
      school: "", // 毕业学校
      currentWorkArea: "", // 现工作区域
      Major: "", // 所学专业
      organizationLocation: "", // 组织关系所在地
      highestEducation: "", // 最高学历
      mailbox: "" // 用户邮箱
    };
  },
  components: {
    "user-nav": partyNave,
    "user-aside": partyAside,
    "my-datepicker": myDatepicker
  },
  mounted() {
    getOrglist({
      currentPage: 1,
      pageSize: 1000
    }).then(res => {
      if (res.code === 200) {
        this.orglist = res.data.list;
      } else if (res.code === 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
    getPartyMember({
      id: this.partyUserId
    }).then(res => {
      if (res.code === 200) {
        if(res.data.img !== null){
          this.userImage = 'http://47.101.221.57:10086/resource/partyBuild/uploads/' + res.data.img;
        }        
        this.userName = res.data.partyMemberName;
        this.joinDate = res.data.jobDate;
        this.gender = res.data.gender;
        this.organizationId = res.data.organizationId;
        this.nationality = res.data.nationality;
        this.currentJob = res.data.currentJob;
        this.birthDate = res.data.birthDate;
        this.partyDate = res.data.joinPartyTime;
        this.birthplace = res.data.birthplace;
        this.postLevel = res.data.postLevel;
        this.identityCard = res.data.identityCard;
        this.employmentForm = res.data.employmentForm;
        this.phone = res.data.phone;
        this.positionId = res.data.positionId;
        if(res.data.schoolAndMajor !== null) {
          this.school = res.data.schoolAndMajor.split('-')[0];
          this.Major = res.data.schoolAndMajor.split('-')[1];
        }        
        this.currentWorkArea = res.data.currentWorkArea;        
        this.organizationLocation = res.data.organizationLocation;
        this.mailbox = res.data.mailbox;
        this.highestEducation = res.datahighestEducation;
      } else if (res.code === 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
  },
  methods: {
    postUserImage(e) {
      try {
        const File = e.target.files[0];
        if (File.type.indexOf("image") == 0) {
          // 图片预览
          let _this = this;
          let reader = new FileReader();
          reader.readAsDataURL(File);
          reader.onload = function() {
            _this.userImage = this.result;
          };
          // 后台上传
          let ImageData = new FormData();
          ImageData.append("file", File, File.name);
          this.axios
            .post("/file/uploadPicture", ImageData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(res => {
              if (res.data.code === 200) {
                this.userImagePath = res.data.data.path;
              } else if (res.data.code === 401) {
                alert("请登录！");
                this.$store.commit("logout");
                this.$router.push({ name: "Index" });
              }
            });
        } else {
          alert("请选择图片！");
        }
      } catch (err) {
        window.console.log(err);
      }
    },
    getPositionlist: function(id) {
      let organizationId = id;
      if (organizationId == "") {
        this.positionlist = null;
      } else {
        getOrgPosition({
          organizationId: organizationId
        }).then(res => {
          if (res.code === 200) {
            this.positionlist = res.data.list;
          } else if (res.code === 401) {
            alert("请登录！");
            this.$store.commit("logout");
            this.$router.push({ name: "Index" });
          }
        });
      }
    },
    clickReturn: function() {
      this.$router.push({
        path: "/eleUser"
      });
    },
    SaveParty: function() {
      let regID = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/; // 身份证
      let regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // 邮箱验证
      let regPhone = /^1[3456789]\d{9}$/; // 手机号验证
      if (this.userImagePath == "") {
        alert("请选择头像！");
      } else if (this.userName === "") {
        alert("请输入姓名！");
      } else if (this.joinDate === "") {
        alert("请输入参加工作日期！");
      } else if (this.gender === "") {
        alert("请选择性别！");
      } else if (this.organizationId === "") {
        alert("请选择组织！");
      } else if (this.nationality === "") {
        alert("请输入民族！");
      } else if (this.birthDate === "") {
        alert("请输入出生日期！");
      } else if (this.partyDate === "") {
        alert("请输入入党日期！");
      } else if (this.birthplace === "") {
        alert("请输入籍贯！");
      } else if (this.postLevel === "") {
        alert("请输入岗位层级！");
      } else if (!regID.test(this.identityCard)) {
        alert("请输入正确的身份证号！");
      } else if (!regEmail.test(this.mailbox)) {
        alert("请输入正确的邮箱！");
      } else if (!regPhone.test(this.phone)) {
        alert("请输入正确的手机号！");
      } else {
        for (var i = 0; i < this.orglist.length; i++) {
          if (this.organizationId === this.orglist[i].id) {
            this.organizationName = this.orglist[i].organization_name;
            break;
          }
        }
        for (var j = 0; j < this.positionlist.length; j++) {
          if (this.positionId === this.positionlist[j].id) {
            this.partyPosition === this.positionlist[j].postion_name;
            break;
          }
        }
        postUpdatePartyMember({
          id: this.partyUserId,
          img: this.userImagePath,
          partyMemberName: this.userName,
          joinDate: this.joinDate,
          gender: this.gender,
          organizationId: this.organizationId,
          partyBranchName: this.organizationName,
          nationality: this.nationality,
          currentJob: this.currentJob,
          birthDate: this.birthDate,
          partyDate: this.partyDate,
          birthplace: this.birthplace,
          postLevel: this.postLevel,
          identityCard: this.identityCard,
          employmentForm: this.employmentForm,
          phone: this.phone,
          positionId: this.positionId,
          partyPosition: this.partyPosition,
          schoolAndMajor: this.school+ '-' +this.Major,
          currentWorkArea: this.currentWorkArea,
          organizationLocation: this.organizationLocation,
          highestEducation: this.highestEducation,
          mailbox: this.mailbox
        }).then(res => {
          if (res.code == 200) {
            alert("党员档案已添加完成！");
            this.$router.push({
              path: "/eleUser"
            });
          }
        });
      }
    }
  }
};
</script>

<style>
.add-patry-user-title {
  font-size: 20px;
  font-weight: 500;
  color: rgba(68, 68, 68, 1);
  margin-left: 90px;
}
.add-patry-user-icon {
  position: relative;
  top: -20px;
  left: 220px;
  display: inline-block;
  width: 80%;
  height: 1px;
  background: rgba(209, 209, 209, 1);
}
.add-party-user-info span {
  display: inline-block;
  width: 130px;
}
.add-party-user-name {
  width: 100px;
  height: 24px;
  padding-left: 5px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(156, 157, 152, 1);
}
.add-party-user-span {
  margin-left: 300px;
  font-size: 16px;
}
.add-party-user-span input {
  padding-left: 5px;
}
.add-party-user-span-div {
  margin-top: 30px;
  display: inline-block;
}
.mx-input {
  height: 30px;
}
.add-party-user-select-sex {
  width: 100px;
  height: 24px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(156, 157, 152, 1);
  border-radius: 3px;
}
.add-party-user-select {
  width: 210px;
  height: 24px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(156, 157, 152, 1);
  border-radius: 3px;
}
.add-party-user-nation {
  width: 100px;
  height: 24px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(156, 157, 152, 1);
  border-radius: 3px;
}
.add-party-user-native {
  width: 150px;
  height: 24px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(156, 157, 152, 1);
  border-radius: 3px;
}
.add-party-user-ID {
  width: 200px;
  height: 24px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(156, 157, 152, 1);
  border-radius: 3px;
}
.add-party-user-span-div1 {
  width: 400px;
}
.add-party-user-image {
  width: 120px;
  height: 165px;
}
.add-party-user-image-icon {
  position: relative;
  left: -120px;
  width: 120px;
  height: 165px;
  opacity: 0;
  cursor: pointer;
}
.add-party-user-button1 {
  position: relative;
  top: 20px;
  background: rgba(170, 170, 170, 1);
}
.add-party-user-button1:hover {
  background: rgba(92, 151, 224, 1);
}
.add-party-user-button2 {
  position: relative;
  top: 20px;
  background: rgba(240, 70, 74, 1);
}
.add-party-user-button2:hover {
  background: rgba(220, 58, 62, 1);
}
</style>
