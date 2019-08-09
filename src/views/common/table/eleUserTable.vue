<template>
  <table>
    <tr class="table-th">
      <th v-for="item in header" :key="item.id">{{ item }}</th>
    </tr>
    <tr class="table-tr-mouseover" v-for="item in list" :key="item.id">
      <td>{{ item.party_member_name }}</td>
      <td>{{ item.gender }}</td>
      <td>{{ item.age }}</td>
      <td>{{ item.party_branch_name }}</td>
      <td>{{ item.current_job }}</td>
      <td>{{ item.phone }}</td>
      <td :value="item.id">
        <router-link
          :to="{path: '/partyUserArchives', query:{id: item.id}}"
          class="table-details"
        >详情</router-link>
        <span @click="goEdite(item.id)" class="report-edit">编辑</span>
        <span @click="goDelete(item.party_member_name, item.id)" class="report-edit">删除</span>
      </td>
    </tr>
  </table>
</template>

<script>
import { formatDate } from "../js/date";
import { postDeletePartyMember } from "../../../api/api"
export default {
  name: "eleUserTable",
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
    }
  },
  methods: {
    goEdite(id) {
      let uid = id;
      this.$router.push({
        path: "/editePartyUser",
        query: { id: uid }
      });
    },
    goDelete(title, id) {
      let r = confirm("确定要删除" + title + "党员档案？");
      if (r == true) {
        postDeletePartyMember({
          ids: id
        }).then(res => {
          if (res.code == 200) {
            alert(title + "党员档案已经删除");
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
</style>
