<template>
  <table>
    <tr class="table-th">    
      <th v-for="item in header" :key="item.id">{{ item }}</th>
    </tr>
    <tr class="table-tr-mouseover" v-for="item in list" :key="item.id">
      <td>{{ item.title }}</td>
      <td>{{ item.category }}</td>
      <td>{{ item.theme }}</td>
      <td>{{ item.create_time | formatDate }}</td>
      <!-- <td :value="item.id"><router-link :to="{path:'/newsAritcle', query:{id: item.id}}" class="table-details">详情</router-link></td> -->
      <td :value="item.id"><span @click="goArchives(item.user_id,item.content,item.id)" class="table-details">详情</span></td>
    </tr>
  </table>
</template>

<script>
import { formatDate } from '../../common/js/date'
export default {
  name: 'newsTable',
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
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    goArchives(user_id, content, id) {
      let url = content;
      if (user_id === null) {
        window.console.log(url);
        let tempwindow = window.open("_blank");
        tempwindow.location = url;
      } else {
        this.$router.push({
          path: "/newsAritcle2",
          query: { 
            id: id
          }
        });
      }      
    }
  }  
}
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
  color:rgba(68,68,68,1);
}
.table-tr-mouseover {
  border-bottom: 1px solid rgba(186,186,186,1);
}
.table-tr-mouseover:hover {
  background-color: rgba(215,215,215,1);
}
.table-details {
  color: rgba(65, 165, 93, 1);
}
.table-details:hover {
  color: red;
}
</style>
