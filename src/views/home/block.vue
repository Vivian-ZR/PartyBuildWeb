<!--文章组件-->
<template>
  <div class="block-body">
    <div class="block-title">
      <div class="block-title-span">{{ title }}</div>
      <a class="block-title-more" target="view_window" :href="PDurl">更多>></a>
      <ul>
        <li class="block-ul-li" v-for="item in article" :key="item.id">
          <a class="block-ul-a" target="view_window" :href="item.content">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'block',
  props: {
    title: {
      type: String,
      required: true
    },
    PDurl: {
      type: String,
      required: true
    },
    article: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.block-body {
  float: left;
  width: calc(33.33% - 10px);
  height: 175px;
  /* background-color: bisque; */
  padding-right: 10px;
}
.block-title {
  height: 28px;
  border-bottom: 2px solid #ccc;
}
.block-title-span {
  display: inline-block;
  height: 28px;
  font-weight: 1000;
  font-size: 20px;
  color: #c00;
  border-bottom: 2px solid #cd0101;
}
.block-title-more {
  float: right;
  color: #3c444a;
  margin-top: 5px;
  font-size: 14px;
}
.block-title-more:hover {
  color: rgb(198, 13, 41);
}
.block-ul-li {
  background: url("../../assets/images/icons/01.jpg") left 13px no-repeat;
  padding-left: 12px;
}
.block-ul-a {
  width: 100%;
  display: list-item;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #666;
  line-height: 28px;
}
.block-ul-a:hover {
  color: red;
}
</style>
