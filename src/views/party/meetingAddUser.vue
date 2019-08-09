<template>
  <div class="meeting-add-user">
    <div class="meeting-add-title">
      <div class="meeting-add-theme">添加人员</div>
      <!-- <div class="meeting-add-return">
        <i  class="meeting-add-iconfont iconfont">&#xe7fc;</i>
      </div> -->
      <div class="meeting-add-user-table">
        <div class="meeting-add-user-org">
          <table>
            <tr class="meeting-add-user-org-th">
              <th>组织</th>
            </tr>
            <tr
              v-for="item in orglist"
              :key="item.id"
              :class="{clickSelect:orgclick == item.id}"
              class="meeting-add-user-org-td"
              @click="selectOrg(item.id)"
            >
              <td>{{ item.organization_name }}</td>
            </tr>
          </table>
        </div>
        <div class="meeting-add-user-position">
          <table>
            <tr class="meeting-add-user-org-th">
              <th class="meeting-add-th-right">姓名</th>
              <th class="meeting-add-th-left">职位</th>
            </tr>
            <tr
              v-for="item in partyList"
              :key="item.id"
              class="meeting-add-user-org-td"
              @dblclick="selectUser(item.id, item.party_member_name, item.organization_id, item.party_branch_name)"
            >
              <td>{{ item.party_member_name }}</td>
              <td>{{ item.party_position }}</td>
            </tr>
          </table>
        </div>
        <div class="meeting-add-user-user">
          <table>
            <tr class="meeting-add-user-org-th">
              <th>已选名单</th>
            </tr>
            <tr class="meeting-add-user-users-td" v-for="item in user_list" :key="item.id">
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
      <button
        @click="myMeetingUserAdd=false"
        class="user-message-info-button meeting-add-user-button-1"
      >取消</button>
      <button
        @click="meetingUserFinish"
        class="user-message-info-button meeting-add-user-button-2"
      >确认添加</button>
    </div>
  </div>
</template>

<script>
import { getOrglist, getPartyIDUserList } from "../../api/api";
export default {
  name: "meetingAddUser",
  props: {
    meetingAddUser: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      myMeetingUserAdd: this.meetingAddUser,
      orglist: [], // 组织列表
      partyList: [], // 有党员列表
      user_list: [],
      orgclick: -1
    };
  },
  watch: {
    myMeetingUserAdd: function(val) {
      this.$parent.MeetingAddUser(val);
    }
  },
  mounted() {
    getOrglist({
      currentPage: 1,
      pageSize: 10
    }).then(res => {
      if (res.code === 200) {
        this.orglist = res.data.list;
      } else if (res.code === 401) {
        alert("请登录！");
        this.$store.commit("logout");
        this.$router.push({ name: "Index" });
      }
    });
  },
  methods: {
    selectOrg: function(id) {
      let org_id = id;
      this.orgclick = id;
      getPartyIDUserList({
        id: org_id
      }).then(res => {
        window.console.log(res);
        if (res.code === 200) {
          this.partyList = res.data;
        } else if (res.code === 401) {
          alert("请登录！");
          this.$store.commit("logout");
          this.$router.push({ name: "Index" });
        }
      });
    },
    selectUser: function(user_ids, user_name, organization_id, party_branch_name) {
      let addUser = true;
      for (let el of this.user_list) {
        if (el.ids === user_ids) {
          addUser = false;
        }
      }
      if (addUser) {
        this.user_list.push({ ids: user_ids, party_member_name: user_name, org_id: organization_id, party_branch_name: party_branch_name });
      }
    },
    deleteUser: function(ids) {
      let user_ids = ids;
      for (let i = 0; i < this.user_list.length; i++) {
        if (this.user_list[i].ids === user_ids) {
          this.user_list.splice(i--, 1);
          // window.console.log(user_ids);
        }
      }
    },
    meetingUserFinish: function() {
      this.$parent.addUserList(this.user_list);
      this.$parent.MeetingAddUser(false);
    }
  }
};
</script>

<style>
.meeting-add-user {
  position: fixed;
  width: 800px;
  height: 550px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 3px 3px 8px 1px rgba(86, 86, 86, 0.1);
  border-radius: 4px;
  left: calc(50% - 400px);
  top: 10%;
}
.meeting-add-user-table {
  width: 680px;
  padding-top: 5px;
  height: 400px;
  margin: 0 60px;
}
.meeting-add-user-org {
  display: inline-block;
  width: 150px;
  height: 370px;
  overflow-y: auto;
  border: 5px solid rgba(170, 170, 170, 1);
}
.meeting-add-user-org-th {
  background: rgba(170, 170, 170, 1);
}
.meeting-add-user-org-td {
  background: rgba(217, 217, 217, 1);
}
.meeting-add-user-users-td {
  background: rgba(217, 217, 217, 1);
}
.meeting-add-user-org-td:hover {
  background: rgba(220, 58, 62, 1);
}
.clickSelect {
  background: rgba(220, 58, 62, 1);
}
.meeting-add-user-position {
  margin: 0 25px;
  display: inline-block;
  width: 300px;
  height: 370px;
  overflow-y: auto;
  border: 5px solid rgba(170, 170, 170, 1);
}
.meeting-add-user-user {
  display: inline-block;
  width: 150px;
  height: 370px;
  overflow-y: auto;
  border: 5px solid rgba(170, 170, 170, 1);
}
.meeting-add-user-button-1 {
  background: rgba(170, 170, 170, 1);
  border-radius: 5px;
}
.meeting-add-user-button-1:hover {
  background: rgba(159, 157, 157, 1);
}
.meeting-add-user-button-2 {
  background: rgba(240, 70, 74, 1);
  border-radius: 5px;
}
.meeting-add-user-button-2:hover {
  background: rgba(220, 58, 62, 1);
}
</style>

