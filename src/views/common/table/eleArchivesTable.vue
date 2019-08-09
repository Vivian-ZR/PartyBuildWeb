<template>
  <table>
    <tr class="table-th">
      <th v-for="item in header" :key="item.id">{{ item }}</th>
    </tr>
    <tr
      :class="{eleArchivesSelectionTr:selection == item.id}"
      class="table-tr-mouseover"
      v-for="item in list"
      :key="item.id"
      @click="selectionEle(item.id)"
    >
      <td>{{ item.organization_name }}</td>
      <td>{{ item.organization_admin }}</td>
      <td>{{ item.user_count }}</td>
      <td>{{ item.honor_count }}</td>
      <td>{{ item.create_time | formatDate }}</td>
      <td :value="item.id">
        <router-link :to="{path:'/eleDemocratic', query:{id: item.id}}" class="table-details">详情</router-link>
        <span @click="goDelete(item.organization_name, item.id)" class="report-edit">删除</span>
      </td>
    </tr>
  </table>
</template>

<script>
import { formatDate } from "../js/date";
import { deleteOrg } from "../../../api/api";
export default {
  name: "eleArchivesTable",
  data() {
    return {
      selection: -1
    };
  },
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
    selectionEle: function(id) {
      this.selection = id;
      this.$parent.passEditSelectEleId(id);
    },
    goDelete: function(title, id) {
      let uid = id;
      let r = confirm("您确定要删除" + title + "组织么？");
      if (r == true) {
        let f = confirm("确定要删除有关" + title + "组织所有的信息么？");
        if (f == true) {
          deleteOrg({
            ids: uid
          }).then(res => {
            if (res.code == 200) {
              alert(title + "组织已经删除");
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
.eleArchivesSelectionTr {
  background-color: rgba(215, 215, 215, 1);
}
.table-details {
  color: rgba(65, 165, 93, 1);
}
.table-details:hover {
  color: red;
}
</style>
