<template>
  <table>
    <tr class="table-th">
      <th v-for="item in header" :key="item.id">{{ item }}</th>
    </tr>
    <tr class="table-tr-mouseover" v-for="item in list" :key="item.id">
      <td>{{ item.user_name }}</td>
      <td>{{ item.identity_card }}</td>
      <td>{{ item.organization_name }}</td>
      <td>{{ item.postion_name }}</td>
      <td>{{ item.account_number }}</td>
      <td
        @click="userActivation(item.is_activation,item.account_number,item.id)"
        :class="item.is_activation ?'': 'user-table-activation' "
      >{{ item.is_activation | formatActivation }}</td>
      <td>{{ item.create_time | formatDate }}</td>
      <td :value="item.id">
        <router-link  :to="{path:'/userMessage/info', query:{id:item.id}}" class="table-details">详情</router-link>
        <span @click="DeleteUser(item.id,item.account_number)" class="report-edit">删除</span>
      </td>
    </tr>
  </table>
</template>

<script>
import { formatDate } from "../js/date";
import { postActivation, deleteUser } from "../../../api/api";
export default {
  name: "UsetTable",
  props: {
    header: {
      type: Array,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
    formatActivation(status) {
      let s = status;
      if (s == false) {
        return "未激活";
      } else if (s == true) {
        return "已激活";
      }
    }
  },
  methods: {
    userActivation: function(activation, username, user_id) {
      let status = activation;
      let user = username;
      let id = user_id;
      if (!status) {
        let r = confirm("确定要激活" + user + "用户么？");
        if (r == true) {
          window.console.log(user, id);
          postActivation({
            uid: id
          }).then(res => {
            window.console.log(res);
            if (res.code === 200) {
              alert(user + "用户已激活");
              this.$parent.updateTable();
            } else if (res.code == 401) {
              alert("请登录！");
              this.$store.commit("logout");
              this.$router.push({ name: "Index" });
            }
          });
        }
      }
    },
    DeleteUser: function(user_id, user_name) {
      let id = user_id;
      let name = user_name;
      let r = confirm("确定要删除该用户？");
      if (r == true) {
        deleteUser({
          ids: id
        }).then(res => {
          if (res.code == 200) {
            alert(name + "该用户已经删除");
            this.$parent.updateTable();
          } else if (res.code == 401) {
            alert("请登录！");
            this.$store.commit("logout");
            this.$router.push({ name: "Index" });
          }
        });
      }
    }
  }
};
</script>

<style>
table {
  width: 100%;
}
table tr {
  height: 35px;
  text-align: center;
  cursor: pointer;
}
.table-th {
  background-color: red;
  color: aliceblue;
}
tr td {
  color: rgba(68, 68, 68, 1);
}
.table-tr-mouseover {
  border-bottom: 1px solid rgba(186, 186, 186, 1);
}
.table-tr-mouseover:hover {
  background-color: rgba(215, 215, 215, 1);
}
.table-details {
  color: rgba(65, 165, 93, 1);
}
.table-details:hover {
  color: red;
}
.user-table-activation {
  color: rgba(65, 165, 93, 1);
}
.user-table-activation:hover {
  color: red;
}
</style>
